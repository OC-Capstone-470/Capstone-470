from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import requests
from authlib.jose import jwt
from authlib.jose.errors import DecodeError, JoseError
import json
from datetime import datetime, timedelta
import os
import logging
import base64

# Mocking users until db plugged in
USERS_DB = {
    "tofuspark@gmail.com": {
        "id": 1,
        "email": "tofuspark@gmail.com",
        "name": "Alex Anthony",
        "role": "volunteer",
        "status": "active"
    }
}

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_google_public_keys():
    response = requests.get("https://www.googleapis.com/oauth2/v3/certs")
    jwks = response.json()
    if "keys" not in jwks or not jwks["keys"]:
        raise ValueError("No valid keys in JWKS")
    return jwks["keys"]  # Return all keys

async def validate_token(authorization: str = Header(...)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Bearer token required")
    token = authorization.split(" ")[1]
    try:
        # Attempt to decode header to get kid
        try:
            header = jwt.decode_header(token)  # Should work as a function
            logger.debug(f"Decoded header: {header}")
            kid = header.get("kid")
        except AttributeError as e:
            # Fallback: Manually parse the header from the token
            logger.warning(f"jwt.decode_header failed with {e}, falling back to manual header parsing")
            encoded_header = token.split('.')[0]
            padding_length = (4 - len(encoded_header) % 4) % 4
            padded_header = encoded_header + "=" * padding_length
            decoded_header = base64.urlsafe_b64decode(padded_header).decode('utf-8')
            header = json.loads(decoded_header)
            kid = header.get("kid")
            logger.debug(f"Manually parsed header: {header}")

        if not kid:
            raise JoseError("No kid in token header")

        # Fetch all public keys and find the matching one
        public_keys = get_google_public_keys()
        logger.debug(f"Available public keys: {public_keys}")
        key_data = next((key for key in public_keys if key.get("kid") == kid), None)
        if not key_data:
            raise JoseError(f"No matching public key found for kid: {kid}")

        # Decode the token with the matching key data
        decoded = jwt.decode(token, key_data, claims_options={
            "iss": {"value": "https://accounts.google.com"},
            "aud": {"value": os.environ.get("GOOGLE_CLIENT_ID")}
        })
        decoded.validate()
        return {"message": "Token valid", "email": decoded["email"]}
    except (DecodeError, JoseError, json.JSONDecodeError) as e:
        logger.error(f"Token validation failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/api/exchange")
async def exchange_code(data: dict):
    code = data.get("code")
    if not code:
        raise HTTPException(status_code=422, detail="Code is required")
    token_url = "https://oauth2.googleapis.com/token"
    client_id = os.environ.get("GOOGLE_CLIENT_ID")
    client_secret = os.environ.get("GOOGLE_CLIENT_SECRET")
    payload = {
        "code": code,
        "client_id": client_id,
        "client_secret": client_secret,
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code"
    }
    logger.debug(f"Sending payload to Google: {payload}")
    response = requests.post(token_url, data=payload, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    logger.debug(f"Google response status: {response.status_code}")
    logger.debug(f"Google response text: {response.text}")
    token_data = response.json()
    if "id_token" in token_data:
        return {"id_token": token_data["id_token"]}
    raise HTTPException(status_code=400, detail="Failed to exchange code for ID token")

@app.get("/auth/validate")
async def validate(data: dict = Depends(validate_token)):
    return data

@app.get("/users")
async def read_users():
    return [{"id": 1, "username": "admin1", "role": "admin"}]

@app.get("/users/me")
async def get_current_user(token_data: dict = Depends(validate_token)):
    email = token_data["email"]
    user = USERS_DB.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
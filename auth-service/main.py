# auth-service/main.py
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import requests
from authlib.jose import jwt
from authlib.jose.errors import DecodeError, JoseError
import json
import os
import logging
import base64

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI(title="Auth Service")

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
    return jwks["keys"]

async def validate_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Bearer token required")
    token = authorization.split(" ")[1]
    try:
        # Manual header parsing (fallback)
        encoded_header = token.split('.')[0]
        padded = encoded_header + "=" * ((4 - len(encoded_header) % 4) % 4)
        header = json.loads(base64.urlsafe_b64decode(padded).decode())
        kid = header.get("kid")
        if not kid:
            raise JoseError("No kid")

        keys = get_google_public_keys()
        key = next((k for k in keys if k.get("kid") == kid), None)
        if not key:
            raise JoseError("No matching key")

        decoded = jwt.decode(token, key, claims_options={
            "iss": {"value": "https://accounts.google.com"},
            "aud": {"value": os.getenv("GOOGLE_CLIENT_ID")}
        })
        decoded.validate()
        return {"email": decoded["email"]}
    except Exception as e:
        logger.error(f"Validation failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/exchange")
async def exchange_code(data: dict):
    code = data.get("code")
    if not code:
        raise HTTPException(422, "Code required")
    payload = {
        "code": code,
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "redirect_uri": "http://localhost:3000",
        "grant_type": "authorization_code"
    }
    resp = requests.post("https://oauth2.googleapis.com/token", data=payload)
    token_data = resp.json()

    if "error" in token_data:
        raise HTTPException(400, f"Google error: {token_data['error_description']}")
    if "id_token" not in token_data and "access_token" not in token_data:
        raise HTTPException(400, "No tokens returned from Google")
    return {
        "id_token": token_data["id_token"],
        "access_token": token_data["access_token"]
    }

@app.get("/validate")
async def validate(data: dict = Depends(validate_token)):
    return data
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import requests
from authlib.jose import jwt
from authlib.jose.errors import DecodeError
from datetime import datetime, timedelta
import os
import logging

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
    return jwks["keys"][0]

async def validate_token(authorization: str = Header(...)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Bearer token required")
    token = authorization.split(" ")[1]
    try:
        header = jwt.decode(token, get_google_public_keys(), claims_options={
            "iss": {"value": "https://accounts.google.com"},
            "aud": {"value": os.environ.get("GOOGLE_CLIENT_ID")}
        })
        return {"message": "Token valid", "email": header["email"]}
    except DecodeError:
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
        "redirect_uri": "http://localhost:3000",  # Removed trailing slash
        "grant_type": "authorization_code"
    }
    logger.debug(f"Sending payload to Google: {payload}")
    response = requests.post(token_url, data=payload, headers={'Content-Type': 'application/x-www-form-urlencoded'})  # Ensure correct content type
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
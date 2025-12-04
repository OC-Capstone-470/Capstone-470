# auth-service/app/routes/validate.py
from fastapi import APIRouter, Depends, Header, HTTPException
from authlib.jose import jwt
from authlib.jose.errors import JoseError
import requests
import json
import base64
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

def get_google_public_keys():
    response = requests.get("https://www.googleapis.com/oauth2/v3/certs")
    jwks = response.json()
    if "keys" not in jwks or not jwks["keys"]:
        raise ValueError("No valid keys in JWKS")
    return jwks["keys"]

async def validate_token(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(401, "Bearer token required")
    token = authorization.split(" ")[1]
    try:
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
        raise HTTPException(401, "Invalid token")

@router.get("/validate")
async def validate(data: dict = Depends(validate_token)):
    return data

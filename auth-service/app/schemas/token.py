# auth-service/app/schemas/token.py
from pydantic import BaseModel

class TokenResponse(BaseModel):
    id_token: str
    access_token: str

class ExchangeRequest(BaseModel):
    code: str

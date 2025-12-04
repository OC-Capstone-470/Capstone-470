# auth-service/app/routes/exchange.py
from fastapi import APIRouter, HTTPException
from ..schemas.token import ExchangeRequest, TokenResponse
from ..services.google import exchange_code_for_tokens

router = APIRouter()

@router.post("/exchange", response_model=TokenResponse)
async def exchange(request: ExchangeRequest):
    try:
        tokens = exchange_code_for_tokens(request.code)
        return TokenResponse(
            id_token=tokens["id_token"],
            access_token=tokens["access_token"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Internal error: {str(e)}")

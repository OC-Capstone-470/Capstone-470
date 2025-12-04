# auth-service/app/api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import exchange, validate, health

app = FastAPI(title="Auth Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exchange.router, tags=["auth"])
app.include_router(validate.router, tags=["auth"])
app.include_router(health.router)

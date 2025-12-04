# user-service/app/api.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users
from .dependencies import get_db

app = FastAPI(title="User Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users")

# user-service/app/schemas/user.py
from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    status: str

    class Config:
        from_attributes = True

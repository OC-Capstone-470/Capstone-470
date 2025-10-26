from fastapi import FastAPI

app = FastAPI()

@app.get("/users")
async def read_users():
    return [{"id": 1, "username": "admin1", "role": "admin"}]
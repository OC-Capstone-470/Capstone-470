from fastapi.testclient import TestClient
from backend.main import app
import jwt
from datetime import datetime, timedelta, UTC  # Add UTC

client = TestClient(app)

def test_read_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert len(response.json()) == 1

def test_validate_google_token():
    # Mock a Google ID token (simplified for test)
    payload = {
        "iss": "https://accounts.google.com",
        "sub": "123456789",
        "email": "user@example.com",
        "aud": "331934203095-4ldjs8or32tjomdo7k49jcsp6ud3sa49.apps.googleusercontent.com",
        "exp": int((datetime.now(UTC) + timedelta(hours=1)).timestamp())  # Use timezone-aware
    }
    token = jwt.encode(payload, "secret", algorithm="HS256")  # Temporary mock
    response = client.get("/auth/validate", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json() == {"message": "Token valid", "email": "user@example.com"}
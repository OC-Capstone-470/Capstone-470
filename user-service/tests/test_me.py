from fastapi.testclient import TestClient
from main import app
import responses

client = TestClient(app)

@responses.activate
def test_me_valid_token():
    responses.add(responses.GET, "http://auth-service:8000/validate", json={"email": "test@example.com"}, status=200)
    headers = {"Authorization": "Bearer valid_token"}
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

# auth-service/tests/test_exchange.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_exchange_no_code():
    response = client.post("/exchange", json={})
    assert response.status_code == 422

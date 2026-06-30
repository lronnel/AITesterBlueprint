from pathlib import Path

from authentication.auth_manager import AuthManager
from helpers.assertions import ResponseAssertions
from helpers.data_manager import DataManager
from helpers.response_validator import ResponseValidator
from payloads.user_payloads import UserPayloadBuilder


class TestUsersAPI:
    def test_get_single_user(self, api_client):
        response = api_client.get("/users/2")
        ResponseAssertions.assert_status_code(response, 200)
        ResponseAssertions.assert_contains(response, "data")

    def test_create_user(self, api_client):
        payload = UserPayloadBuilder.create_user_payload()
        response = api_client.post("/users", json=payload)
        ResponseAssertions.assert_status_code(response, 201)
        ResponseValidator.validate_content_type(response, "application/json")

    def test_update_user(self, api_client):
        payload = UserPayloadBuilder.update_user_payload()
        response = api_client.put("/users/2", json=payload)
        ResponseAssertions.assert_status_code(response, 200)

    def test_patch_user(self, api_client):
        payload = {"job": "Lead QA Engineer"}
        response = api_client.patch("/users/2", json=payload)
        ResponseAssertions.assert_status_code(response, 200)

    def test_delete_user(self, api_client):
        response = api_client.delete("/users/2")
        ResponseAssertions.assert_status_code(response, 204)

    def test_basic_auth_example(self, api_client):
        auth = AuthManager.basic("user", "pass")
        response = api_client.get("/users/2", auth=auth)
        ResponseAssertions.assert_status_code(response, 200)

    def test_json_data_manager(self):
        data = DataManager.read_json(Path(__file__).resolve().parent.parent / "schemas" / "user_schema.json")
        assert isinstance(data, dict)

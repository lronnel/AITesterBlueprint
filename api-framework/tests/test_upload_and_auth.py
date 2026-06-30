from authentication.auth_manager import AuthManager
from helpers.assertions import ResponseAssertions


class TestUploadAndAuth:
    def test_bearer_auth(self, api_client):
        headers = AuthManager.bearer("sample-token")
        response = api_client.get("/users/2", headers=headers)
        ResponseAssertions.assert_status_code(response, 200)

    def test_file_upload(self, api_client):
        files = {"file": ("sample.txt", b"hello world", "text/plain")}
        response = api_client.post("/upload", files=files)
        ResponseAssertions.assert_status_code(response, 200)

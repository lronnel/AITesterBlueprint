package com.booker.qa;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.testng.annotations.BeforeClass;

import java.util.UUID;

public class BaseTest {
    protected String baseUri;
    protected String username;
    protected String password;

    @BeforeClass
    public void setUp() {
        baseUri = System.getProperty("baseUri", "https://restful-booker.herokuapp.com");
        username = System.getProperty("username", "admin");
        password = System.getProperty("password", "password123");
        RestAssured.baseURI = baseUri;
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
    }

    protected String createToken() {
        Response response = RestAssured.given()
                .contentType("application/json")
                .body("{\"username\":\"" + username + "\",\"password\":\"" + password + "\"}")
                .post("/auth");

        response.then().statusCode(200);
        return response.jsonPath().getString("token");
    }

    protected int createBooking() {
        String payload = "{"
                + "\"firstname\":\"QA\","
                + "\"lastname\":\"Automation\","
                + "\"totalprice\":123,"
                + "\"depositpaid\":true,"
                + "\"bookingdates\":{\"checkin\":\"2026-01-01\",\"checkout\":\"2026-01-05\"},"
                + "\"additionalneeds\":\"Breakfast\""
                + "}";

        Response response = RestAssured.given()
                .contentType("application/json")
                .body(payload)
                .post("/booking");

        response.then().statusCode(200);
        return response.jsonPath().getInt("bookingid");
    }
}

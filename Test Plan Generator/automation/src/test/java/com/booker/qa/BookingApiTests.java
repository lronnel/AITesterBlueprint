package com.booker.qa;

import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class BookingApiTests extends BaseTest {

    @Test
    public void shouldCreateBookingWithValidPayload() {
        given()
                .contentType("application/json")
                .body("{\"firstname\":\"QA\",\"lastname\":\"Automation\",\"totalprice\":123,\"depositpaid\":true,\"bookingdates\":{\"checkin\":\"2026-01-01\",\"checkout\":\"2026-01-05\"},\"additionalneeds\":\"Breakfast\"}")
                .when()
                .post("/booking")
                .then()
                .statusCode(200)
                .body("bookingid", equalTo(0));
    }

    @Test
    public void shouldReturnNotFoundForUnknownBooking() {
        given()
                .when()
                .get("/booking/999999")
                .then()
                .statusCode(404);
    }

    @Test
    public void shouldUpdateBookingWithValidToken() {
        String token = createToken();
        int bookingId = createBooking();

        given()
                .header("Cookie", "token=" + token)
                .contentType("application/json")
                .body("{\"firstname\":\"Updated\",\"lastname\":\"User\",\"totalprice\":150,\"depositpaid\":false,\"bookingdates\":{\"checkin\":\"2026-02-01\",\"checkout\":\"2026-02-05\"},\"additionalneeds\":\"Dinner\"}")
                .when()
                .put("/booking/" + bookingId)
                .then()
                .statusCode(200)
                .body("firstname", equalTo("Updated"));
    }

    @Test
    public void shouldDeleteBookingWithValidToken() {
        String token = createToken();
        int bookingId = createBooking();

        given()
                .header("Cookie", "token=" + token)
                .when()
                .delete("/booking/" + bookingId)
                .then()
                .statusCode(201);
    }
}

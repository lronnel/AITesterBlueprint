# Restful Booker API - Enterprise QA Test Plan

## 1. Executive Summary
The Restful Booker API is a representative RESTful service used for validating authentication, booking lifecycle, authorization, data validation, and resilience. This test plan provides a structured QA approach for functional, non-functional, security, performance, regression, and exploratory testing across the core booking workflows.

## 2. Objective
To verify that the Restful Booker API behaves correctly for valid and invalid requests, protects secure operations, supports CRUD requirements, and remains stable under realistic user and load conditions.

## 3. Scope
In scope:
- Authentication and token generation
- Create booking
- Read booking by ID
- Update booking
- Delete booking
- Validation and error handling
- Security and authorization checks
- Basic performance and load considerations

Out of scope:
- UI-specific testing for the public booking website
- Advanced distributed tracing and production monitoring setup
- Non-REST integrations outside the documented API surface

## 4. Assumptions
- The target API is available at https://restful-booker.herokuapp.com
- Authentication uses a token-based mechanism
- Test data can be generated dynamically for positive and negative scenarios
- The environment supports HTTP requests from test tools such as Postman, REST Assured, and Playwright-based automation if needed

## 5. Risks and Mitigations
| Risk | Impact | Likelihood | Mitigation |
|---|---|---:|---|
| Unauthorized booking modification | High | Medium | Enforce auth validation with negative tests and role-based checks |
| Weak input validation | High | Medium | Add boundary, malformed, and empty-value tests |
| Performance degradation | Medium | Medium | Run response-time and concurrency tests in CI |
| Inconsistent responses | Medium | Low | Validate schema, status codes, and error payloads |

## 6. Test Environment
- API URL: https://restful-booker.herokuapp.com
- Tools: Postman, REST Assured, TestNG, Maven, Allure or Extent Reports
- Browsers/clients: curl, Postman, Java-based test runners
- Test Data Source: dynamic payload generator and fixed examples

## 7. Test Data
- Valid credentials: admin / password123
- Valid booking payload with first name, last name, total price, deposit paid, check-in/out dates, additional needs
- Invalid booking payloads with missing fields and malformed dates
- Invalid booking IDs and unauthorized requests

## 8. Test Strategy
The strategy combines manual exploratory testing with automated API regression tests. High-risk flows such as authentication, update, delete, and security rules will be covered early. Regression coverage will be maintained with REST Assured and TestNG.

## 9. Test Types
- Functional
- Negative
- Boundary
- Security
- Error handling
- Compatibility
- Regression
- Performance
- Load
- Stress
- Exploratory

## 10. Test Scenarios
1. Successful authentication with valid credentials
2. Authentication failure with invalid credentials
3. Booking creation with valid input
4. Booking creation with missing fields
5. Booking retrieval for valid ID
6. Booking retrieval for invalid ID
7. Booking update with valid token
8. Booking update without authorization
9. Booking deletion with valid token
10. Booking deletion without authorization
11. Response time validation for repeated reads
12. Concurrent booking creation stress check
13. Boundary input handling
14. Regression check for existing CRUD flows
15. Schema and error payload validation

## 11. Detailed Test Cases
| ID | Module | Feature | Priority | Severity | Type | Endpoint | Method | Expected Result |
|---|---|---|---|---|---|---|---|---|
| TC-001 | Authentication | Token generation | High | High | Positive | /auth | POST | 200 OK and token is returned |
| TC-002 | Authentication | Invalid credentials | High | High | Negative | /auth | POST | 403 Forbidden |
| TC-003 | Booking | Create booking | High | High | Positive | /booking | POST | 200 OK and booking ID created |
| TC-004 | Booking | Create booking with missing fields | High | Medium | Negative | /booking | POST | 400 Bad Request |
| TC-005 | Booking | Get booking by valid ID | High | High | Positive | /booking/{id} | GET | 200 OK and booking details returned |
| TC-006 | Booking | Get booking by invalid ID | Medium | Medium | Negative | /booking/{id} | GET | 404 Not Found |
| TC-007 | Booking | Update booking with valid token | High | High | Positive | /booking/{id} | PUT | 200 OK and updated content returned |
| TC-008 | Booking | Update booking without auth | High | High | Security | /booking/{id} | PUT | 403 Forbidden |
| TC-009 | Booking | Delete booking with valid token | High | High | Positive | /booking/{id} | DELETE | 201 Created |
| TC-010 | Booking | Delete booking without auth | High | High | Security | /booking/{id} | DELETE | 403 Forbidden |
| TC-011 | Performance | Response time | Medium | Medium | Performance | /booking/{id} | GET | Response time within agreed threshold |
| TC-012 | Load | Concurrent booking creation | Medium | Medium | Load | /booking | POST | No data corruption and acceptable failure rate |
| TC-013 | Regression | Existing CRUD smoke suite | Medium | Medium | Regression | /booking | GET/POST | No regressions in core flows |
| TC-014 | Security | Header and auth validation | High | High | Security | /booking | GET | Invalid requests are rejected |
| TC-015 | Data Validation | Boundary inputs | Medium | Medium | Boundary | /booking | POST | Validation rules enforced |

## 12. API Coverage Matrix
| Endpoint | Method | Covered | Test Cases | Automation Status |
|---|---|---|---|---|
| /auth | POST | Yes | TC-001, TC-002 | Yes |
| /booking | POST | Yes | TC-003, TC-004, TC-012, TC-015 | Yes |
| /booking/{id} | GET | Yes | TC-005, TC-006, TC-011 | Yes |
| /booking/{id} | PUT | Yes | TC-007, TC-008 | Yes |
| /booking/{id} | DELETE | Yes | TC-009, TC-010 | Yes |

## 13. Traceability Matrix
| Requirement | Scenario | Test Case | Automation |
|---|---|---|---|
| REQ-01 | Authentication success | TC-001 | Yes |
| REQ-02 | Authentication failure | TC-002 | Yes |
| REQ-03 | Create booking | TC-003, TC-004 | Yes |
| REQ-04 | Read booking | TC-005, TC-006 | Yes |
| REQ-05 | Update booking | TC-007, TC-008 | Yes |
| REQ-06 | Delete booking | TC-009, TC-010 | Yes |

## 14. Automation Recommendations
Recommended stack:
- Java
- Maven
- TestNG
- REST Assured
- Jackson or Gson
- Allure Reports

Suggested structure:
- src/test/java/com/booker/qa/BaseTest.java
- src/test/java/com/booker/qa/BookingApiTests.java
- src/test/resources/testng.xml

Best practices:
- Keep tests independent and data-driven
- Use descriptive names and assertions
- Separate setup, requests, and validations
- Capture response details for debugging
- Run smoke suite first, then regression suite

## 15. Defect Reporting Workflow
1. Capture steps, environment, request/response details, and expected vs actual results.
2. Log a defect with severity, priority, and reproduction notes.
3. Attach payloads and screenshots if relevant.
4. Link the defect to the corresponding requirement or test case.
5. Retest after fix and close only after validation.

## 16. Test Execution Dashboard Data
| Metric | Value |
|---|---:|
| Total Tests | 15 |
| Passed | 0 |
| Failed | 0 |
| Blocked | 0 |
| Not Executed | 15 |
| Automation % | 87% |
| Defect Density | 0.00 |
| Pass Rate | 0% |

## 17. Exit Criteria
- All critical and high-priority tests executed
- No unresolved critical defects
- Automation suite available for regression execution
- Test execution report generated and shared

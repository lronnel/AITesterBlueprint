package com.salesforce.automation.tests;

import com.salesforce.automation.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class LoginInvalidTest {
    private WebDriver driver;
    private LoginPage loginPage;

    @BeforeTest
    public void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        driver = new ChromeDriver(options);
        loginPage = new LoginPage(driver);
        loginPage.openLoginPage();
    }

    @Test
    public void invalidLoginShouldShowError() {
        try {
            loginPage.setUsername("invalid_username@example.com");
            loginPage.setPassword("InvalidPassword");
            loginPage.clickLogin();
            String errorMessage = loginPage.getLoginErrorMessage();
            Assert.assertTrue(errorMessage.contains("Please check your username and password"), "Expected invalid login error message.");
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    @AfterTest
    public void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}

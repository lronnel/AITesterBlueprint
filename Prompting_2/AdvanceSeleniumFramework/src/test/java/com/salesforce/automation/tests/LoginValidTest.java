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

public class LoginValidTest {
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
    public void validLoginShouldSucceed() {
        try {
            loginPage.setUsername("valid_username@example.com");
            loginPage.setPassword("ValidPassword123");
            loginPage.enableRememberMe();
            loginPage.clickLogin();
            boolean loginFormDisplayed = loginPage.isLoginFormDisplayed();
            Assert.assertFalse(loginFormDisplayed, "Expected login form not to be displayed after successful login.");
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

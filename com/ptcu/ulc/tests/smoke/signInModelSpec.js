/**
 * Created by bgupta on 19-12-2016.
 */
'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var exec = require('../../utils/specHelper');

describe('User On boarding', function () {
    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var ulcURL = browser.params.ulcOptions.ulcURL;

    beforeAll(function () {
        landingPage.goTo(ulcURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should validate the Sign in window', function () {
        expect(headerFooter.isAt).toBe(true, "Header footer missing");
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
        headerFooter.signInLink.click();
        browser.waitForAngular();
        expect(headerFooter.signInForm.isDisplayed()).toBe(true, "Sign in form is missing");
        expect(headerFooter.closeSignInFormBtn().isDisplayed()).toBe(true, "Close button in sign in window is missing");
        expect(headerFooter.forgotPwd.isDisplayed()).toBe(true, "Forgot password link is missing");
        expect(headerFooter.signUpLink.isDisplayed()).toBe(true, "Sign Up link is missing");
        expect(headerFooter.exploreLC.isDisplayed()).toBe(true, "Explore Learning Connector link is missing");
        headerFooter.closeSignInFormBtn().click();
    });


});


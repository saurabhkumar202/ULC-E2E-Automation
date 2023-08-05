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

    it('Should navigate to Explore LC & validate the User onBoarding wizard', function () {
        expect(headerFooter.isAt).toBe(true, "Header footer missing");
        headerFooter.exploreLC.click();
        browser.waitForAngular();
        expect(headerFooter.onBoardingWizard.isDisplayed()).toBe(true, "User onBoarding Wizard is not displayed");
        expect(headerFooter.wizardHeaderTxt1()).toContain("Welcome to PTC Learning Connector");
        expect(headerFooter.btnNext1st.isDisplayed()).toBe(true, "Button next is not displayed on 1st page");

        headerFooter.btnNext1st.click();
        browser.waitForAngular();
        expect(headerFooter.wizardHeaderTxt2()).toContain("Choose how you want to learn");
        expect(headerFooter.btnBack1st.isDisplayed()).toBe(true, "Back button is not displayed on 2nd page");
        expect(headerFooter.btnNext2nd.isDisplayed()).toBe(true, "Button next is not displayed on 2nd page");

        headerFooter.btnNext2nd.click();
        browser.waitForAngular();
        expect(headerFooter.wizardHeaderTxt3()).toContain("Learn while doing");
        expect(headerFooter.btnBack2nd.isDisplayed()).toBe(true, "Back button is not displayed on 3rd page");
        expect(headerFooter.btnClose.isDisplayed()).toBe(true, "Close button is not displayed on 3rd page");

        headerFooter.btnBack2nd.click();
        browser.waitForAngular();
        expect(headerFooter.wizardHeaderTxt2()).toContain("Choose how you want to learn");

        headerFooter.btnBack1st.click();
        browser.waitForAngular();
        expect(headerFooter.wizardHeaderTxt1()).toContain("Welcome to PTC Learning Connector");

        headerFooter.btnNext1st.click();
        headerFooter.btnNext2nd.click();
        headerFooter.btnClose.click();

        expect(headerFooter.isAt).toBe(true, "Header footer missing");

    });
});


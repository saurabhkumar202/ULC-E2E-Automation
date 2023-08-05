'use strict';
var LandingPage = require('../../pages/landing.page.js');
var AdvertisementPage = require('../../pages/advertisement.page');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var advertisementPage = new AdvertisementPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var productToBrowse = "windchill";
var seeMoreData = require('../../resources/seeMoreData.json');

describe('ULC ADs on the home Page', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('verify if a user can see the bottom AD and its information', function () {
        advertisementPage.getBottomAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                expect(advertisementPage.getBottomAdTitle).toMatch("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|, .<>\\/?]*$");
                expect(advertisementPage.getBottomAdCTALink).toMatch("[(http)(https)].*");
                expect(advertisementPage.getBottomAdCTAText).toMatch("^(?!\\/d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 _.\\/&!@#+,$-]*)?$");
                expect(advertisementPage.closeBottomAdButton.isDisplayed()).toBe(true, "AD Close button is not displayed");
                expect(advertisementPage.getBottomAdImage).toMatch("url\\(\"https:\\/\\/.*\\/assets\\/images\\/lcComm\\/.*.svg\\\"\\)");
            }
            else expect(isDisplayed).not.toBe(false, "No bottom ad found");
        });
    });

    it('Verify if a user can close bottom Ad', function () {
        advertisementPage.getBottomAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertisementPage.closeBottomAdButton.click();
                browser.sleep(15000);
                expect(advertisementPage.getBottomAd.isPresent()).toBe(true);
                expect(advertisementPage.getBottomAd.isDisplayed()).toBe(false);
            }
            else expect(isDisplayed).not.toBe(false, "No bottom ad found");
        });
    });
});


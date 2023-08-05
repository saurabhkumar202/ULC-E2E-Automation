'use strict';

var LandingPage = require('../../pages/landing.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var AdvertisementPage = require('../../pages/advertisement.page');
var exec = require('../../utils/specHelper');
var advertisementPage = new AdvertisementPage();
var landingPage = new LandingPage();
var searchResultsPage = new SearchResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;

var searchKeyword = "creo";


describe('ULC ADs on the Search Page', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
        searchResultsPage.tutorialsSeeMoreLink.click();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('verify if a user can see the Side AD and its information', function () {
        advertisementPage.getSideAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                expect(advertisementPage.getSideAdTitle).toMatch("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|, .<>\\/?]*$");
                expect(advertisementPage.getSideAdCTALink).toMatch("[(http)(https)].*");
                expect(advertisementPage.getSideAdCTAText).toMatch("^(?!\\/d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 _.\\/&!@#+,$-]*)?$");
                expect(advertisementPage.closeSideAdButton.isDisplayed()).toBe(true, "AD Close button is not displayed");
                expect(advertisementPage.getSideAdImage).toMatch("url\\(\"(https:)|(http:)\\/\\/.*\\/assets\\/images\\/lcComm\\/.*.svg\\\"\\)");
            }
            else expect(isDisplayed).not.toBe(false, "No Side ad found");
        });

    });

    it('Verify if a user can close Side Ad', function () {
        advertisementPage.getSideAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertisementPage.closeSideAdButton.click();
                browser.sleep(5000);
                expect(advertisementPage.getSideAd.isPresent()).toBe(true);
                expect(advertisementPage.getSideAd.isDisplayed()).toBe(false);
            }
            else expect(isDisplayed).not.toBe(false, "No Side ad found");
        });
    });
});
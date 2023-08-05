'use strict';
var LandingPage = require('../../pages/landing.page.js');
var AdvertisementPage = require('../../pages/advertisement.page');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browseResultsPage = new BrowseResultsPage();
var browseContentMenuPage = new BrowseContentMenuPage();
var advertisementPage = new AdvertisementPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');

describe('ULC ADs on the home Page', function () {


    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        browseResultsPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
        element(by.linkText(seeMoreData.productToBrowse[0])).click();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('verify if a user can see the Top AD and its information', function () {
        advertisementPage.getTopAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                expect(advertisementPage.getTopAdTitle).toMatch("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|, .<>\\/?]*$");
                expect(advertisementPage.getTopAdCTALink).toMatch("[(http)(https)].*");
                expect(advertisementPage.getTopAdCTAText).toMatch("^(?!\\/d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 _.\\/&!@#+,$-]*)?$");
                expect(advertisementPage.closeTopAdButton.isDisplayed()).toBe(true, "AD Close button is not displayed");
            }
            else expect(isDisplayed).not.toBe(false, "No Top AD found");
        });
    });

    it('Verify if a user can close Top AD', function () {
        advertisementPage.getTopAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertisementPage.closeTopAdButton.click();
                browser.sleep(15000);
                expect(advertisementPage.getTopAd.isPresent()).toBe(true);
                expect(advertisementPage.getTopAd.isDisplayed()).toBe(false);
            }
            else expect(isDisplayed).not.toBe(false, "No Top AD found");
        });
    });

    it('verify if a user can see the Inline AD and its information for Creo browse', function () {
        // Step to Click windchill/ThingWorx/Vuforia Studio/Vuforia Expert Capture/Vuforia chalk from browse
        advertisementPage.getInlineAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                expect(advertisementPage.getInlineAdTitle).toMatch("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|, .<>\\/?]*$");
                expect(advertisementPage.getInlineAdCTALink).toMatch("[(http)(https)].*");
                expect(advertisementPage.getInlineAdCTAText).toMatch("^(?!\\/d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 _.\\/&!@#+,$-]*)?$");
                expect(advertisementPage.closeInlineAdButton.isDisplayed()).toBe(true, "AD Close button is not displayed");
                expect(advertisementPage.getInlineAdImage).toMatch("url\\(\"https:\\/\\/.*\\/assets\\/images\\/lcComm\\/.*.svg\\\"\\)");
            }
            else expect(isDisplayed).not.toBe(false, "No Inline AD found");
        });
    });

    it('Verify if a user can close Inline AD for Creo browse', function () {
        // Step to Click Creo from browse
        advertisementPage.getInlineAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertisementPage.closeInlineAdButton.click();
                browser.sleep(15000);
                expect(advertisementPage.getInlineAd.isPresent()).toBe(true);
                expect(advertisementPage.getInlineAd.isDisplayed()).toBe(false);
            }
            else expect(isDisplayed).not.toBe(false, "No Inline AD found");
        });
    });

});


/**
 * Created by dghan on 28-07-2016.
 */
'use strict';
var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browseResultsPage = new BrowseResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var productToBrowse = "windchill";
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Verify content language functionality for browsing a product', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
    });
    afterAll(function () {
        exec.cleanUp();
    });

    afterEach(function () {
        browseResultsPage.goToBrowserBack;
        browser.waitForAngular();
        browseResultsPage.contentLanguage.click();
        browseResultsPage.contentLanguageEnglish.click()
    });


    it('Should display Content Language button on browse results Page', function () {
        expect(browseResultsPage.contentLanguage.isDisplayed()).toBe(true);
        browseResultsPage.contentLanguage.click();
        browseResultsPage.contentLanguageFrench.click();
        browseResultsPage.getFirstTutorial.click();
        expect(browseResultsPage.getURL).toContain("contentLocale=fr");
    });

});


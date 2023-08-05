'use strict'

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var urlSpecification = require('../../resources/urlSpecification.json');

describe('Tests for ADs API on browse pages', function () {

    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var browseResultsPage = new BrowseResultsPage();

    var expectADsBrowseQueryParams = {
        "family": "thingworx",
        "product": "all",
        "language": "en",
        "page": "browse",
        "apiformat": "jsonp"
    };

    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeEach(function () {
        landingPage.startFreshNetworkCapture();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Verify the ADS API call for browsing for Thingworx ', function () {

        console.log(ulcURL+"/products/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0]);
        landingPage.goTo(ulcURL+"/products/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0]);
        browser.waitForAngular();

        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });


    it('Verify the Ads API call for Browse Seemore page of contentType Tutorials', function () {

        console.log(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[0] + "&" + urlSpecification.urlPath.seemore.technicalArea[0]);
        landingPage.goTo(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[0] + "&" + urlSpecification.urlPath.seemore.technicalArea[0]);
        browser.waitForAngular();

        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
    it('Verify the Ads API call for Browse Seemore page of contentType Courses', function () {

        console.log(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[1]);
        landingPage.goTo(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[1]);
        browser.waitForAngular();

        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
    it('Verify the Ads API call for Browse Seemore page of contentType KB', function () {

        console.log(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[2]);
        landingPage.goTo(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[2]);
        browser.waitForAngular();

        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the Ads API call for Browse Seemore page of contentType HC', function () {

        console.log(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[3]);
        landingPage.goTo(ulcURL+"/seeMore/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0] + "&" + urlSpecification.urlPath.seemore.contentType[3]);
        browser.waitForAngular();

        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
});
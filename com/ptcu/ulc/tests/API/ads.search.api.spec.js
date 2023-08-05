'use strict';

var LandingPage = require('../../pages/landing.page.js');
var SearchPage = require('../../pages/search.results.page.js');
var urlSpecification = require('../../resources/urlSpecification.json');
var exec = require('../../utils/specHelper');
var BrowseResultsPage = require('../../pages/browse.results.page.js');

describe('Tests for ADs API on Search pages', function () {

    var landingPage = new LandingPage();
    var searchPage = new SearchPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var browseResultsPage = new BrowseResultsPage();

    var expectAdsSearchQueryParams = {
        "family": "all",
        "product": "all",
        "language": "en",
        "page": "search",
        "apiformat": "jsonp"
    };


    beforeEach(function () {
        searchPage.startFreshNetworkCapture();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    afterEach(function () {
        searchPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    it('Verify the Ads API call for Search page of contentType Tutorials', function () {
        landingPage.goTo(ulcURL + '/seeMore?searchKeyword=creo' + '&' + urlSpecification.urlPath.seemore.contentType[0] + '&' + urlSpecification.urlPath.seemore.technicalArea[0]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectAdsSearchQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
    it('Verify the Ads API call for Search page of contentType Courses', function () {
        searchPage.startFreshNetworkCapture();
        landingPage.goTo(ulcURL + '/seeMore?searchKeyword=creo' + '&' + urlSpecification.urlPath.seemore.contentType[1]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectAdsSearchQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
    it('Verify the Ads API call for Search page of contentType KB', function () {
        //searchPage.startFreshNetworkCapture();
        landingPage.goTo(ulcURL + '/seeMore?searchKeyword=creo' + '&' + urlSpecification.urlPath.seemore.contentType[3]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectAdsSearchQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the Ads API call for Search page of contentType HC', function () {
        //searchPage.startFreshNetworkCapture();
        landingPage.goTo(ulcURL + '/seeMore?searchKeyword=creo' + '&' + urlSpecification.urlPath.seemore.contentType[3]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectAdsSearchQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
    it('Verify the Ads API call for Search page of contentType CM', function () {
        //searchPage.startFreshNetworkCapture();
        landingPage.goTo(ulcURL + '/seeMore?searchKeyword=creo' + '&' + urlSpecification.urlPath.seemore.contentType[4]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectAdsSearchQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

});
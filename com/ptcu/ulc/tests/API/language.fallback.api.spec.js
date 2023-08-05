/**
 * Created by saukumar on 24-05-2017.
 */
'use strict'

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var RecommendationPage = require('../../pages/recommendation.page.js');
var dummyClientData = require('../../resources/dummyClientData.json');
describe('Tests for language fallback API', function () {
    var landingPage = new LandingPage();
    var productToBrowse = "ThingWorx";
    var ulcURL = browser.params.ulcOptions.ulcURL;
    console.log("Starting with the tests");
    var headerFooter = new Header_Footer();
    var recommendationPage = new RecommendationPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var forward = "1";
    var backward = "0";
    var commandHome = "ConnectorHome";
    var commandToMap = "mapCommand";
    var browseResultsPage = new BrowseResultsPage();


    var expectPLMSLanguageFallbackQueryParams = {
        // "keyword": "\"ThingWorx\"",
        "lcContext": "ConnectorHome",
        "apiformat": "jsonp"
    };
    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function () {
        recommendationPage.startFreshNetworkCapture();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should launch ULC from the Dummy client', function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.VersionForFallback, dummyClientData.localeRU);
        });

        dummyClient.switchWindow(forward);
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
            console.log("wait ...is over...");
        });

        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);

    });

    it('Should verify the PLMS Fallback API call for Thingworx ', function () {

        recommendationPage.getCurrentHARDetails(browser.params.apiType.PLMS_FALLBACK, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSLanguageFallbackQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.PLMS_FALLBACK)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });


});

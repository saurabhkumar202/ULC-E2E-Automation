//* Created by saukumar on 19-06-2017.

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var RecommendationPage = require('../../pages/recommendation.page.js');
var dummyClientData = require('../../resources/dummyClientData.json');
var DBHelper = require('../../utils/dbHelper.js');
describe('Tests for version consolidation API', function () {
    var landingPage = new LandingPage();
    var productToBrowse = "ThingWorx";
    var productToValidate = "Thingworx Composer";
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
    var consolidatedVersion;
    var sid;
    var browseResultsPage = new BrowseResultsPage();


    var expectPLMSConsolidationQueryParams = {
        // "keyword": "\"ThingWorx\"",
        "lcContext": "ConnectorHome",
        "apiformat": "jsonp"
    };
    afterEach(function () {
        recommendationPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function (done) {
        recommendationPage.startFreshNetworkCapture().then(function () {
            dummyClient.runOnNonAngular(function () {
                dummyClient.goTo(dummyClientURL);
                dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.VersionForConsolidation, dummyClientData.locale);
            });

            dummyClient.switchWindow(forward);
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
                console.log("wait ...is over...");
            });

            browser.waitForAngular();
            done();
        });
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should launch ULC from the Dummy client', function () {
        expect(headerFooter.isAt).toBe(true);

    });

    it('Should get the correct consolidated PLMS version number', function (done) {
        var versionToConsolidate = dummyClientData.VersionForConsolidation;
        DBHelper.getSearchInfoId(productToValidate, versionToConsolidate).then(function (res) {
            sid = res;
            console.log("Search info Id is" + sid)
        }).then(function () {
            DBHelper.getLMSVersionForConnectedProduct(sid).then(function (res2) {
                consolidatedVersion = res2;
                console.log("Consolidated version is" + consolidatedVersion);
                done();

            });
        });
        expect(consolidatedVersion).not.toBeNull('The last consolidated version is null');
    });

    it('Should verify the PLMS consolidated mapping tag API call for Thingworx ', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.PLMS_MAPPING_TAG, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(responses[0].url).toContain(consolidatedVersion);
            //console.log("The consolidated version is"+consolidatedVersion);
            expect(responses[0].url).toMatch(browser.params.apiType.PLMS_MAPPING_TAG + consolidatedVersion + ".*");
            // expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.PLMS_MAPPING_TAG)).toBe(true, recommendationPage.apiLog.join(">>"));
        });

    });

    it('Should verify the PLMS consolidated recommendation API call for Thingworx ', function () {
        browser.waitForAngular();
        recommendationPage.getCurrentHARDetails(browser.params.apiType.THINGWORX_RECOMMENDATION, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(responses[0].url).toContain(consolidatedVersion);
            //console.log("The consolidated version is"+consolidatedVersion);
            expect(responses[0].url).toMatch(browser.params.apiType.THINGWORX_RECOMMENDATION + consolidatedVersion + ".*");
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.THINGWORX_RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });

    });


});

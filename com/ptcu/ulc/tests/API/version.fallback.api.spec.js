// * Created by saukumar on 01-06-2017.
var DummyClient = require('../../pages/dummy.client.page.js');
var RecommendationPage = require('../../pages/recommendation.page.js');
var dummyClientData = require('../../resources/dummyClientData.json');
var Header_Footer = require('../../pages/header.footer.page.js');
var LandingPage = require('../../pages/landing.page.js');
var DBHelper = require('../../utils/dbHelper.js');
describe('Version Fallback', function () {

    var recommendationPage = new RecommendationPage();
    var dummyClient = new DummyClient();
    var headerFooter = new Header_Footer();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var forward = "1";
    var backward = "0";
    var latestVersion;
    var productToValidate = "Thingworx Composer";
    var ToFallVersion = "0";
    var minVersion = "0";
    var sid;
    var consolidatedVersion;

    var expectPLMSVersionFallbackQueryParams = {
        // "keyword": "\"ThingWorx\"",
        "lcContext": "ConnectorHome",
        "apiformat": "jsonp"
    };
    beforeAll(function () {
        recommendationPage.startFreshNetworkCapture();
    });
    afterEach(function () {
        recommendationPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    it('Should get the connected versions table information from Database', function () {
        DBHelper.getLatestVersionOfConnectedProduct(productToValidate).then(function (version) {
            console.log("Latest version is " + version);
            latestVersion = version;
        });

        DBHelper.getOldestVersionOfConnectedProduct(productToValidate).then(function (version) {
            console.log("Oldest version is " + version);
            minVersion = version;
        });

        expect(latestVersion).not.toBeNull('The Latest Version is null');
        expect(minVersion).not.toBeNull('The Oldest Version is null');
    });

    it('Should launch ULC from the Dummy client', function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.VersionForFallback, dummyClientData.locale);
        });

        dummyClient.switchWindow(forward);
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
            console.log("wait ...is over...");
        });
        expect(headerFooter.isAt).toBe(true);

    });

    it('Should get the actual fallback version', function (done) {
        DBHelper.getFallbackVersionForConnectedProduct(latestVersion, minVersion, productToValidate).then(function (res) {
            ToFallVersion = res;
            expect(ToFallVersion).not.toBeNull('The fallback version is null');
            done();
        });
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

    it('Should verify the PLMS Version Fallback API call for Thingworx ', function () {
        browser.waitForAngular();
        recommendationPage.getCurrentHARDetails(browser.params.apiType.THINGWORX_RECOMMENDATION, "queryString", function (responses) {
            console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectPLMSVersionFallbackQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(responses[0].url).toContain(consolidatedVersion);
            expect(responses[0].url).toMatch(browser.params.apiType.THINGWORX_RECOMMENDATION + consolidatedVersion + ".*");
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.THINGWORX_RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });
});


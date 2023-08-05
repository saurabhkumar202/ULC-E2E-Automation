/**
 * Created by saukumar on 16-11-2017.
 */

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Tests for IoTU Banner API', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var IoTUBannerLane = new BrowseBannerResultsPage();

    var expectIotuAPIQueryParams = {
        "learningSource": "IoTU",
        "apiformat": "jsonp"
    };
    afterEach(function () {
        IoTUBannerLane.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function (done) {
        IoTUBannerLane.startFreshNetworkCapture().then(function () {
            done();
        });
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should verify the IOTU API request and response for Thingworx ', function () {
        landingPage.goTo(ulcURL);
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[1], seeMoreData.familyToBrowse[1]);
        browser.waitForAngular();
        IoTUBannerLane.getCurrentHARDetails(browser.params.apiType.BANNER_BROWSE, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectIotuAPIQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(IoTUBannerLane.verifyAPISpecification(responses, browser.params.apiType.BANNER_BROWSE)).toBe(true, IoTUBannerLane.apiLog.join(">>"));
        });

    });
});

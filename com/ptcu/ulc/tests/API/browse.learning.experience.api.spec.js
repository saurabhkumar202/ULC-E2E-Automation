/**
 * Created by saukumar on 16-11-2017.
 */

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Tests for Learning Experience Banner API', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var LXBannerLane = new BrowseBannerResultsPage();

    var expectLXAPIQueryParams = {
        "learningSource": "IoTU",
        "apiformat": "jsonp"
    };
    afterEach(function () {
        LXBannerLane.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function (done) {
        LXBannerLane.startFreshNetworkCapture().then(function () {
            done();
        });
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should verify the LX API request and response for Creo ', function () {
        landingPage.goTo(ulcURL);
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[1], seeMoreData.familyToBrowse[1]);
        browser.waitForAngular();
        // expect(LXBannerLane.banner().getCoursesCount()).toBe(5);
        LXBannerLane.getCurrentHARDetails(browser.params.apiType.BANNER_BROWSE, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectLXAPIQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(LXBannerLane.verifyAPISpecification(responses, browser.params.apiType.BANNER_BROWSE)).toBe(true, LXBannerLane.apiLog.join(">>"));
        });

    });
});

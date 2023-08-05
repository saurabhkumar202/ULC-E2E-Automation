/**
 * Created by saukumar on 16-11-2017.
 */

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Tests for Landing Page Learning Experience Banner API', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;

    var expectLXAPIQueryParams = {
        "learningSource": "NextGenLMS",
        "apiformat": "jsonp"
    };
    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function (done) {
        landingPage.startFreshNetworkCapture().then(function () {
            done();
        });
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should verify the LX API request and response', function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        landingPage.getCurrentHARDetails(browser.params.apiType.LX_BANNER_LAUNCH, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectLXAPIQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(landingPage.verifyAPISpecification(responses, browser.params.apiType.LX_BANNER_LAUNCH)).toBe(true, landingPage.apiLog.join(">>"));
        });

    });
});

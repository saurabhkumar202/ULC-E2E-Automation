/**
 * Created by saukumar on 16-11-2017.
 */

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Tests for ILE Course API ', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var IoTUBannerLane = new BrowseBannerResultsPage();
    var ILETitle = 'Creo Parametric Modeling Essentials: Core';

    var expectIleAPIQueryParams = {
        "classId": "172"
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

    it('Should verify training plan of ILE ', function () {
        landingPage.goTo(ulcURL);
        landingPage.clickOnGivenLE(ILETitle);
        browser.waitForAngular();
        IoTUBannerLane.getCurrentHARDetails(browser.params.apiType.ILE_COURSE, null, function (responses) {
            console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectIleAPIQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(IoTUBannerLane.verifyAPISpecification(responses, browser.params.apiType.ILE_COURSE)).toBe(true, IoTUBannerLane.apiLog.join(">>"));
        });

    });
});
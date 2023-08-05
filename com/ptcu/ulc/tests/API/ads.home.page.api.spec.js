'use strict'

var LandingPage = require('../../pages/landing.page.js');
var exec = require('../../utils/specHelper');
describe('Tests for ADs API', function () {
var landingPage = new LandingPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var expectADsBrowseQueryParams = {
    "family": "all",
    "product": "all",
    "language": "en",
    "page": "home",
    "apiformat": "jsonp"
};
beforeAll(function () {
    landingPage.goTo(ulcURL);
});
afterAll(function () {
    exec.cleanUp();
});
beforeEach(function () {
    landingPage.startFreshNetworkCapture();
});
afterEach(function () {
    landingPage.getBrowserErrors(function (logs) {
        expect(logs.length).toBe(0, logs.toString());
    });
});

it('on the home page', function () {
    browser.waitForAngular();
    landingPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
        expect(responses.length).toBe(1);
        expect(expectADsBrowseQueryParams).toHavePropertiesIn(responses[0].queryString);
        console.log(JSON.stringify(responses[0]));
        expect(landingPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, landingPage.apiLog.join(">>"));
    });
})
});
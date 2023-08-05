/**
 * Created by mbenur on 16-04-2018.
 */


var LandingPage = require('../../pages/landing.page.js');
var landingPage = new LandingPage();
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var IoTUBannerLane = new BrowseBannerResultsPage();
var exec = require('../../utils/specHelper');
var ulcURL = browser.params.ulcOptions.ulcURL;

describe('Verify IoTU banner on the home page', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('IoTU banner should contain 4 courses', function () {
        expect(landingPage.getIoTUCoursesCount).toBe(4);
    });
    it('IoTU banner should have book icon', function () {
        expect(IoTUBannerLane.banner().getCourseIcon().isDisplayed()).toBe(true);
    });
    it('Clicking on the course should open course in a new tab/window', function () {
        expect(landingPage.ValidateACourse).toContain('https://www.ptcu.com');
    });
});
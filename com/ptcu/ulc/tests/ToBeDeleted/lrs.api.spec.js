'use strict'

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var VideoDetailPage = require('../../pages/videoDetail.page.js');
var exec = require('../../utils/specHelper');

describe('Tests for LRS APIs', function () {
    var landingPage = new LandingPage();
    var headerFooterPage = new Header_footer_Page();
    var videoDetail = new VideoDetailPage();
    var productFamily = "Creo";
    var product = "Windchill PDMLink";
    var uname = "precisionautomation";
    var password = "ptcse1";
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var browseResultsPage = new BrowseResultsPage();

    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeEach(function () {
        landingPage.goTo(ulcURL);
        landingPage.startFreshNetworkCapture();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Verify the call for LRS for "Tutorials Launch"', function () {
        landingPage.clickOnGivenProduct(productFamily);
        landingPage.startFreshNetworkCapture().then(function () {
            landingPage.clickOnFirstTutorial();
        });
        // landingPage.clickOnFirstTutorial();
        browser.sleep(4000);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.LRS, null, function (responses) {
            expect(responses.length).toMatch("[0-9]$");
            expect(responses[0].status).toBe(200, "The response is not OK");
        });
    });

    xit('Verify the call for LRS for "Tutorials Play"', function () {
        headerFooterPage.browseContentButton.click();
        browser.waitForAngular();
        element(by.linkText(product)).click();
        browser.waitForAngular().then(function () {
            landingPage.clickOnFirstTutorial();
        });
        // landingPage.clickOnFirstTutorial();
        videoDetail.waitForVideoToAppear();
        browser.waitForAngular();
        landingPage.startFreshNetworkCapture();
        videoDetail.clickVideoPlayer();
        browser.sleep(6000);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.LRS, null, function (responses) {
            //BUG: Tutorial play sends 2 POST request
            expect(responses.length).toMatch("[0-9]$");
            expect(responses[0].status).toBe(200, "The response is not OK");
        });
    });

    xit('Verify the call for LRS for "Tutorials Pause"', function () {
        landingPage.clickOnGivenProduct(productFamily);
        landingPage.clickOnFirstTutorial();
        videoDetail.waitForVideoToAppear();
        videoDetail.clickVideoPlayer();
        browser.waitForAngular();
        browser.sleep(6000);
        landingPage.startFreshNetworkCapture();
        videoDetail.waitForVideoToPlay();
        videoDetail.videoPause();
        browser.sleep(4000);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.LRS, null, function (responses) {
            expect(responses.length).toMatch("[0-9]$");
            expect(responses[0].status).toBe(200, "The response is not OK");
        });
    });

    xit('Verify the call for LRS for "Tutorials Video Forward/Seek"', function () {
        landingPage.clickOnGivenProduct(productFamily);
        landingPage.clickOnFirstTutorial();
        videoDetail.waitForVideoToAppear();
        videoDetail.clickVideoPlayer();
        browser.waitForAngular();
        browser.sleep(6000);
        landingPage.startFreshNetworkCapture();
        // videoDetail.waitForVideoToAppear();
        videoDetail.videoForward();
        browser.sleep(4000);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.LRS, null, function (responses) {
            expect(responses.length).toMatch("[0-9]$");
            expect(responses[0].status).toBe(200, "The response is not OK");
        });
    });

});

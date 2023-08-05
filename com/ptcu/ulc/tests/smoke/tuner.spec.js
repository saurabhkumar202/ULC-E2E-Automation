'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var Tuner = require('../../pages/tuner.page.js');
var exec = require('../../utils/specHelper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('Tests for Tuner', function () {
    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var tuner = new Tuner();
    var forward = "1";
    var backward = "0";
    var commandHome = "ConnectorHome";

    beforeAll(function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });

        dummyClient.switchWindow(forward);
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
            console.log("wait ...is over...");
        });

        browser.waitForAngular();
    });
    afterAll(function () {
        exec.cleanUp();
    });

    it('Should launch ULC from the Dummy client', function () {
        expect(headerFooter.isAt).toBe(true);

    });

    it('Should sign In ULC with an Organisation admin/Standard tuner role', function () {
        expect(headerFooter.isAt).toBe(true);
        exec.login(String(loginData.uid), String(loginData.pwd));
    });

    it('Should open the tuner window and verify ConnectorHome command', function () {
        tuner.clickTunerIcon();
        tuner.tunerSearch(commandHome);
        expect(tuner.commandTable).toContain(commandHome);
    });

    it('Should verify if the course mapped to a command is displayed', function () {
        expect(headerFooter.isAt).toBe(true);
        expect(tuner.verifyCourseMapped()).toBe(true, "Course mapped is missing");
    });

    it('Should verify the details of the course mapped to a command', function () {
        expect(headerFooter.isAt).toBe(true);
        browser.driver.manage().window().maximize();
        tuner.clickCourseMapped();
        tuner.runOnNonAngular(function () {
             //var EC = protractor.ExpectedConditions;
            // browser.wait(EC.presenceOf(tuner.coursePTCLinkInHeader), 30000);
            browser.sleep(4000);
            expect(tuner.courseExitButton.isDisplayed()).toBe(true, "CourseExit button is missing");
            expect(tuner.coursePTCLinkInHeader).toContain("PTC University");
            expect(tuner.coursePTCLinkInFooter).toContain("PTC University");
            browser.sleep(4000);
            expect(tuner.courseTitleInHeader).toContain(tuner.courseTitleInTree);
            expect(tuner.verifyBookmarkIcon).toBe(true, "Bookmark Icon missing");
            expect(tuner.courseModules.isDisplayed()).toBe(true, "Course modules are missing");
            expect(tuner.verifyMarkCourseComplete).toBe(false, "Mark course complete is displayed");
            tuner.courseExitButton.click();

        });
        browser.waitForAngular();
    });
});
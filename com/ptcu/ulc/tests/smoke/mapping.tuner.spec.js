/**
 * Created by bgupta on 08-09-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var Tuner = require('../../pages/tuner.page.js');
var exec = require('../../utils/specHelper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('Tests for Mappings', function () {
    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var tuner = new Tuner();
    //var localeSelected = "en";
    var forward = "1";
    var backward = "0";
    var nextWindow = "2";
    var nextWindow2 ="3";
    var commandToMap = "mapCommand";
    var StdResult ="";
    var custResult ="";
    var customTunerAdminUser = "prof_verify_manager@ptcunoemail.com";
    var CustomTunerAdminPwd = "prof7763";


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

    it('Should launch ULC from the Dummy client and sign in to ULC', function () {

        expect(headerFooter.isAt).toBe(true);
        exec.login(String(loginData.uid), String(loginData.pwd));
    });

    it('Should open the tuner window and switch the window back to the dummy client', function () {
        tuner.clickTunerIcon();
        dummyClient.switchWindow(backward);
    });

    it('Should set the context from the host to the Product to map a command', function () {
        dummyClient.runOnNonAngular(function () {
            browser.sleep(4000);
            dummyClient.setCommand(commandToMap);
            dummyClient.switchWindow(forward);
        });
    });
    it('Edit standard Recommendations and verify the LMS tuner page', function () {
        browser.waitForAngular();
        tuner.findCommandInList(commandToMap);
        tuner.clickEditStdRecommendation.then(function() {
            browser.sleep(4000);
            dummyClient.switchWindow(nextWindow);
            dummyClient.runOnNonAngular(function () {
                browser.driver.manage().window().maximize();
                browser.sleep(8000);
                expect(tuner.tunerWindowPTCTitle()).toContain("PTC University Enterprise");
                expect(tuner.tnrWdwCurrCustomizing()).toContain(commandToMap);
                expect(tuner.saveTitleBtn.isDisplayed()).toBe(true);
                expect(tuner.titleTxt.isDisplayed()).toBe(true);
            });
        });
    });

    it('Should map courses/title and verify it have been mapped to the command with standard Tuner Role', function () {
        //browser.waitForAngular();
        dummyClient.runOnNonAngular(function () {
            tuner.setCommandTitle(commandToMap);
            tuner.clickMappingContent(tuner.getTitleOfMappedCourse);
            dummyClient.switchWindow(nextWindow2);
            tuner.selectFirstCourseForMapping;
            browser.sleep(2000);
            tuner.getFirstCourseTitleForMapping.getText().then(function (title) {
                StdResult = title;
            });
            browser.sleep(5000);
            tuner.clickOnAddAndContinue();
        });
        dummyClient.switchWindow(forward);
        browser.waitForAngular();
        tuner.clickRefreshRecommendations.then(function () {
            browser.sleep(6000);
            expect(tuner.getFirstCourseTitleMapped).toContain(StdResult);
            tuner.getTitleMappedToCommand.then(function(title){
                expect(title).toBe(commandToMap);
            });
        });
        dummyClient.switchWindow(nextWindow);
        dummyClient.runOnNonAngular(function () {
            tuner.clearMapping;
        });
        dummyClient.switchWindow(forward);
        exec.logout();
    });
    it('Login with Custom Role & Edit Custom Recommendations and verify the LMS tuner page', function () {
        browser.waitForAngular();
        exec.login(customTunerAdminUser,CustomTunerAdminPwd);
        tuner.findCommandInList(commandToMap);
        tuner.clickEditCstmRecommendation.then(function() {
            browser.sleep(4000);
            dummyClient.switchWindow(nextWindow);
            dummyClient.runOnNonAngular(function () {
                browser.driver.manage().window().maximize();
                browser.sleep(5000);
                expect(tuner.tunerWindowPTCTitle()).toContain("PTC University Enterprise");
                expect(tuner.tnrWdwCurrCustomizing()).toContain(commandToMap);
            });
        });
    });

    it('Should map courses/title and verify it have been mapped to the command with Custom Tuner Role', function () {
        dummyClient.runOnNonAngular(function () {
            tuner.clickMappingContent(tuner.getTitleOfMappedCourse);
            browser.sleep(3000);
            dummyClient.switchWindow(nextWindow2);
            tuner.selectFirstCourseForMapping;
            tuner.getFirstCourseTitleForMapping.getText().then(function (title1) {
                custResult = title1;
            });
            browser.sleep(2000);
            tuner.clickOnAddAndContinue();
        });
        dummyClient.switchWindow(forward);
        browser.waitForAngular();
        tuner.clickRefreshRecommendations.then(function () {
            expect(tuner.getFirstCourseTitleMapped).toContain(custResult);
        });
        browser.sleep(5000);
        tuner.deleteCustomRecommendations();
        tuner.clickDeleteUrl().click();
        exec.logout();
    });

});


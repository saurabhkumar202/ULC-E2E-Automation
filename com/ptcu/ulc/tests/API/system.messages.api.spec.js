/**
 * Created by bgupta on 24-10-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var SystemMessagesPage = require('../../pages/system.messages.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var SearchPage = require('../../pages/search.results.page.js');
var exec = require('../../utils/specHelper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('Tests for System message APIs', function () {

    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var dummyClient = new DummyClient();
    var searchPage = new SearchPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var systemMessages = new SystemMessagesPage();
    /*var userName = "precisionlmsadmin";
    var password = "2learnNow195";*/
    var msgTitle = "AutoSysMsgAPITest";
    var versionSelected = "thingworx6_5";
    var contextAll = "all";
    //var localeSelected = "en";
    var systemMessage = "API Test: Auto System Message API Test";
    var forward = "1";
    var backward = "0";
    var contextMsgTitle = "ContextSystemMsgAPI";
    var contextSpecific = "PTC";
    var contextSysMsg = "System message for context PTC";

    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        systemMessages.startFreshNetworkCapture();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should sign In ULC as System Admin', function () {
        // headerFooter.userSignIn(userName, password);
        exec.login(String(loginData.userName), String(loginData.password));
    });

    it('Should display and click Administrative Settings link', function () {
        expect(headerFooter.lnkUserAccount.isDisplayed()).toBe(true);
        headerFooter.lnkUserAccount.click();
        expect(headerFooter.lnkAdminSettings.isDisplayed()).toBe(true);
        headerFooter.lnkAdminSettings.click();
    });

    it('Should add a new system message', function () {
        expect(systemMessages.isAddNewMsgBtnDisplayed).toBe(true);
        systemMessages.clickAddNewMsgBtn();
        expect(systemMessages.isBackBtnDisplayed).toBe(true);
        systemMessages.startFreshNetworkCapture();
        systemMessages.setSystemMessage(msgTitle, versionSelected, contextAll, dummyClientData.locale, systemMessage);
        browser.waitForAngular();
    });

    it('Verify the new system message API call', function () {
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_SAVE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.SYS_MSG_SAVE)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });

    it('Should add a new system message for a specific context', function () {
        expect(systemMessages.isAddNewMsgBtnDisplayed).toBe(true);
        systemMessages.clickAddNewMsgBtn();
        expect(systemMessages.isBackBtnDisplayed).toBe(true);
        systemMessages.startFreshNetworkCapture();
        systemMessages.setSystemMessage(contextMsgTitle, versionSelected, contextSpecific, dummyClientData.locale, contextSysMsg);
        browser.waitForAngular();
    });

    it('Verify the new context specific system message API call', function () {
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_SAVE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.SYS_MSG_SAVE)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });

    it('Should launch the Product and verify the system message on the Product page', function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            systemMessages.startFreshNetworkCapture();
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });

        dummyClient.switchWindow(forward);
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        expect(systemMessages.getSystemMessageDisplayedOnLC).toContain(systemMessage);
        systemMessages.closeSysMessage();
    });

    it('Should verify the system message API & switch the window back to the dummy client', function () {
        expect(headerFooter.isAt).toBe(true);
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_GET, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.SYS_MSG_GET)).toBe(true, searchPage.apiLog.join(">>"));
        });
        dummyClient.switchWindow(backward);
    });

    it('Should set the context from the host to the Product', function () {
        dummyClient.runOnNonAngular(function () {
            systemMessages.startFreshNetworkCapture();
            dummyClient.setCommand(contextSpecific);
            dummyClient.switchWindow(forward);
        });
    });

    it('Should verify the system message API & switch the window back to the dummy client', function () {
        expect(headerFooter.isAt).toBe(true);
        expect(systemMessages.getSystemMessageDisplayedOnLC).toContain(contextSysMsg);
        systemMessages.closeSysMessage();
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_GET, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.SYS_MSG_GET)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });

    it('Should verify the API for the system message delete', function () {
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        systemMessages.startFreshNetworkCapture();
        systemMessages.deleteTheGivenSystemMessage(msgTitle);
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_DELETE, null, function (responses) {

            expect(responses.length).toBe(1);
        });
    });

    it('Should verify the API for the context specific system message delete', function () {
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        systemMessages.startFreshNetworkCapture();
        systemMessages.deleteTheGivenSystemMessage(contextMsgTitle);
        expect(headerFooter.isAt).toBe(true);
        systemMessages.getCurrentHARDetails(browser.params.apiType.SYS_MSG_DELETE, null, function (responses) {

            expect(responses.length).toBe(1);
        });
    });

});


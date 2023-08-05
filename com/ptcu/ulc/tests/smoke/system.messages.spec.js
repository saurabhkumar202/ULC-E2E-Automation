/**
 * Created by dghan on 11/25/2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var SystemMessagePage = require('../../pages/system.messages.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var exec = require('../../utils/specHelper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('System Message Tests in English and Japanese', function () {
    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var systemMessagePage = new SystemMessagePage();

    var newMsgStatus = "Active";
    var versionSelected = "thingworx6_5";
    var contextAll = "all";
    var contextSpecific = "google";
    /*var localeSelected = "en";

     var userName = "precisionlmsadmin";
     var password = "2learnNow195";*/
    var LC_WINDOW = "1";
    var DUMMYCLIENT_WINDOW = "0";

    beforeEach(function () {
        headerFooter.goTo(browser.params.ulcOptions.ulcURL);
        exec.login(String(loginData.userName), String(loginData.password));
        browser.waitForAngular();
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        browser.waitForAngular();
        systemMessagePage.removeAllMessages();
        browser.waitForAngular();
    });

    afterEach(function () {
        exec.logout();
        browser.waitForAngular();
        exec.cleanUp();

    });

  /*  afterAll(function () {
        exec.cleanUp();
    }); */

    it('Admin user should be able to add a new system message', function () {
        var msgTitle = "AutoSysMsgTitleTest";
        var systemMessageString = "allContextSystemMsg";
        expect(systemMessagePage.isAddNewMsgBtnDisplayed).toBe(true);
        systemMessagePage.clickAddNewMsgBtn();
        expect(systemMessagePage.isBackBtnDisplayed).toBe(true);
        systemMessagePage.setSystemMessage(msgTitle, versionSelected, contextAll, dummyClientData.locale, systemMessageString);
        expect(systemMessagePage.msgTitleStatusInTable(msgTitle)).toMatch(["^", msgTitle, " ", newMsgStatus, ".*"].join(""));
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });

        dummyClient.switchWindow(LC_WINDOW);
        expect(headerFooter.isAt).toBe(true);
        expect(systemMessagePage.getSystemMessageDisplayedOnLC).toContain(systemMessageString);
        systemMessagePage.closeSysMessage();
        browser.waitForAngular();
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        systemMessagePage.deleteTheGivenSystemMessage(msgTitle);
        browser.waitForAngular();
        //browser.waits(5000)
    });

    it('Admin user should be able to add a new system message in JA locale', function () {
        var msgTitle = "SysMsgTitleJA";
        var systemMessageString = "allContextSystemMsgJA";
        expect(systemMessagePage.isAddNewMsgBtnDisplayed).toBe(true);
        systemMessagePage.clickAddNewMsgBtn();
        expect(systemMessagePage.isBackBtnDisplayed).toBe(true);
        systemMessagePage.setSystemMessage(msgTitle, versionSelected, contextAll, dummyClientData.localeJA, systemMessageString);
        expect(systemMessagePage.msgTitleStatusInTable(msgTitle)).toMatch(["^", msgTitle, " ", newMsgStatus, ".*"].join(""));
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.localeJA);
        });

        dummyClient.switchWindow(LC_WINDOW);
        expect(headerFooter.isAt).toBe(true);
        expect(systemMessagePage.getSystemMessageDisplayedOnLC).toContain(systemMessageString + 'これはテストメッセージです');
        systemMessagePage.closeSysMessage();
        browser.waitForAngular();
        browser.sleep(3000);
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        systemMessagePage.deleteTheGivenSystemMessage(msgTitle);
    });

    it('Admin user should be able to a new context based system message', function () {
        var contextMsgTitle = "ContextSystemMsg";
        var contextSysMsg = "System message for context Google";
        expect(systemMessagePage.isAddNewMsgBtnDisplayed).toBe(true);
        systemMessagePage.clickAddNewMsgBtn();
        expect(systemMessagePage.isBackBtnDisplayed).toBe(true);
        systemMessagePage.setSystemMessage(contextMsgTitle, versionSelected, contextSpecific, dummyClientData.locale, contextSysMsg);
        expect(systemMessagePage.msgTitleStatusInTable(contextMsgTitle)).toMatch(["^", contextMsgTitle, " ", newMsgStatus, ".*"].join(""));
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });
        dummyClient.switchWindow(LC_WINDOW);
        expect(headerFooter.isAt).toBe(true);
        dummyClient.switchWindow(DUMMYCLIENT_WINDOW);
        dummyClient.runOnNonAngular(function () {
            dummyClient.setCommand(contextSpecific);
        });
        dummyClient.switchWindow(LC_WINDOW);
        expect(headerFooter.isAt).toBe(true);
        browser.sleep(2000);
        expect(systemMessagePage.getSystemMessageDisplayedOnLC).toContain(contextSysMsg);
        systemMessagePage.closeSysMessage();
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        systemMessagePage.deleteTheGivenSystemMessage(contextMsgTitle);
    });

});

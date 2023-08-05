/**
 * Created by pankumar on 01-02-2017.
 */
/*
"use strict";
//Bug-ULC141. Remove comment once its resolved

var Header_Footer = require("../../pages/header.footer.page.js");
var DummyClient = require("../../pages/dummy.client.page.js");
var RecommendationPage = require("../../pages/recommendation.page.js");
var Tuner = require("../../pages/tuner.page.js");
var OrgPreference = require('../../pages/org.preference.page.js');
var exec = require("../../utils/specHelper");
var dummyClientData = require('../../resources/dummyClientData.json');

var headerFooter = new Header_Footer();
var dummyClient = new DummyClient();
var recommendation = new RecommendationPage();
var tuner = new Tuner();
var orgPref = new OrgPreference();
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
//var cstmTunerAdminUser = "<fill_in>";
//var cstmTunerAdminPwd = "<fill_in>";
var stdTunerAdminUser = "standardtuner@mailinator.com";
var stdTunerAdminPwd = "Test@1234";
var cstmTunerAdminUser = "precisionautomation";
var cstmTunerAdminPwd = "ptcse1";

var OrgAdminUser = "prof_verify_manager@ptcunoemail.com";
var OrgAdminPwd = "prof7763";
var urlToAdd = "http://www.youtube.com";
var urlTitle = "Visibility External URL Automation Test";
var urlDescription = "Visibility external url automation test description";
var urlThumbnail = "../../ulc/path/test.jpg";
var firstStdExtUrl = urlTitle + Math.random();
var secondStdExtUrl = urlTitle + Math.random();
var firstCstmExtUrl = urlTitle + Math.random();
var secondCstmExtUrl = urlTitle + Math.random();

//we created one standardtuner user  who has standard tuner role on UAT but it might get removed on the PLMS DB refresh.
//Tc getting failed due to additional resources not getting saved-ULC-141

describe("Visibility of external URL", function () {
    beforeAll(function () {
        //Data Setup
        //Add some standard external URLs
        browser.get(browser.params.ulcOptions.ulcURL);
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
        exec.launchULCFromDummyClient(dummyClientURL, ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        dummyClient.switchOn(browser.params.windowHandles.ULC);
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        dummyClient.switchOn(browser.params.windowHandles.DUMMY);
        dummyClient.runOnNonAngular(function () {
            dummyClient.setCommand("Visibility");
        });
        dummyClient.switchOn(browser.params.windowHandles.ULC);
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        tuner.clickTunerIcon();
        //Randomize the title for 1st title
        dummyClient.startFreshNetworkCapture();
        exec.addExternalURL("Visibility", urlToAdd, firstStdExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();
        exec.addExternalURL("Visibility", urlToAdd, secondStdExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();

        //Now, add some custom external URLs
        exec.logout();
        exec.login(cstmTunerAdminUser, cstmTunerAdminPwd);
        exec.addExternalURL("Visibility", urlToAdd, firstCstmExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();
        exec.addExternalURL("Visibility", urlToAdd, secondCstmExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();
        exec.logout();
    });

    afterAll(function () {
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
        browser.waitForAngular();
        tuner.deleteExternalURLByTitle(firstStdExtUrl);
        tuner.clickDeleteUrl().click();
        browser.sleep(2000);
        tuner.deleteExternalURLByTitle(secondStdExtUrl);
        tuner.clickDeleteUrl().click();
        browser.sleep(2000);
        tuner.deleteExternalURLByTitle(firstCstmExtUrl);
        tuner.clickDeleteUrl().click();
        browser.sleep(2000);
        tuner.deleteExternalURLByTitle(secondCstmExtUrl);
        tuner.clickDeleteUrl().click();
        browser.sleep(2000);
        exec.logout();
        exec.cleanUp();
    });

    it("should display only standard external URLs", function () {
        recommendation.getFeaturedLearningHeader.click();
        expect(tuner.getExternalURLTitles()).toEqual([firstStdExtUrl, secondStdExtUrl]);
        browser.waitForAngular();
    });

    it("should login as std tuner and display both custom and standard external URL " +
        "and they should be editable", function () {
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
        expect(tuner.getExternalURLTitles()).toEqual([firstCstmExtUrl, secondCstmExtUrl, firstStdExtUrl, secondStdExtUrl]);

        expect(tuner.verifyDeleteUrl(firstCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(firstCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(firstCstmExtUrl))).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(firstCstmExtUrl))).toBe(false);

        expect(tuner.verifyDeleteUrl(secondCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(secondCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(secondCstmExtUrl))).toBe(false);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(secondCstmExtUrl))).toBe(true);

        expect(tuner.verifyDeleteUrl(firstStdExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(firstStdExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(firstStdExtUrl))).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(firstStdExtUrl))).toBe(false);

        expect(tuner.verifyDeleteUrl(secondStdExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(secondStdExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(secondStdExtUrl))).toBe(false);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(secondStdExtUrl))).toBe(true);

        exec.logout();
    });

    it("should login as cstm tuner and display both custom and standard external URL " +
        "and only custom should be editable", function () {
        exec.login(cstmTunerAdminUser, cstmTunerAdminPwd);
        expect(tuner.getExternalURLTitles()).toEqual([firstCstmExtUrl, secondCstmExtUrl, firstStdExtUrl, secondStdExtUrl]);

        expect(tuner.verifyDeleteUrl(firstCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(firstCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(firstCstmExtUrl))).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(firstCstmExtUrl))).toBe(false);

        expect(tuner.verifyDeleteUrl(secondCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.verifyEditIcon(secondCstmExtUrl).isDisplayed()).toBe(true);
        expect(tuner.isMoveDisabled(tuner.btnMoveUp(secondCstmExtUrl))).toBe(false);
        expect(tuner.isMoveDisabled(tuner.btnMoveDown(secondCstmExtUrl))).toBe(true);

        expect(tuner.verifyDeleteUrl(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.verifyEditIcon(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveUp(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveDown(firstStdExtUrl).isDisplayed()).toBe(false);

        expect(tuner.verifyDeleteUrl(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.verifyEditIcon(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveUp(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveDown(secondStdExtUrl).isDisplayed()).toBe(false);

        tuner.clickTunerIcon();
        exec.logout();
    });
    it("should login as other organisation user and display only standard external URL " +
        "and no URL should be editable", function () {
        exec.login(OrgAdminUser, OrgAdminPwd);
        expect(tuner.getExternalURLTitles()).toEqual([firstStdExtUrl, secondStdExtUrl]);

        expect(tuner.verifyDeleteUrl(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.verifyEditIcon(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveUp(firstStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveDown(firstStdExtUrl).isDisplayed()).toBe(false);

        expect(tuner.verifyDeleteUrl(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.verifyEditIcon(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveUp(secondStdExtUrl).isDisplayed()).toBe(false);
        expect(tuner.btnMoveDown(secondStdExtUrl).isDisplayed()).toBe(false);

        tuner.clickTunerIcon();
        exec.logout();
    });

    it("should filter the external url based on org preferences", function () {
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        browser.waitForAngular();
        var pref = 'HIDEPTCCONTENT';
        orgPref.setOrgPreferences(pref);
        browser.waitForAngular();
        expect(tuner.getExternalURLTitles()).toEqual([firstCstmExtUrl, secondCstmExtUrl]);
        browser.waitForAngular();

        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        browser.waitForAngular();
        pref = 'ALWAYSHIDEPTCCONTENT';
        orgPref.setOrgPreferences(pref);
        browser.waitForAngular();
        expect(tuner.getExternalURLTitles()).toEqual([firstCstmExtUrl, secondCstmExtUrl]);
        browser.waitForAngular();

        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        browser.waitForAngular();
        pref = 'BOTH';
        orgPref.setOrgPreferences(pref);
        browser.waitForAngular();
        expect(tuner.getExternalURLTitles()).toEqual([firstCstmExtUrl, secondCstmExtUrl, firstStdExtUrl, secondStdExtUrl]);
        browser.waitForAngular();

        exec.logout();
    });

});
*/
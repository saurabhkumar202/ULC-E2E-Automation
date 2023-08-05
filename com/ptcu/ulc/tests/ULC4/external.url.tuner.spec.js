/**
 * Created by tdhir on 20-12-2016.
 */

'use strict';

var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var Tuner = require('../../pages/tuner.page.js');
var ExternalTuner = require('../../pages/external.url.tuner.page.js');
var exec = require('../../utils/specHelper');
var helper = require('../../utils/helper');

describe('Tests for External Url Tuner', function () {
    var headerFooter = new Header_Footer();
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var tuner = new Tuner();
    var externalTuner = new ExternalTuner();
    var localeSelected = "en";
    var forward = "1";
    var backward = "0";
    var commandHome = "ConnectorHome";
    var commandToMap = "mapCommand";
    var stdTunerAdminUser = "precisionautomation";
    var stdTunerAdminPwd = "ptcse1";
    var urlToAdd = "https://www.google.com";
    var urlTitle = "Automation Test";
    var urlDescription = "Test using automation";
    var urlThumbnail = "../path/test.jpg";


    it('Should launch ULC from the Dummy client and sign in to ULC', function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            //This needs to be changed to CREO
            dummyClient.launchUlc(ulcConnectedModeURL, "thingworx", "6.5", localeSelected);
        });
        dummyClient.switchWindow(forward);
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
            console.log("wait ...is over...");
        });
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
    });
    it('Should go back to the dummy client window to map the command', function () {
        browser.driver.manage().window().maximize();
        tuner.clickTunerIcon();
        tuner.tunerSearch(commandHome);
        expect(tuner.commandTable).toContain(commandHome);
        dummyClient.switchWindow(backward);
        dummyClient.runOnNonAngular(function () {
            dummyClient.setCommand(commandToMap);
            dummyClient.switchWindow(forward);
        });
    });
    it('Should open the external tuner window and add/save the external URL details using tuner window ', function () {
        expect(headerFooter.isAt).toBe(true);
        tuner.clickExternalTunerIcon.then(function () {
            expect(externalTuner.closeURLTuner.isDisplayed()).toBe(true, "Close button is missing");
            externalTuner.AddURLDetails(urlToAdd, urlTitle, urlThumbnail, urlDescription);
            //externalTuner.closeSaveMsgBox.click();
        });
    });
    it('Should verify the details of the URL mapped to a command', function () {
        tuner.clickRefreshRecommendations.then(function () {
            expect(tuner.getUrlSource.getAttribute("src")).toContain("test");
            expect(tuner.getUrlTitle(urlTitle).getText()).toEqual("Automation Test");
            expect(tuner.getUrlDesc(urlTitle).getText()).toEqual("Test using automation");
            expect(tuner.verifyEditIcon(urlTitle).isDisplayed()).toBe(true, "Edit icon is present");
            expect(tuner.verifyDeleteUrl(urlTitle).isDisplayed()).toBe(true, "Delete url icon is present");
        });
    });
    it('Should verify the details for "featured video" swim lane and logout', function () {
        tuner.clickTunerIcon().then(function () {
            expect(tuner.getUrlSource.getAttribute("src")).toContain("test");
            expect(tuner.getUrlTitle(urlTitle).isPresent()).toBe(true);
            expect(tuner.getUrlDesc(urlTitle).isPresent()).toBe(true);
            expect(tuner.getUrlTitle(urlTitle).getText()).toEqual("Automation Test");
            expect(tuner.getUrlDesc(urlTitle).getText()).toEqual("Test using automation");
            exec.logout();
        });
    });
});



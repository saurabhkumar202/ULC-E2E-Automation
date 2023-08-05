/**
 * Created by pankumar on 22-01-2017.
 */

"use strict";

var Header_Footer = require("../../pages/header.footer.page");
var DummyClient = require("../../pages/dummy.client.page");
var Tuner = require("../../pages/tuner.page");
var exec = require("../../utils/specHelper");

var headerFooter = new Header_Footer();
var dummyClient = new DummyClient();
var tuner = new Tuner();
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
var stdTunerAdminUser = "precisionautomation";
var stdTunerAdminPwd = "ptcse1";
var urlToAdd = "http://www.youtube.com";
var urlTitle = "Reorder External URL Automation Test";
var urlDescription = "Reorder external url automation test description";
var urlThumbnail = "../../ulc/path/test.jpg";
var firstExtUrl = urlTitle + Math.random();
var secondExtUrl = urlTitle + Math.random();
var currentOrderExpect = [];
var commandToMap = "newCommand";
var forward = "1";
var backward = "0";


describe("External URL Reorder", function () {

    beforeAll(function () {
        dummyClient.startFreshNetworkCapture();
        exec.launchULCFromDummyClient(dummyClientURL, ulcConnectedModeURL, "thingworx", "6.5", "en");
        dummyClient.switchOn(browser.params.windowHandles.ULC);
        browser.waitForAngular();
        exec.login(stdTunerAdminUser, stdTunerAdminPwd);
        expect(headerFooter.isAt).toBe(true);
        tuner.clickTunerIcon();
        dummyClient.switchWindow(backward);
        dummyClient.runOnNonAngular(function () {
            dummyClient.setCommand(commandToMap);
            dummyClient.switchWindow(forward);
        });
        //Randomize the title for 1st title
        exec.addExternalURL(commandToMap, urlToAdd, firstExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();
        exec.addExternalURL(commandToMap, urlToAdd, secondExtUrl, urlThumbnail, urlDescription);
        browser.waitForAngular();
        //Get the initial order
        tuner.getExternalURLTitles().then(function (initialOrder) {
            currentOrderExpect = initialOrder;
            console.log(currentOrderExpect);
        });

        it('Should go back to the dummy client window to map the command', function () {
            browser.driver.manage().window().maximize();
            tuner.clickTunerIcon();

        });
    });

    it("should move up the first and second external URL added", function () {
        tuner.moveExternalURLByTitle(firstExtUrl, "up").then(function () {
            //Adjust our expectation
            dummyClient.move(currentOrderExpect, firstExtUrl, "up");
            console.log(currentOrderExpect);
        });
        tuner.moveExternalURLByTitle(secondExtUrl, "up").then(function () {
            //Adjust our expectation
            dummyClient.move(currentOrderExpect, secondExtUrl, "up");
            console.log(currentOrderExpect);
        });
        tuner.getExternalURLTitles().then(function (titlesOrder) {
            expect(titlesOrder).toEqual(currentOrderExpect);
        });
    });

    it("should move down the first and second external URL added", function () {
        tuner.moveExternalURLByTitle(secondExtUrl, "down").then(function () {
            //Adjust our expectation
            dummyClient.move(currentOrderExpect, secondExtUrl, "down");
            console.log(currentOrderExpect);
        });
        tuner.moveExternalURLByTitle(firstExtUrl, "down").then(function () {
            //Adjust our expectation
            dummyClient.move(currentOrderExpect, firstExtUrl, "down");
            console.log(currentOrderExpect);
        });
        tuner.getExternalURLTitles().then(function (titlesOrder) {
            expect(titlesOrder).toEqual(currentOrderExpect);
        });
    });

    afterAll(function () {
        //Delete the added external URLs and do the cleanUp
        tuner.deleteExternalURLByTitle(firstExtUrl);
        tuner.clickDeleteUrl().click();
        browser.waitForAngular();
        tuner.deleteExternalURLByTitle(secondExtUrl);
        tuner.clickDeleteUrl().click();
        browser.waitForAngular();
        exec.cleanUp();
    });
});
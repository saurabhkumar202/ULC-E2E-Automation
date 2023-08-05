/**
 * Created by tdhir on 12-01-2017.
 */

'use strict';

var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var Tuner = require('../../pages/tuner.page.js');
var RecommendationsPage = require('../../pages/recommendation.page.js');
var ExternalTuner = require('../../pages/external.url.tuner.page.js');
var exec = require('../../utils/specHelper');
var helper = require('../../utils/helper');
var specHelper = require('../../utils/specHelper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('Edit and delete for external URLs', function () {
    var headerFooter = new Header_Footer();
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var tuner = new Tuner();
    //var helper = new Helper();
    var externalTuner = new ExternalTuner();
    var recommendationPage = new RecommendationsPage();
    //var localeSelected = "en";
    var forward = "1";
    var backward = "0";
    var commandToMap = "mapCommand";
    var urlToAdd = "https://www.youtube.com";
    var urlTitle = "Change Automation Test";
    var urlDescription = "Test with changes automation";
    var urlThumbnail = "../path/test.jpg";

    beforeAll(function () {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);

            //This needs to be changed to CREO
            dummyClient.launchUlc(ulcConnectedModeURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });
        dummyClient.switchWindow(forward);
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf($("#mainHeader")), 15000).then(function () {
            console.log("wait ...is over...");
        });
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
    });
    afterAll(function () {
        exec.cleanUp();
    });
    it('Should launch ULC from the Dummy client and sign in to ULC', function () {

        exec.login(String(loginData.uid), String(loginData.pwd));
    });


    it('Should go back to the dummy client window to map the command', function () {
        browser.driver.manage().window().maximize();
        tuner.clickTunerIcon();
        dummyClient.switchWindow(backward);
        dummyClient.runOnNonAngular(function () {
            dummyClient.setCommand(commandToMap);
            dummyClient.switchWindow(forward);
        });
    });


    it('Should verify the details of the URL mapped to a command', function () {
        specHelper.addExternalURL(commandToMap, urlToAdd, urlTitle, urlThumbnail, urlDescription);
        tuner.tunerSearch(commandToMap);
        expect(tuner.commandTable).toContain(commandToMap);
        tuner.clickRefreshRecommendations.then(function () {
            expect(tuner.getUrlSource.getAttribute("src")).toContain("test");
            expect(tuner.getUrlTitle(urlTitle).getText()).toEqual("Change Automation Test");
            expect(tuner.getUrlDesc(urlTitle).getText()).toEqual("Test with changes automation");
            expect(tuner.verifyEditIcon(urlTitle).isDisplayed()).toBe(true, "Edit icon is present");
            expect(tuner.verifyDeleteUrl(urlTitle).isDisplayed()).toBe(true, "Delete url icon is present");
        });
    });
    it('Should click the edit button and edit the external URL details using tuner window ', function () {
        //specHelper.addExternalURL(commandToMap, urlToAdd, urlTitle, urlThumbnail, urlDescription);
        expect(headerFooter.isAt).toBe(true);
        tuner.verifyEditIcon(urlTitle).click().then(function () {
            expect(externalTuner.closeURLTuner.isDisplayed()).toBe(true, "Close button is missing");
            externalTuner.AddURLDetails(urlToAdd, urlTitle, urlThumbnail, urlDescription);
        });
    });

    it('Should click the delete button and delete the external URL details using tuner window ', function () {
        // specHelper.addExternalURL(commandToMap, urlToAdd, urlTitle, urlThumbnail, urlDescription);
        expect(headerFooter.isAt).toBe(true);
        var counter;
        recommendationPage.countOfAddedExternalURLList(urlTitle).then(function (count) {
            //console.log("New counter is"+count);
            counter = count;
            return counter;

        }).then(function (counter) {
            for (var i = 0; i < counter; i++) {
                tuner.verifyDeleteUrl(urlTitle).click().then(
                    function () {
                        //console.log("Deleting element : "+(i));
                        tuner.clickDeleteUrl().click();
                        //console.log("Deleted element : "+(i));
                        counter--;

                    });
            }
        })

    });
});


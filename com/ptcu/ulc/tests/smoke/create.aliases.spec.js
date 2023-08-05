/**
 * Created by tdhir on 31-01-2017.
 */
"use strict";

var Header_Footer = require("../../pages/header.footer.page");
var DummyClient = require("../../pages/dummy.client.page");
var PlmsTunerPage = require("../../pages/plms.tuner.page");
var ExternalTuner = require('../../pages/external.url.tuner.page.js');
var Tuner = require("../../pages/tuner.page");
var loginData = require("../../resources/loginData.json");
var exec = require("../../utils/specHelper");

var headerFooter = new Header_Footer();
var dummyClient = new DummyClient();
var tuner = new Tuner();
var plmsTuner = new PlmsTunerPage();
var externalTuner = new ExternalTuner();
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
var stdTunerAdminUser = "precisionautomation";
var stdTunerAdminPwd = "ptcse1";
var localeSelected = "en";
var forward = "1";
var backward = "0";
var baseCommand = "aliasCommand";
var urlToAdd = "https://www.google.com";
var urlTitle = "Test For Alias";
var urlDescription = "This is the main command. All aliased command's URL would be saved to this";
var aliasUrlDescription = "This URL was created using aliased command.";
var urlThumbnail = "../path/test.jpg";


describe("Create aliases for mapped commands ::", function () {
        beforeAll(function () {
            exec.launchULCFromDummyClient(dummyClientURL, ulcConnectedModeURL, "thingworx", "6.5", localeSelected);
            expect(headerFooter.isAt).toBe(true);
            //exec.login(customTunerAdminUser, customTunerAdminPwd);
            exec.login(String(loginData.uid), String(loginData.pwd));
        });

        afterAll(function () {
            exec.cleanUp();
        });

        it('Should go back to the dummy client window to send the command ', function () {
            browser.driver.manage().window().maximize();
            tuner.clickTunerIcon();
            dummyClient.switchWindow(backward);
            dummyClient.runOnNonAngular(function () {
                dummyClient.setCommand(baseCommand);
                dummyClient.switchWindow(forward);
            });
        });

        it("Should Add and Verify External URL details for the command sent from dummy client", function () {
            expect(headerFooter.isAt).toBe(true);
            tuner.clickExternalTunerIcon.then(function () {
                expect(externalTuner.closeURLTuner.isDisplayed()).toBe(true, "Close button is missing");
                //expect(externalTuner.aliasMessage.isDisplayed()).toBe(true, "Alias message is not displayed");
                externalTuner.AddURLDetails(urlToAdd, urlTitle, urlThumbnail, urlDescription);
            });
            tuner.clickRefreshRecommendations.then(function () {
                expect(tuner.getUrlSource.getAttribute("src")).toContain("test");
                expect(tuner.getUrlTitle(urlTitle).getText()).toEqual(urlTitle);
                expect(tuner.getUrlDesc(urlTitle).getText()).toEqual(urlDescription);
                expect(tuner.verifyEditIcon(urlTitle).isDisplayed()).toBe(true, "Edit icon is present");
                expect(tuner.verifyDeleteUrl(urlTitle).isDisplayed()).toBe(true, "Delete url icon is present");
            });

        });

        it("Should verify that if alias Command is getting created", function () {
            tuner.clickEditStdRecommendation.then(function(){
                browser.sleep(10000);
                browser.getAllWindowHandles().then(function(handles){
                        plmsTuner.runOnNonAngular(function(){
                        var popUpHandle = handles[2];
                        browser.switchTo().window(popUpHandle).then(function(){
                            //console.log(popUpHandle.title);
                            browser.getCurrentUrl();
                            //console.log(browser.getCurrentUrl());
                            browser.getTitle().then(function (title) {
                                expect(title).toEqual('Learning Connector Custom Recommendations');
                            });
                            //console.log(browser.title());
                            //browser.sleep(5000);
                            plmsTuner.clickCreateMapping.then(function(){
                                browser.sleep(5000);
                                expect(plmsTuner.isModalDisplayed).toBe(true, "Modal windows open for creating Aliases");
                                browser.sleep(5000);
                                plmsTuner.clickCommandToMap.then(function(){
                                    plmsTuner.clickAddButton.then(function(){
                                        browser.sleep(5000);
                                        expect(plmsTuner.verifyCreateAliasMessage).toBe(true, "Created Alias");
                                        console.log("I am here");
                                        browser.switchTo().window(handles[1]);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

        it("Should verify if the recommendations shown in ULC against aliased command is getting displayed", function(){
            tuner.clickRefreshRecommendations.then(function () {
                expect(tuner.verifyCourseMapped()).toBe(true,"Alias mapped course is getting displayed.");
            });
        });

        it("Should verify if the alias command is getting removed", function(){
            tuner.clickEditStdRecommendation.then(function(){
                browser.sleep(10000);
                browser.getAllWindowHandles().then(function(handles){
                    plmsTuner.runOnNonAngular(function(){
                        var popUpHandle = handles[2];
                        browser.switchTo().window(popUpHandle).then(function(){
                          browser.sleep(5000);
                            expect(plmsTuner.verifyButtonText()).toContain("Remove");
                            plmsTuner.clickCreateMapping.then(function(){
                                browser.sleep(5000);
                                expect(plmsTuner.verifyCreateAliasMessage).toBe(true, "Removed Alias");
                                console.log("I am here");
                                browser.switchTo().window(handles[1]);
                            });
                        });
                    });
                });
            });
        });

        it("Should verify if the recommendations shown in ULC against aliased command is getting removed", function(){
            tuner.clickRefreshRecommendations.then(function () {
                expect(tuner.getCountOfCourseMapped).toBe(0);
            });
        });

        it("Should remove external URL for the aliased command", function () {
            tuner.deleteExternalURLByTitle(urlTitle);
            tuner.clickDeleteUrl().click();
            browser.sleep(2000);
        });
});


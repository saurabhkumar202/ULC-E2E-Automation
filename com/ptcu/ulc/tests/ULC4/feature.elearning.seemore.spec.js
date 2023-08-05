/**
 * Created by tdhir on 10-01-2017.
 */

'use strict';

var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var RecommendationsPage = require('../../pages/recommendations.page.js');
var exec = require('../../utils/specHelper');
var recommendationPage = new RecommendationsPage();
var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
var dummyClient = new DummyClient();
var headerFooter = new Header_Footer();
var localeSelected = "en";
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var recommendationTitle = "Featured Learning";
var forward = "1";
var stdTunerAdminUser = "precisionautomation";
var stdTunerAdminPwd = "ptcse1";

describe('Browser featured e-learning See More', function () {

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

    /*afterAll(function () {
        exec.cleanUp();
    });*/

    it('Should click on the see more link and check that the title of the page is correct ', function () {
        browser.driver.manage().window().maximize();
        recommendationPage.seeMoreFeaturedLearning.click();
        expect(recommendationPage.getRecommendationTitle).toBe(recommendationTitle);
    });

    it('Should check that video title is present once the count is more', function () {
        var countResults = recommendationPage.getVideoList;
        expect(recommendationPage.getVideoHeader).toBe(countResults);
    });

    it('Should check that self paced elearning is present once the count is more', function () {
        var countResults = recommendationPage.getElearningList;
        expect(recommendationPage.getElearningHeader).toBe(countResults);
    });
    it('Should check that external URL is present once the count is more', function () {
        var countResults = recommendationPage.getExternalURLList;
        expect(recommendationPage.getExternalURLHeader).toBe(countResults);
    });
});

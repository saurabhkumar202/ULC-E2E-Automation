/**
 * Created by tdhir on 06-01-2017.
 */

'use strict';

var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var RecommendationsPage = require('../../pages/recommendation.page.js');
var Tuner = require('../../pages/tuner.page.js');
var exec = require('../../utils/specHelper');
var helper = require('../../utils/helper');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');

describe('Tests for Recommendations in Connected Mode', function () {
    var headerFooter = new Header_Footer();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var searchResultsPage = new SearchResultsPage();
    var recommendationPage = new RecommendationsPage();
    var tuner = new Tuner();
    //var localeSelected = "en";
    var forward = "1";
    var backward = "0";
    /*var stdTunerAdminUser = "precisionautomation";
    var stdTunerAdminPwd = "ptcse1";*/

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
    });
    it('Should launch ULC from the Dummy client and sign in to ULC', function () {

        expect(headerFooter.isAt).toBe(true);
        exec.login(String(loginData.uid), String(loginData.pwd));
    });

    it('Should display Featured Recommendations header , result thumbnails and View All button', function () {
        expect(recommendationPage.getFeaturedLearningHeader.isDisplayed()).toBe(true);
        //expect(recommendationPage.seeMoreFeaturedLearning.isDisplayed()).toBe(true);
    });

    it('Should validate eLearning & Additional Resources, in Featured Recommendations button', function () {
        //recommendationPage.seeMoreFeaturedLearning.click();
        expect(recommendationPage.countLearning).toBeGreaterThan(0);
        recommendationPage.eLearningTopic;
        expect(recommendationPage.countAdditionalRecourse).toBeGreaterThan(0);
    });

    it('Should display reference documents and KB header , result thumbnails and see more link', function () {
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesCount).toBeGreaterThan(5);
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink.isDisplayed()).toBe(true);
    });

   it('Should display help center header , result thumbnails and see more link', function () {
        expect(searchResultsPage.helpCenterDocumentsHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.helpCenterDocumentsCount).toBeGreaterThan(5);
        expect(searchResultsPage.helpCenterDocumentsSeeMoreLink.isDisplayed()).toBe(true);
    });
});

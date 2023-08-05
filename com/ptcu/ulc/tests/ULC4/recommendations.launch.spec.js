/**
 * Created by tdhir on 06-01-2017.
 */
'use strict';

var Header_Footer = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var RecommendationsPage = require('../../pages/recommendations.page.js');
var Tuner = require('../../pages/tuner.page.js');
var exec = require('../../utils/specHelper');
var helper = require('../../utils/helper');

describe('Tests for External Url Tuner', function () {
    var headerFooter = new Header_Footer();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var ulcConnectedModeURL = browser.params.ulcOptions.ulcConnectedModeURL;
    var dummyClient = new DummyClient();
    var dummyClientURL = browser.params.ulcOptions.dummyClient;
    var searchResultsPage = new SearchResultsPage();
    var recommendationPage = new RecommendationsPage();
    var tuner = new Tuner();
    var localeSelected = "en";
    var forward = "1";
    var backward = "0";
    var stdTunerAdminUser = "precisionautomation";
    var stdTunerAdminPwd = "ptcse1";

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

    it('Should display eLearning header , result thumbnails and see more link', function () {
        expect(recommendationPage.getFeaturedLearningHeader.isDisplayed()).toBe(true);
        expect(recommendationPage.countFeaturedLearning).toBeGreaterThan(5);
        expect(recommendationPage.seeMoreFeaturedLearning.isDisplayed()).toBe(true);
    });

    it('Should display Tutorials header , result thumbnails and see more link', function () {
        expect(searchResultsPage.tutorialsHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.tutorialsCount).toBeGreaterThan(5);
        expect(searchResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
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
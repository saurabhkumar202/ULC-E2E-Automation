/**
 * Created by dghan on 8/17/2016.
 */

'use strict'

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var urlSpecification = require('../../resources/urlSpecification.json');

describe('Tests for Browse APIs', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var browseResultsPage = new BrowseResultsPage();

    var expectHCQueryParams = {
        "docsource": "HC",
        "offset": "0",
        "doccount": "16",
        "keywords": "*",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp",
        // "product": "[a-zA-Z0-9%]+",
        "prodfamily": "thingworx"
        // "release": "[a-zA-Z0-9%]+"
    };

    var expectTAQueryParams = {
        "docsource": "TA",
        "offset": "0",
        "doccount": "16",
        "keywords": "*",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp",
        // "product": "[a-zA-Z0-9%]+",
        "prodfamily": "thingworx"
        // "release": "[a-zA-Z0-9%]+"
    };

    var expectPLMSQueryParams = {
        // "keyword": "\"ThingWorx\"",
        "learningSource": "PrecisionLMS,IoTU",
        "resultSize": "20",
        "resultOffset": "0",
        "language": "en",
        "learningType": "ONLINE_COURSE,Tut,Sem",
        "apiformat": "jsonp"
    };
    var expectLexTutQueryParams = {
        "learningSource": "LearningExchange",
        "productFilter": "ThingWorx##",
        "resultSize": "16",
        "resultOffset": "0",
        "language": "en",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"

    };

    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function () {
        landingPage.startFreshNetworkCapture();
        landingPage.goTo(ulcURL+"/products/"+urlSpecification.urlPath.spotlight.family[1]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0]);
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Verify the HC API call for browsing for Thingworx ', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_HC_BROWSE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectHCQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_HC_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the TA API call for browsing for Thingworx ', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_TA_BROWSE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectTAQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_TA_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the PLMS browse API call for browsing for Thingworx ', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.PLMS_BROWSE, null, function (responses) {
            //console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectPLMSQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.PLMS_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the LEX Tutorial API call for browsing for Thingworx', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });


    //get the counts and check for see more on URL
    it('verify the tutorials count with api results for browsing for Thingworx', function (done) {
        var rsCount = browseResultsPage.tutorialsCount;
        var displayed = browseResultsPage.tutorialsHeader.isDisplayed();
        var seeMoreDisplayed = browseResultsPage.tutorialsSeeMoreLink.isDisplayed();
        browseResultsPage.getAPIDataCount(browser.params.dataType.LEX_TUTORIAL).then(function (counts) {
            expect(rsCount).toBe(counts[0] > 6 ? 6 : counts[0], "tutorials data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of tutorials header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] >= 6), "tutorials api count is not obeying see more link display");
            done();
        });
    });


    it('Verify the help center count-for browsing for Thingworx', function (done) {
        var rsCount = browseResultsPage.helpCenterDocumentsCount;
        var displayed = browseResultsPage.helpCenterDocumentsHeader.isDisplayed();
        var seeMoreDisplayed = browseResultsPage.helpCenterDocumentsSeeMoreLink.isDisplayed();
        browseResultsPage.getAPIDataCount(browser.params.dataType.HELP_CENTER).then(function (counts) {
            expect(rsCount).toBe(counts[0] > 6 ? 6 : counts[0], "article data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of article header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] >= 6), "article api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the reference count-for browsing for Thingworx', function (done) {
        var rsCount = browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesCount;
        var displayed = browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesHeader.isDisplayed();
        var seeMoreDisplayed = browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink.isDisplayed();
        browseResultsPage.getAPIDataCount(browser.params.dataType.ARTICLE).then(function (counts) {
            expect(rsCount).toBe(counts[0] > 6 ? 6 : counts[0], "reference data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of reference header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] >= 6), "reference api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the plms count for browsing for Thingworx', function (done) {
        var rsCount = browseResultsPage.selfPacedELearningCount;
        var displayed = browseResultsPage.selfPacedELearningHeader.isDisplayed();
        var seeMoreDisplayed = browseResultsPage.selfPacedELearningSeeMoreLink.isDisplayed();
        browseResultsPage.getAPIDataCount(browser.params.dataType.PLMS_BROWSE).then(function (counts) {
            expect(rsCount).toBe(counts[0] > 6 ? 6 : counts[0], "plms data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of plms header is not as per api");
            expect(seeMoreDisplayed).toBe(counts[0] >= 6, "plms api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the titles of tutorials with API-for browsing for Thingworx', function (done) {
        browseResultsPage.getAPIResponseTitles(browser.params.dataType.LEX_TUTORIAL).then(function (titles) {
            expect(browseResultsPage.getSwimLaneTitles(browser.params.dataType.LEX_TUTORIAL)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of selfpaced eLearning with API-for browsing for Thingworx', function (done) {
        browseResultsPage.getAPIResponseTitles(browser.params.dataType.PLMS_BROWSE).then(function (titles) {
            expect(browseResultsPage.getSwimLaneTitles(browser.params.dataType.PLMS_SEARCH)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of ref docs and knowledge base with API-for browsing for Thingworx', function (done) {
        browseResultsPage.getAPIResponseTitles(browser.params.dataType.ARTICLE).then(function (titles) {
            expect(browseResultsPage.getSwimLaneTitles(browser.params.dataType.ARTICLE)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of help center with API-for browsing for Thingworx', function (done) {
        browseResultsPage.getAPIResponseTitles(browser.params.dataType.HELP_CENTER).then(function (titles) {
            expect(browseResultsPage.getSwimLaneTitles(browser.params.dataType.HELP_CENTER)).toBeSubsetofArray(titles[0]);
            done();
        });
    });
});

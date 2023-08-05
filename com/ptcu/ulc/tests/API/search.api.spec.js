/**
 * Created by pankumar on 27-06-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var SearchPage = require('../../pages/search.results.page.js');
var exec = require('../../utils/specHelper');

describe('Search "things"', function () {

    var landingPage = new LandingPage();
    var searchPage = new SearchPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;

    var expectHCTACMQueryParams = {
        "docsource": "HC,TA,CM",
        "offset": "0",
        "doccount": "6",
        "keywords": "things",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp"
    };

    var expectPLMSQueryParams = {
        "searchTerm": "things",
        "productFilter": "##",
        "resultSize": "6",
        "resultOffset": "0",
        "language": "en",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"
    };

    var expectLexTutQueryParams = {
        "searchTerm": "things",
        "productFilter": "##",
        "resultSize": "6",
        "resultOffset": "0",
        "language": "en",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"
    };

    var expectLexUseCaseQueryParams = {
        "docsource": "LE",
        "offset": "0",
        "doccount": "6",
        "keywords": "things",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp",
        "technicalarea": "Use Case,Talks"
    };

    beforeAll(function () {

        searchPage.goTo(ulcURL);
        browser.waitForAngular();
        exec.cleanUp();
        searchPage.startFreshNetworkCapture();
        landingPage.enterAndSearchKeyword("things");
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    afterEach(function () {
        searchPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    it('Verify the HC,TA,CM search API call', function () {
        searchPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_SEARCH, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectHCTACMQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_SEARCH)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });

    it('Verify the PLMS search API call', function () {
        searchPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });

    it('Verify the LEX Tutorial API call', function () {
        searchPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(searchPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH)).toBe(true, searchPage.apiLog.join(">>"));
        });
    });


    //get the counts and check for see more on URL
    it('verify the tutorials count with api results', function (done) {
        var rsCount = searchPage.tutorialsCount;
        var displayed = searchPage.tutorialsHeader.isDisplayed();
        var seeMoreDisplayed = searchPage.tutorialsSeeMoreLink.isDisplayed();
        searchPage.getAPIDataCount(browser.params.dataType.LEX_TUTORIAL).then(function (counts) {
            expect(rsCount).toBe(counts[0], "tutorials data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of tutorials header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] === 6), "tutorials api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the help center count', function (done) {
        var rsCount = searchPage.helpCenterDocumentsCount;
        var displayed = searchPage.helpCenterDocumentsHeader.isDisplayed();
        var seeMoreDisplayed = searchPage.helpCenterDocumentsSeeMoreLink.isDisplayed();
        searchPage.getAPIDataCount(browser.params.dataType.HELP_CENTER).then(function (counts) {
            expect(rsCount).toBe(counts[0], "article data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of article header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] === 6), "article api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the reference count', function (done) {
        var rsCount = searchPage.referenceDocumentsAndKnowledgeBaseArticlesCount;
        var displayed = searchPage.referenceDocumentsAndKnowledgeBaseArticlesHeader.isDisplayed();
        var seeMoreDisplayed = searchPage.referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink.isDisplayed();
        searchPage.getAPIDataCount(browser.params.dataType.ARTICLE).then(function (counts) {
            expect(rsCount).toBe(counts[0], "reference data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of reference header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] === 6), "reference api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the community count', function (done) {
        var rsCount = searchPage.communityResultCount;
        var displayed = searchPage.communityHeader.isDisplayed();
        var seeMoreDisplayed = searchPage.communitySeeMoreLink.isDisplayed();
        searchPage.getAPIDataCount(browser.params.dataType.COMMUNITY).then(function (counts) {
            expect(rsCount).toBe(counts[0], "community data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of community header is not as per api");
            expect(seeMoreDisplayed).toBe(Boolean(counts[0] === 6), "community api count is not obeying see more link display");
            done();
        });
    });

    it('Verify the plms count', function (done) {
        var rsCount = searchPage.tutorialsCount;
        var displayed = searchPage.tutorialsHeader.isDisplayed();
        var seeMoreDisplayed = searchPage.tutorialsSeeMoreLink.isDisplayed();
        searchPage.getAPIDataCount(browser.params.dataType.PLMS_SEARCH).then(function (counts) {
            expect(rsCount).toBe(counts[0] > 6 ? 6 : counts[0], "plms data count doesn't match with the api count");
            expect(displayed).toBe(Boolean(counts[0]), "display of plms header is not as per api");
            expect(seeMoreDisplayed).toBe(counts[0] >= 6, "plms api count is not obeying see more link display");
            done();
        });
    });

    xit('Verify the titles of tutorials with API', function (done) {
        searchPage.getAPIResponseTitles(browser.params.dataType.LEX_TUTORIAL).then(function (titles) {
            expect(searchPage.getSwimLaneTitles(browser.params.dataType.LEX_TUTORIAL)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of selfpaced eLearning with API', function (done) {
        searchPage.getAPIResponseTitles(browser.params.dataType.PLMS_SEARCH).then(function (titles) {
            expect(searchPage.getSwimLaneTitles(browser.params.dataType.PLMS_SEARCH)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of ref docs and knowledge base with API', function (done) {
        searchPage.getAPIResponseTitles(browser.params.dataType.ARTICLE).then(function (titles) {
            expect(searchPage.getSwimLaneTitles(browser.params.dataType.ARTICLE)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of help center with API', function (done) {
        searchPage.getAPIResponseTitles(browser.params.dataType.HELP_CENTER).then(function (titles) {
            expect(searchPage.getSwimLaneTitles(browser.params.dataType.HELP_CENTER)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

    it('Verify the titles of community with API', function (done) {
        searchPage.getAPIResponseTitles(browser.params.dataType.COMMUNITY).then(function (titles) {
            expect(searchPage.getSwimLaneTitles(browser.params.dataType.COMMUNITY)).toBeSubsetofArray(titles[0]);
            done();
        });
    });

});
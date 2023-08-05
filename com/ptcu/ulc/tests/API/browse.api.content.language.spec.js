/**
 * Created by dghan on 8/17/2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var urlSpecification = require('../../resources/urlSpecification.json');

describe('Tests for Browse API and Content Language-FR', function () {
    var landingPage = new LandingPage();
    var browseResultsPage = new BrowseResultsPage();
    var expectHCQueryParams = {
        "docsource": "HC",
        "offset": "0",
        "doccount": "16",
        "keywords": "*",
        "lang": "fr",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp"
    };

    var expectTAQueryParams = {
        "docsource": "TA",
        "offset": "0",
        "doccount": "16",
        "keywords": "*",
        "lang": "fr",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp"
    };

    var expectPLMSQueryParams = {
        // "keyword": "Windchill",
        "learningSource": "PrecisionLMS,IoTU",
        "resultSize": "20",
        "resultOffset": "0",
        "language": "fr",
        "learningType": "ONLINE_COURSE,Tut,Sem",
        "apiformat": "jsonp"
    };

    var expectLexTutQueryParams = {
        "learningSource": "LearningExchange",
        "productFilter": "Windchill##",
        "resultSize": "16",
        "resultOffset": "0",
        "language": "fr",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"

    };

    var expectLexUseCaseQueryParams = {
        "docsource": "LE",
        "offset": "0",
        "doccount": "16",
        "keywords": "*",
        "lang": "fr",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp",
        "technicalarea": "Use Case,Talks"
    };

    afterEach(function () {
        landingPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    beforeAll(function () {
       /* landingPage.goTo(ulcURL);
        browser.waitForAngular();
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
        browser.sleep(5000);
        browseResultsPage.contentLanguage.click();
        landingPage.startFreshNetworkCapture();
        browseResultsPage.contentLanguageFrench.click();
        browser.waitForAngular();
*/
        landingPage.startFreshNetworkCapture();
        landingPage.goTo(browser.params.ulcOptions.ulcURL+"/products/"+urlSpecification.urlPath.spotlight.family[0]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.contentLocale[1]+"&"+urlSpecification.urlPath.spotlight.version[0]);
        browser.waitForAngular();
    });

    afterAll(function () {
        // browseResultsPage.contentLanguage.click();
        // browseResultsPage.contentLanguageEnglish.click()
        exec.cleanUp();
    });


    it('Verify the HC API call for browsing for Windchill in French language', function () {
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_HC_BROWSE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectHCQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_HC_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the TA API call for browsing for Windchill in French language', function () {
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_TA_BROWSE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectTAQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_TA_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the PLMS browse API call for browsing for Windchill in French language', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.PLMS_BROWSE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.PLMS_BROWSE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    it('Verify the LEX Tutorial API call for browsing for Windchill in French language', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

    xit('Verify the LEX Use case API call for browsing for Windchill in French language', function () {
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_LEX_USE_CASE, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectLexUseCaseQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_LEX_USE_CASE)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });
});

/**
 * Created by rdewangan on 22-11-2016.
 */
'use strict';

var ThingWorxApplication = require('../../pages/thingworx.application.page.js');
var RecommendationPage = require('../../pages/recommendation.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var exec = require('../../utils/specHelper');

var thingworxApplication = new ThingWorxApplication();
var headerFooter = new HeaderFooter();
var ulcUrl = browser.params.ulcOptions.ulcURL;
var thingworxURL = browser.params.ulcOptions.thingworxURL;
var expectedcommandHome = "Browse All";

describe('launch ULC from thinworx application', function () {

    var recommendationPage = new RecommendationPage();

    var expectLexTutQueryParams = {
        "searchTerm": "Browse All",
        "productFilter": "ThingWorx##",
        "resultSize": "6",
        "resultOffset": "0",
        "language": "en",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"
    };

    var expectPLMSConsolidationQueryParams = {
        "lcContext": "browse/All",
        "apiformat": "jsonp"
    };

    var expectHCTAQueryParams = {
        "docsource": "HC,TA",
        "offset": "0",
        "doccount": "6",
        "keywords": "Browse All",
        "isnew": "n",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp",
        "prodfamily": "thingworx",
        "release": "8.4"
    };

    beforeAll(function(){
        thingworxApplication.runOnNonAngular(function () {
            thingworxApplication.goTo(thingworxURL);
            browser.driver.manage().window().maximize();
            browser.sleep(15000);
            recommendationPage.startFreshNetworkCapture();
            thingworxApplication.openLCFromTWX();
            browser.sleep(5000);
        });
        browser.waitForAngular();

        thingworxApplication.commandTitle().then(function (title) {
            expect(title).toMatch(expectedcommandHome);
        });

    });
    afterAll(function () {
        exec.cleanUp();
    });

    afterEach(function () {
        recommendationPage.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    it('Verify the LEX Tutorial API call', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH, null, function (responses) {
            console.log("LEX Tutorial API call response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
           // expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });

    it('Should verify the PLMS mapping tag API call for ThingWorx', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.PLMS_MAPPING_TAG, "queryString", function (responses) {
            console.log("PLMS mapping tag API call response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
        });
    });

    it('Should verify the PLMS recommendation API call for ThingWorx', function () {
        browser.waitForAngular();
        recommendationPage.getCurrentHARDetails(browser.params.apiType.RECOMMENDATION, null, function (responses) {
            console.log("PLMS recommendation API call response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });
    it('Verify the HC,TA search API call', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_RECOMMENDATION, null, function (responses) {
            console.log("HC,TA search API call response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectHCTAQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });


});
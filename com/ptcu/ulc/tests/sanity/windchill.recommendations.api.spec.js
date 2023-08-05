/**
 * Created by rdewangan on 22-11-2016.
 */
'use strict';

var LandingPage = require('../../pages/landing.page.js');
var WindchillApplication = require('../../pages/windchill.application.page.js');
var exec = require('../../utils/specHelper');
var RecommendationPage = require('../../pages/recommendation.page.js');
var windchillURL = browser.params.ulcOptions.windchillURL;
var landingPage = new LandingPage();
var windchillApplication = new WindchillApplication();
var HeaderFooter = require('../../pages/header.footer.page.js');
var headerFooter = new HeaderFooter();
var expectedcommandHome = "What's New in PTC Windchill 11.0";

describe('launch ULC from windchill application', function () {
    var recommendationPage = new RecommendationPage();
    var expectLexTutQueryParams = {
        "searchTerm": "What's New in PTC Windchill 11.0",
        "productFilter": "Windchill##",
        "resultSize": "6",
        "resultOffset": "0",
        "language": "en",
        "learningType": "Text,Video",
        "contentType": "Tutorials",
        "apiformat": "jsonp"
    };
    var expectPLMSConsolidationQueryParams = {
        // "keyword": "\"ThingWorx\"",
        "lcContext": "ConnectorHome",
        "apiformat": "jsonp"
    };
    var expectHCTAQueryParams = {
        "docsource": "HC,TA",
        "offset": "0",
        "doccount": "6",
        "keywords": "What's New in PTC Windchill 11.0",
        "lang": "en",
        "sourceapp": "Learning Connector",
        "apiformat": "jsonp"
    };
    beforeAll(function(){
        windchillApplication.runOnNonAngular(function () {
            windchillApplication.goTo(windchillURL);
            browser.driver.manage().window().maximize();
            browser.sleep(10000);
            //element(by.css('#ext-comp-1002')).click();
            recommendationPage.startFreshNetworkCapture();
            windchillApplication.openLCFromwindchill();
            browser.sleep(5000);
        });
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        windchillApplication.commandTitle().then(function (title) {
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
           // console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });

    it('Should verify the PLMS mapping tag API call for Windchill ', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.PLMS_MAPPING_TAG, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
        });

    });

    it('Should verify the PLMS recommendation API call for Windchill ', function () {
        browser.waitForAngular();
        recommendationPage.getCurrentHARDetails(browser.params.apiType.RECOMMENDATION, null, function (responses) {
            console.log("Response is --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectPLMSConsolidationQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });
    it('Verify the HC,TA search API call', function () {
        recommendationPage.getCurrentHARDetails(browser.params.apiType.FEDERATED_RECOMMENDATION, null, function (responses) {
            expect(responses.length).toBe(1);
            expect(expectHCTAQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(recommendationPage.verifyAPISpecification(responses, browser.params.apiType.FEDERATED_RECOMMENDATION)).toBe(true, recommendationPage.apiLog.join(">>"));
        });
    });
});
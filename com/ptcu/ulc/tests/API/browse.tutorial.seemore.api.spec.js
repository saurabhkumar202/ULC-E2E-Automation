/**
 * Created by rdewangan on 21-11-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var TutorialNewSeeMore = require('../../pages/tutorial.new.seemore.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var urlSpecification = require('../../resources/urlSpecification.json');

var landingPage = new LandingPage();
var tutorialSeeMorePage = new TutorialNewSeeMore();
var browseResultsPage = new BrowseResultsPage();
var headerFooterPage = new Header_footer_Page();
var productToBrowse = "ThingWorx";
var ulcURL = browser.params.ulcOptions.ulcURL;

var expectLexTutQueryParams = {
    "learningSource": "LearningExchange",
    "productFilter": "ThingWorx##",
    "resultSize": "21",
    "resultOffset": "0",
    "language": "en",
    "learningType": "Text,Video",
    "contentType": "Tutorials",
    "apiformat": "jsonp"
};

var expectLexTutQueryParamsIteration = {
    "learningSource": "LearningExchange",
    "productFilter": "ThingWorx##",
    "resultSize": "21",
    "resultOffset": "20",
    "language": "en",
    "learningType": "Text,Video",
    "contentType": "Tutorials",
    "apiformat": "jsonp"
};

var expectLexTutQueryParamsItertn = {
    "learningSource": "LearningExchange",
    "productFilter": "ThingWorx##",
    "resultSize": "21",
    "resultOffset": "40",
    "language": "en",
    "learningType": "Text,Video",
    "contentType": "Tutorials",
    "apiformat": "jsonp"
};

describe('Browse Tutorial Seemore API', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL+'/products/'+urlSpecification.urlPath.spotlight.family[1]+'/'+urlSpecification.urlPath.spotlight.product[0]+'?'+urlSpecification.urlPath.spotlight.version[0]);
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should display the See more Link in Tutorials lane of Learn section if results exceed 5', function () {
        expect(browseResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
        browseResultsPage.startFreshNetworkCapture();
    });

    it('Should tests APIs for the see more page of tutorials', function () {
        landingPage.goTo(ulcURL+'/seeMore/'+urlSpecification.urlPath.seemore.family[1]+'/'+urlSpecification.urlPath.seemore.product[0]+'?'+urlSpecification.urlPath.seemore.version[0]+'&'+urlSpecification.urlPath.seemore.contentType[0]+'&'+urlSpecification.urlPath.seemore.technicalArea[0]);
        browser.waitForAngular();
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(expectLexTutQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
        browseResultsPage.startFreshNetworkCapture();
        tutorialSeeMorePage.content().clickSeeMore().then(function (flag) {
            if (flag) {
                browser.waitForAngular();
                browseResultsPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC, "queryString", function (responses) {
                    //console.log(" 1 Response is  --" + JSON.stringify(responses[0]));
                    expect(responses.length).toBe(1);
                    expect(expectLexTutQueryParamsIteration).toHavePropertiesIn(responses[0].queryString);
                    expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC)).toBe(true, browseResultsPage.apiLog.join(">>"));
                });
                tutorialSeeMorePage.startFreshNetworkCapture();
                tutorialSeeMorePage.content().clickSeeMore().then(function (flag) {
                    if (flag) {
                        browser.waitForAngular();
                        browseResultsPage.getCurrentHARDetails(browser.params.apiType.UNIFIED_TUTORIAL_TOPIC, "queryString", function (responses) {
                           // console.log(" 2 Response is --" + JSON.stringify(responses[0]));
                            expect(responses.length).toBe(1);
                            expect(expectLexTutQueryParamsItertn).toHavePropertiesIn(responses[0].queryString);
                            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.UNIFIED_TUTORIAL_TOPIC)).toBe(true, browseResultsPage.apiLog.join(">>"));
                        });
                    }

                });
            }
        });
    });
});
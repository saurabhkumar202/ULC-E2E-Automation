/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var ELearningSeeMore = require('../../pages/elearning.new.seemore.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var BrowseResultsPage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var BrowseLXResultsPage = require('../ToBeDeleted/browse.LX.banner.page.js');
var landingPage = new LandingPage();
var eLearningSeeMore = new ELearningSeeMore();
var browseResultsPage = new BrowseResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var urlSpecification = require('../../resources/urlSpecification.json');

var expectCoursesQueryParams = {
    "learningSource": "PrecisionLMS,IoTU",
    "resultSize": "20",
    "resultOffset": "0",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};
var expectCoursesQueryParamsIteration = {
    "learningSource": "PrecisionLMS,IoTU",
    "resultSize": "20",
    "resultOffset": "20",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};
var expectCoursesQueryParamsItertn = {
    "learningSource": "PrecisionLMS,IoTU",
    "resultSize": "20",
    "resultOffset": "40",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};

describe('Browse Courses Seemore API', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL+"/products/"+urlSpecification.urlPath.spotlight.family[2]+"/"+urlSpecification.urlPath.spotlight.product[0]+"?"+urlSpecification.urlPath.spotlight.version[0]);
    });
    afterAll(function () {
        exec.cleanUp();
    });
    it('Should display the See more Link in Courses lane if results exceed 5', function () {
        expect(browseResultsPage.selfPacedELearningSeeMoreLink.isEnabled()).toBe(true);
        browseResultsPage.startFreshNetworkCapture();
    });
    it('Should click the see more link in Courses lane and should show see more page for Courses', function () {
         landingPage.goTo(ulcURL+'/seeMore/'+urlSpecification.urlPath.seemore.family[2]+'/'+urlSpecification.urlPath.seemore.product[0]+'?'+urlSpecification.urlPath.seemore.version[0]+'&'+urlSpecification.urlPath.seemore.contentType[1]);
        browser.waitForAngular();
        eLearningSeeMore.getCurrentHARDetails(browser.params.apiType.PLMS_BROWSE, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(expectCoursesQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(eLearningSeeMore.verifyAPISpecification(responses, browser.params.apiType.PLMS_BROWSE)).toBe(true, eLearningSeeMore.apiLog.join(">>"));
        });
        browseResultsPage.startFreshNetworkCapture();
        eLearningSeeMore.content().clickSeeMore().then(function (flag) {
            if (flag) {
                browser.waitForAngular();
                eLearningSeeMore.getCurrentHARDetails(browser.params.apiType.PLMS_BROWSE, "queryString", function (responses) {
                    expect(responses.length).toBe(1);
                    expect(expectCoursesQueryParamsIteration).toHavePropertiesIn(responses[0].queryString);
                    expect(eLearningSeeMore.verifyAPISpecification(responses, browser.params.apiType.PLMS_BROWSE)).toBe(true, eLearningSeeMore.apiLog.join(">>"));
                });
                eLearningSeeMore.startFreshNetworkCapture();
                eLearningSeeMore.content().clickSeeMore().then(function (flag) {
                    if (flag) {
                        browser.waitForAngular();
                        eLearningSeeMore.getCurrentHARDetails(browser.params.apiType.PLMS_BROWSE, "queryString", function (responses) {
                            expect(responses.length).toBe(1);
                            expect(expectCoursesQueryParamsItertn).toHavePropertiesIn(responses[0].queryString);
                            expect(eLearningSeeMore.verifyAPISpecification(responses, browser.params.apiType.PLMS_BROWSE)).toBe(true, eLearningSeeMore.apiLog.join(">>"));
                        });
                    }

                });
            }
        });
    });

});




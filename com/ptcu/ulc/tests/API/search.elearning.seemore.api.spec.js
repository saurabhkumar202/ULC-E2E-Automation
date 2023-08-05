/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var ELearningSeeMore = require('../../pages/elearning.new.seemore.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var BrowseResultsPage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
var eLearningSeeMore = new ELearningSeeMore();
var browseResultsPage = new BrowseResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var urlSpecification=require('../../resources/urlSpecification')
var seeMoreData = require('../../resources/seeMoreData.json');
var searchKeyword = 'creo';

var expectCoursesQueryParams = {
    "learningSource": "PrecisionLMS,IoTU",
    "searchTerm": "creo",
    "resultSize": "20",
    "resultOffset": "0",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};
var expectCoursesQueryParamsIteration = {
    "learningSource": "PrecisionLMS,IoTU",
    "searchTerm": "creo",
    "resultSize": "20",
    "resultOffset": "20",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};
var expectCoursesQueryParamsItertn = {
    "learningSource": "PrecisionLMS,IoTU",
    "searchTerm": "creo",
    "resultSize": "20",
    "resultOffset": "40",
    "language": "en",
    "learningType": "ONLINE_COURSE,Tut,Sem",
    "apiformat": "jsonp"
};

describe('Search Courses Seemore API', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
    });
    afterAll(function () {
        exec.cleanUp();
    });
    it('Should display the See more Link in Courses lane if search results exceed 5', function () {
        expect(browseResultsPage.selfPacedELearningSeeMoreLink.isDisplayed()).toBe(true);
        browseResultsPage.startFreshNetworkCapture();
    });
    it('Should click the see more link in Courses lane and should show see more page for Courses', function () {
       browseResultsPage.goTo(ulcURL+'/'+'seeMore'+'?'+ 'searchKeyword='+searchKeyword +'&'+urlSpecification.urlPath.seemore.contentType[1])
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




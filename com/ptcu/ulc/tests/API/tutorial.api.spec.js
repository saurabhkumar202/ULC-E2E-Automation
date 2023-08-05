'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var urlSpecification = require('../../resources/urlSpecification.json');

describe('Tests for ADs API on tutorial pages ', function () {
    var landingPage = new LandingPage();
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;

    var expectADSTUTORIALQueryParams = {
        "family": "thingworx",
        "product": "all",
        "language": "en",
        "page": "tutorial",
        "apiformat": "jsonp"
    };

    beforeAll(function () {
        //landingPage.startFreshNetworkCapture();
        console.log(ulcURL+'/seeMore/'+urlSpecification.urlPath.seemore.family[1]+'/'+urlSpecification.urlPath.seemore.product[0]+'?'+urlSpecification.urlPath.seemore.version[0]+'&'+urlSpecification.urlPath.seemore.contentType[0]+'&'+urlSpecification.urlPath.seemore.technicalArea[0]);
        //browser.sleep(5000);
        landingPage.goTo(ulcURL+'/seeMore/'+urlSpecification.urlPath.seemore.family[1]+'/'+urlSpecification.urlPath.seemore.product[0]+'?'+urlSpecification.urlPath.seemore.version[0]+'&'+urlSpecification.urlPath.seemore.contentType[0]+'&'+urlSpecification.urlPath.seemore.technicalArea[0]);
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should click on the first tutorial', function(){
        landingPage.startFreshNetworkCapture();
        browseResultsPage.getFirstTutorial.click();
        browser.waitForAngular();
    });

    it('Should verify the ADs API call for Thingworx Tutorial', function(){
        browseResultsPage.getCurrentHARDetails(browser.params.apiType.ADS_TUTORIAL, null, function (responses) {
            //console.log(" 1 Response is  --" + JSON.stringify(responses[0]));
            expect(responses.length).toBe(1);
            expect(expectADSTUTORIALQueryParams).toHavePropertiesIn(responses[0].queryString);
            expect(browseResultsPage.verifyAPISpecification(responses, browser.params.apiType.ADS_TUTORIAL)).toBe(true, browseResultsPage.apiLog.join(">>"));
        });
    });

});
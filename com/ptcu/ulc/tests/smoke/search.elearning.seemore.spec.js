/**
 * Created by pankumar on 17-11-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var ELearningSeeMore = require('../../pages/search.elearning.seemore.page.js');
var SearchPage = require('../../pages/search.results.page');
var exec = require('../../utils/specHelper');
var TutorialSeemoreNewPage = require('../../pages/tutorial.new.seemore.page.js');
var SearchSeeMoreNewPage = require('../../pages/search.seemore.new.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');
var SeeMorePage = require('../../pages/see.more.page');


var landingPage = new LandingPage();
var searchPage = new SearchPage();
var eLearningSeeMore = new ELearningSeeMore();
var ulcURL = browser.params.ulcOptions.ulcURL;
var tutorialSeeMoreNew = new TutorialSeemoreNewPage();
var searchSeeMoreNewPage = new SearchSeeMoreNewPage();
var seeMorePage = new SeeMorePage();
var searchKeyword = 'creo';


describe('Search eLearning See More', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });


    it('click see more and results should get appended', function () {
        searchPage.selfPacedELearningSeeMoreLink.click();
        browser.waitForAngular();
        var countBeforeResults = eLearningSeeMore.courses().getCount();
        eLearningSeeMore.btnSeeMore().click();
        browser.waitForAngular();
        expect(eLearningSeeMore.courses().getCount()).toBeGreaterThan(countBeforeResults);
    });
    it('search icon and search keyword should be present', function () {
        expect(eLearningSeeMore.title().icon().isDisplayed()).toBe(true);
        expect(eLearningSeeMore.title().keyword).toBe(searchKeyword);
    });
    it('should validate left facet content type & Elearning header', function () {
        expect(tutorialSeeMoreNew.facets().getCheckedContentType().getText()).toBe("Courses");
    });
    it('version facets should be hidden', function () {
        tutorialSeeMoreNew.facets().getVersionDiv().then(function (value) {
            expect(value).toBe('true');
        })
    });
    it('product should not be selected', function () {
        var temp = element(by.id("viewAllButton")).getText();
        expect(temp).toBe('View all')
    });
    it('content language should be english', function () {
        var elem = tutorialSeeMoreNew.facets().getCheckedContentLanguage();
        expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
    })
    it('should show the search keyword in page title', function () {
        expect(searchPage.getPageTitle).toEqual(searchKeyword + " | PTC Learning Connector");
    })
    it('should filter the result and validate the product info from results list', function () {

        browser.sleep(4000);
        seeMorePage.facets().clickCreoFamilyProductVersion().then(function () {

            expect(tutorialSeeMoreNew.facets().getCheckedProductsList()).toBeSubsetofArray(seeMorePage.facets().getProductInformation());
            expect(tutorialSeeMoreNew.facets().getCheckedVersionsList()).toBeSubsetofArray(seeMorePage.facets().getVersionInformation());

        });
    })

});
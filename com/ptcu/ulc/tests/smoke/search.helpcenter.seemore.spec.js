'use strict';

var LandingPage = require('../../pages/landing.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var exec = require('../../utils/specHelper');
var SearchSeeMoreNewPage = require('../../pages/search.seemore.new.page.js');
var SearchElearningSeeMorePage = require('../../pages/search.elearning.seemore.page.js');
var TutorialSeemoreNewPage = require('../../pages/tutorial.new.seemore.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');
var HelpCenterPage = require('../../pages/helpCenter.new.seemore.page.js');


var landingPage = new LandingPage();
var searchResultsPage = new SearchResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var searchSeeMoreNewPage = new SearchSeeMoreNewPage();
var searchElearningSeemorePage = new SearchElearningSeeMorePage();
var tutorialSeeMoreNew = new TutorialSeemoreNewPage();
var helpCenterDocPage = new HelpCenterPage()

var searchKeyword = "rounds";


describe('Search helpcenter document seemore page validation', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
        browser.waitForAngular();

    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('search icon and search keyword should be present', function () {
        searchResultsPage.helpCenterDocumentsSeeMoreLink.click();
        expect(searchElearningSeemorePage.title().icon().isDisplayed()).toBe(true);
        expect(searchElearningSeemorePage.title().keyword).toBe(searchKeyword);
    });

    it('should validate left facet content type & helpcenter documents Header  ', function () {
        expect(tutorialSeeMoreNew.facets().getCheckedContentType().getText()).toBe("Help Center Documents");
    });
    it('version facets should be hidden', function () {
        tutorialSeeMoreNew.facets().getVersionDiv().then(function (value) {
            expect(value).toBe('true');
        })
    });
    it('product should not be selected', function () {
        var temp = element(by.css("#viewAllButton")).getText();
        expect(temp).toBe('View all')
    });
    it('content language should be english', function () {
        var elem = tutorialSeeMoreNew.facets().getCheckedContentLanguage();
        expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
    })
    it('should show the search keyword in page title', function () {
        expect(searchResultsPage.getPageTitle).toEqual(searchKeyword + " | PTC Learning Connector");
    })
    it('click see more and results should get appended', function () {
        var countBeforeResults = helpCenterDocPage.helpcenter().getCount();
        helpCenterDocPage.content().clickSeeMore().then(function (flag) {
            if (flag)
                expect(helpCenterDocPage.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
            else
                expect(helpCenterDocPage.content().getCountSeeMore()).toBe(countBeforeResults);

        });

        browser.waitForAngular();
        expect(helpCenterDocPage.helpcenter().getCount()).toBeGreaterThan(countBeforeResults);
    });
    it('should filter the result and validate the product info from results list', function () {

        browser.sleep(4000);
        tutorialSeeMoreNew.facets().clickCreoFamilyProductVersion().then(function () {

            expect(tutorialSeeMoreNew.facets().getCheckedProductsList()).toBeSubsetofArray(helpCenterDocPage.productInfo());
            expect(['Release: 6.0']).toBeSubsetofArray(helpCenterDocPage.versionInfo());
            //expect(tutorialSeeMoreNew.facets().getCheckedVersionsList()).toBeSubsetofArray(helpCenterDocPage.versionInfo());
        });
    });
});

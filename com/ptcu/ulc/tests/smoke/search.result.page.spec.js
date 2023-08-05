/**
 * Created by dghan on 9/9/2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var exec = require('../../utils/specHelper');

var landingPage = new LandingPage();
var searchResultsPage = new SearchResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var message = 'Try searching for a related term or browsing all of our content.';


describe('Search keyword Thingworx from landing page', function () {

    var searchKeyword = "ThingWorx";
    var searchNoContent = "gdgdsf";

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Search result page should have search box', function () {
        expect(searchResultsPage.headerSearchBar.isDisplayed()).toBe(true);
    });

    it('Search keyword is getting appended in url', function () {
        expect(searchResultsPage.getURL).toContain("searchKeyword=" + searchKeyword);
    });

    it('Should display the name of the browsed product on Header', function () {
        expect(searchResultsPage.pageHeaderTitle.getText()).toEqual(searchKeyword);
    });

    it('Should display the name of the browsed product on Page Title', function () {
        expect(searchResultsPage.getPageTitle).toEqual(searchKeyword + " | PTC Learning Connector");
    });

    it('Should display Tutorials header , result thumbnails and see more link', function () {
        expect(searchResultsPage.tutorialsHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.tutorialsCount).toBeGreaterThan(5);
        expect(searchResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should display eLearning header , result thumbnails and see more link', function () {
        expect(searchResultsPage.selfPacedELearningHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.selfPacedELearningCount).toBeGreaterThan(5);
        expect(searchResultsPage.selfPacedELearningSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should display reference documents and KB header , result thumbnails and see more link', function () {
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesCount).toBeGreaterThan(5);
        expect(searchResultsPage.referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should display help center header , result thumbnails and see more link', function () {
        expect(searchResultsPage.helpCenterDocumentsHeader.isDisplayed()).toBe(true);
        expect(searchResultsPage.helpCenterDocumentsCount).toBeGreaterThan(5);
        expect(searchResultsPage.helpCenterDocumentsSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should display message as "No Content Available"', function () {
        browser.navigate().back();
        landingPage.homeSearchBar.sendKeys(searchNoContent);
        landingPage.homeSearchBarButton.click();
        browser.waitForAngular();
        expect(searchResultsPage.noContentSection).toEqual(message);
    });

});
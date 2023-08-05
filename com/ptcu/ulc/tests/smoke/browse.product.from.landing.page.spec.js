/**
 * Created by bgupta on 23-06-2016.
 */
'use strict';
var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browseResultsPage = new BrowseResultsPage();
var headerFooterPage = new Header_footer_Page();
var ulcURL = browser.params.ulcOptions.ulcURL;
var expectedCommunityMessage = "Join the PTC Community Discussion";
var expectedThingworxCommunityMessage = "Join the PTC Community Discussion";
var expectedPtcCommunity = "https://www.ptcusercommunity.com/welcome";
var thingworxCommunityMessage = "https://community.thingworx.com/welcome";
var seeMoreData = require('../../resources/seeMoreData.json');
var browseContentMenuPage = new BrowseContentMenuPage();

describe('Browse Thingworx product from landing page', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        browseResultsPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
    });
    var productToBrowse = "ThingWorx";
    var experience = 'browse';


    afterAll(function () {
        exec.cleanUp();
    });
    it('Should be able to click on the ThingWorx product from browse drop down', function () {
        element(by.linkText(seeMoreData.productToBrowse[1])).click();
        browser.waitForAngular();
        //landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[1]);
        //landingPage.clickOnGivenProduct(productToBrowse);
    });

    it('Should display Browse Content button on browse results Page', function () {
        expect(browseResultsPage.browseContentButton.isDisplayed()).toBe(true);
    });

    it('Should display Content Language button on browse results Page', function () {
        expect(browseResultsPage.contentLanguage.isDisplayed()).toBe(true);
    });

    /*it('Should show community link as per product browsed', function () {
        expect(browseResultsPage.getCommunityTextMessage).toBe(expectedThingworxCommunityMessage)
    });*/

    it('Should display the name of the browsed product on Header', function () {
        expect(browseResultsPage.getProductName.getText()).toContain(productToBrowse);
    });

    it('Should display the name of the browsed product on Page Title', function () {
        expect(browseResultsPage.getPageTitle).toEqual('All ' + productToBrowse + " | PTC Learning Connector");
    });
    it('Should display the Learn Section and Learn Heading and Tutorials and Self Paced eLearning', function () {
        // expect(browseResultsPage.learnSection.isDisplayed()).toBe(true);
        // expect(browseResultsPage.learnSectionHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.tutorialsSection.isDisplayed()).toBe(true);
        expect(browseResultsPage.tutorialsHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.tutorialsCount).toBeGreaterThan(5);
        expect(browseResultsPage.selfPacedELearningSection.isDisplayed()).toBe(true);
        expect(browseResultsPage.selfPacedELearningHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.selfPacedELearningCount).toBeGreaterThan(5);
    });

    it('Should display the Support Section,Header, Reference doc , KB HC results', function () {
        // expect(browseResultsPage.supportHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesSection.isDisplayed()).toBe(true);
        expect(browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesCount).toBeGreaterThan(5);
        expect(browseResultsPage.helpCenterDocumentsSection.isDisplayed()).toBe(true);
        expect(browseResultsPage.helpCenterDocumentsHeader.isDisplayed()).toBe(true);
        expect(browseResultsPage.helpCenterDocumentsCount).toBeGreaterThan(5);
    });


    it('Should display the See more Link in Tutorials & eLearning lanes of Learn section if results exceed 5', function () {
        expect(browseResultsPage.tutorialsCount).toBe(6);
        expect(browseResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
        expect(browseResultsPage.selfPacedELearningCount).toBe(6);
        expect(browseResultsPage.selfPacedELearningSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should display the See more Link in KB & HC lanes of Support section if results exceed 5', function () {
        expect(browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesCount).toBe(6);
        expect(browseResultsPage.referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink.isDisplayed()).toBe(true);
        expect(browseResultsPage.helpCenterDocumentsCount).toBe(6);
        expect(browseResultsPage.helpCenterDocumentsSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should show ThingWorx community message when ThingWorx is browsed from Landing Page', function () {
        expect(browseResultsPage.getCommunityTextMessage).toBe(expectedThingworxCommunityMessage);
        //expect(browseResultsPage.joinDiscussionButton.isDisplayed()).toBe(true);
        expect(browseResultsPage.getJoinDiscussionLink).toBe(thingworxCommunityMessage);

    });

    it('Should show PTC community message when Creo is browsed from Landing Page', function () {
        var productToBrowse = "creo";
        headerFooterPage.lnkHome.click();
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[1], seeMoreData.familyToBrowse[1]);
        expect(browseResultsPage.getCommunityTextMessage).toBe(expectedCommunityMessage);
        //expect(browseResultsPage.joinDiscussionButton.isDisplayed()).toBe(true);
        expect(browseResultsPage.getJoinDiscussionLink).toBe(expectedPtcCommunity);
    });

});



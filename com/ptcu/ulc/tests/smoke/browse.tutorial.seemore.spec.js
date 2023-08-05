/**
 * Created by rdewangan on 25-10-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var TutorialSeeMorePage = require('../../pages/tutorial.seemore.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var exec = require('../../utils/specHelper');

var landingPage = new LandingPage();
var tutorialSeeMorePage = new TutorialSeeMorePage();
var browseResultsPage = new BrowseResultsPage();
var headerFooterPage = new Header_footer_Page();
var productToBrowse = "ThingWorx";
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');
var browseContentMenuPage = new BrowseContentMenuPage();

describe('Browse Content from product drop down for tutorials', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.driver.manage().window().maximize();
        browser.waitForAngular();
        headerFooterPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should be able to click on the ThingWorx product from browse drop down', function () {
        element(by.linkText(seeMoreData.productToBrowse[1])).click();
        browser.waitForAngular();
    });


    it('Should display the See more Link in Tutorials lane of Learn section if results exceed 5', function () {
        expect(browseResultsPage.tutorialsCount).toBe(6);
        expect(browseResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
    });


    it('Should click the see more link in tutorial lane and should show see more page for tutorials', function () {

        browseResultsPage.tutorialsSeeMoreLink.click();
        browser.waitForAngular();
        expect(tutorialSeeMorePage.getProductName.getText()).toMatch(productToBrowse);
        expect(browseResultsPage.tutorialsCountonSeeMorePage).toBe(20);
        tutorialSeeMorePage.clickSeeMorePageBtn();
        browser.waitForAngular();
        expect(browseResultsPage.tutorialsCountonSeeMorePage).toBe(40);
        tutorialSeeMorePage.clickSeeMorePageBtn();
        browser.waitForAngular();
        expect(browseResultsPage.tutorialsCountonSeeMorePage).toBe(60);
    });


});

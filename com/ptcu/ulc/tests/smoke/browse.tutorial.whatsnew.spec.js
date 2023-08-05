/**
 * Created by rdewangan on 27-04-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var TutorialSeeMorePage = require('../../pages/tutorial.seemore.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var TutorialsResultsDetailsPage = require('../../pages/tutorial.results.details.page.js');
var exec = require('../../utils/specHelper');

var landingPage = new LandingPage();
var tutorialSeeMorePage = new TutorialSeeMorePage();
var browseResultsPage = new BrowseResultsPage();
var headerFooterPage = new Header_footer_Page();
var tutorialsResultsDetailsPage = new TutorialsResultsDetailsPage();
var productToBrowse = "Creo Parametric";
var ulcURL = browser.params.ulcOptions.ulcURL;
var resultTitle;
var seeMoreData = require('../../resources/seeMoreData.json');


describe('Browse Content from product drop down for tutorials whatsnew', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.driver.manage().window().maximize();
        browser.waitForAngular();
        headerFooterPage.browseContentButton.click();
        browser.waitForAngular();
        browser.sleep(3000);
        element(by.linkText(productToBrowse)).click();
        browser.waitForAngular();

    });

    afterAll(function () {
        exec.cleanUp();
    });


    it('Should display the See more Link in Tutorials lane of Learn section if results exceed 5', function () {
        expect(browseResultsPage.tutorialsCount).toBe(6);
        expect(browseResultsPage.tutorialsSeeMoreLink.isDisplayed()).toBe(true);
    });

    it('Should click the see more link in tutorial lane and should show see more page for tutorials', function () {
        browseResultsPage.tutorialsSeeMoreLink.click();
        browser.waitForAngular();
        expect(tutorialSeeMorePage.getProductName.getText()).toMatch(seeMoreData.productToBrowse[0]);
        browser.waitForAngular();
    });

    it('Should click on whats new see more tutorials and navigate to tutorials details page', function () {
        //expect(tutorialSeeMorePage.contentTypeRadio.isSelected()).toBe(true);
        //Content type radio button does not have attribute for selection of radio
        //tutorialSeeMorePage.clickShowAllProduct();
        //tutorialSeeMorePage.clickOnCreoFamily();
        //tutorialSeeMorePage.clickOnCreoParametric

        browser.waitForAngular();

        expect(tutorialSeeMorePage.getWhatsNewCheckBox.isDisplayed()).toBe(true);

        browser.waitForAngular();
        tutorialSeeMorePage.clickWhatsNewCheckBox();
        browser.waitForAngular();
        tutorialSeeMorePage.getTutorialTitle.getText().then(function (title) {
            resultTitle = title;

        });
        tutorialSeeMorePage.getFirstTutorial.click();
        tutorialsResultsDetailsPage.getFirstTutorialResultTitle.then(function (detailsTitle) {
            expect(detailsTitle).toEqual(resultTitle);
        });

        expect(tutorialsResultsDetailsPage.isRelatedArticlesDisplayed).toBe(true);

    });
});

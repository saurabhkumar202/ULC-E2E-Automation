/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var TutorialNewSeeMore = require('../../pages/tutorial.new.seemore.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
var headerFooterPage = new Header_footer_Page();
var tutorialSeeMore = new TutorialNewSeeMore();
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');
var prodIndx = 0;
var browseContentMenuPage = new BrowseContentMenuPage();

describe('Browse Tutorial See More For a Product/Family ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);

    });

    afterAll(function () {
        exec.cleanUp();
    });

    describe('Using All Versions on Spotlight Page', function () {
        beforeAll(function () {
            browser.waitForAngular();
            browsePage.browseContentButton.click();
            browser.waitForAngular();
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
            element(by.linkText(seeMoreData.familyToBrowse[0])).click();
            // landingPage.clickOnGivenProduct(seeMoreData.familyToBrowse[0]);
            browser.waitForAngular();
            browsePage.tutorialsSeeMoreLink.click();
        });
        it('Browse keyword should be present on grey ribbon', function () {
            expect(tutorialSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Product should be same as from spotlight page', function () {
            expect(tutorialSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Default no version should be selected on see more page', function () {
            expect(tutorialSeeMore.facets().getCheckedVersionsList().count()).toBe(0);
        });

        it('Default content type should be same as from spotlight page.This case it should be Tutorial', function () {
            var elem = tutorialSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe('Tutorials');
        });

        it('click see more and results should get appended', function () {
            var countBeforeResults = tutorialSeeMore.content().getCountSeeMore();
            tutorialSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(tutorialSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(tutorialSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);
            });
        });
        it('All tutorials versions should be present in facets', function () {
            tutorialSeeMore.facets().viewAllVersions();
            expect(tutorialSeeMore.TutContent().getTutorialVersions()).toBeSubsetofArray(tutorialSeeMore.facets().getVersions());

        });

        it('Clear out the product list and verify the grey ribbon', function () {
            tutorialSeeMore.facets().clearCurrentProduct();
            expect(tutorialSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });


        it('Again Tutorials should get filtered out after a product is selected in facets', function () {
            tutorialSeeMore.facets().clickRandomFamily();
        });


        it('Again Tutorials should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            tutorialSeeMore.facets().viewAllVersions();
            browser.waitForAngular();
            let temp;
            tutorialSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val=='true');
                if (!temp) {
                    tutorialSeeMore.facets().clickRandomVersion();
                    expect(tutorialSeeMore.TutContent().getTutorialVersions()).toBeSubsetofArray(tutorialSeeMore.facets().getCheckedVersionsList().getText());
                }
            });

        });

        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = tutorialSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);

        });

    });

    describe('Using Latest Version on spotlight page', function () {
        beforeAll(function () {
            browser.waitForAngular();
            browsePage.browseContentButton.click();
            //tutorialSeeMore.browseContentButton.click();
            browsePage.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[0]);
            browser.waitForAngular();
            browsePage.tutorialsSeeMoreLink.isDisplayed().then(function (result) {
                if (result) {
                    browsePage.tutorialsSeeMoreLink.click();
                }
                else {
                    browsePage.browseContentButton.click();
                    browser.waitForAngular();
                    browsePage.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[2]);
                    browser.waitForAngular();
                    browsePage.tutorialsSeeMoreLink.click();
                    prodIndx = 2;
                }
            });
            //browsePage.tutorialsSeeMoreLink.click();
            console.log("I am in browse tutorial page");
            console.log("Product Index" + prodIndx);
        });

        it('Browse keyword should be present on grey ribbon', function () {
            expect(tutorialSeeMore.grayRibbonInfo()).toBe(seeMoreData.productToBrowse[prodIndx]);
        });
        it('Product should be same as from spotlight page', function () {
            expect(tutorialSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.productToBrowse[prodIndx]);
        });
        it('Default one version should be selected on see more page', function () {
            tutorialSeeMore.facets().viewAllVersions();
            expect(tutorialSeeMore.facets().getCheckedVersionsList().count()).toBe(1);
        });
        it('Default content type should be same as from spotlight page.This case it should be Tutorials', function () {
            var elem = tutorialSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe(seeMoreData.contentType[0]);
        });
        it('click see more and results should get appended', function () {
            var countBeforeResults = tutorialSeeMore.content().getCountSeeMore();
            tutorialSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(tutorialSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(tutorialSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);

            });
        });
        it('All tutorials versions should be present in facets', function () {
            tutorialSeeMore.facets().viewAllVersions();
            expect(tutorialSeeMore.content().getVersionsList()).toBeSubsetofArray(tutorialSeeMore.facets().getVersions());
        });
        it('Clear out the product list and verify the grey ribbon', function () {
            tutorialSeeMore.facets().clearCurrentProduct();
            expect(tutorialSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });
        it('Again tutorials should get filtered out after a product is selected in facets', function () {
            tutorialSeeMore.facets().clickRandomFamily();
        });
        it('Again tutorials should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            tutorialSeeMore.facets().viewAllVersions();
            browser.waitForAngular();
            let temp;
            tutorialSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val=='true');
                if (!temp) {
                    tutorialSeeMore.facets().clickRandomVersion();
                    expect(tutorialSeeMore.TutContent().getTutorialVersions()).toBeSubsetofArray(tutorialSeeMore.facets().getCheckedVersionsList().getText());
                }
            });
        });
        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = tutorialSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
        });
    });

});

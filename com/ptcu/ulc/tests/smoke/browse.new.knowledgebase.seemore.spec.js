/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var KBNewSeeMore = require('../../pages/knowledgeBase.new.seemore.page');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
//var Header_footer_Page = require('../../pages/header.footer.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
//var headerFooterPage = new Header_footer_Page();
var knowledgeBaseSeeMore = new KBNewSeeMore();
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');
var browseContentMenuPage = new BrowseContentMenuPage();

describe('Browse KnowledgeBase/Article See More For a Product/Family ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        //browsePage.browseContentButton.click();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    describe('Using All Versions on Spotlight Page', function () {
        beforeAll(function () {
            browsePage.browseContentButton.click();
            browser.waitForAngular();
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
            element(by.linkText(seeMoreData.familyToBrowse[0])).click();
            //landingPage.clickOnGivenProduct(seeMoreData.familyToBrowse[0]);
            browser.waitForAngular();
            browser.sleep(8000);
            // document.getElementById('loadMoreTutorials').click();

        });
        it('Browse keyword should be present on grey ribbon', function () {
            browsePage.knowledgebaseSeeMoreLink.click();
            expect(knowledgeBaseSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Product should be same as from spotlight page', function () {
            expect(knowledgeBaseSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Default no version should be selected on see more page', function () {
            expect(knowledgeBaseSeeMore.facets().getCheckedVersionsList().count()).toBe(0);
        });

        it('Default content type should be same as from spotlight page.This case it should be Tutorial', function () {
            var elem = knowledgeBaseSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe('Knowledge Base Articles');
        });

        it('click see more and results should get appended', function () {
            var countBeforeResults = knowledgeBaseSeeMore.content().getCountSeeMore();
            knowledgeBaseSeeMore.btnSeeMore().click();
            browser.waitForAngular();
            expect(knowledgeBaseSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
        });

        it('All courses versions should be present in facets', function () {
            knowledgeBaseSeeMore.facets().viewAllVersions();
            expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getVersions());
        });

        it('Clear out the product list', function () {
            knowledgeBaseSeeMore.facets().clearCurrentProduct();
        });


        it('Again Tutorials should get filtered out after a product is selected in facets', function () {
            knowledgeBaseSeeMore.facets().clickRandomFamily();
        });


        it('Again Courses should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            let temp;
            knowledgeBaseSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val=='true');
                if (!temp) {
                    knowledgeBaseSeeMore.facets().clickRandomVersion();
                    expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getCheckedVersionsList().getText());
                }

            });
        });

        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = knowledgeBaseSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);

        });

        it('Again All courses versions should be present in facets', function () {
            knowledgeBaseSeeMore.facets().viewAllVersions();
            expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getVersions());
        });

    });


    describe('Using Latest Version on spotlight page', function () {
        beforeAll(function () {

            browsePage.browseContentButton.click();
            browser.waitForAngular();
            browsePage.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[0]);
            browser.waitForAngular();
            browser.sleep(10000);
            browsePage.knowledgebaseSeeMoreLink.click();
        });

        it('Browse keyword should be present on grey ribbon', function () {
            expect(knowledgeBaseSeeMore.grayRibbonInfo()).toBe(seeMoreData.productToBrowse[0]);
        });
        it('Product should be same as from spotlight page', function () {
            expect(knowledgeBaseSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.productToBrowse[0]);
        });
        it('Default one version should be selected on see more page', function () {
            expect(knowledgeBaseSeeMore.facets().getCheckedVersionsList().count()).toBe(1);
        });
        it('Default content type should be same as from spotlight page.This case it should be Elearning', function () {
            var elem = knowledgeBaseSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe('Knowledge Base Articles');
        });
        it('click see more and results should get appended', function () {
            var countBeforeResults = knowledgeBaseSeeMore.content().getCountSeeMore();
            knowledgeBaseSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(knowledgeBaseSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(knowledgeBaseSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);
            });

        });
        it('All courses versions should be present in facets', function () {
            knowledgeBaseSeeMore.facets().viewAllVersions();
            expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getVersions());
        });
        it('Clear out the product list', function () {
            knowledgeBaseSeeMore.facets().clearCurrentProduct();
            expect(knowledgeBaseSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });
        it('Again Courses should get filtered out after a product is selected in facets', function () {
            knowledgeBaseSeeMore.facets().clickRandomFamily();
        });
        it('Again Courses should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            let temp;
            knowledgeBaseSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val=='true');
                if (!temp) {
                    knowledgeBaseSeeMore.facets().clickRandomVersion();
                    expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getCheckedVersionsList().getText());
                }
            });
        });
        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = knowledgeBaseSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
        });
        it('Again All courses versions should be present in facets', function () {
            knowledgeBaseSeeMore.facets().viewAllVersions();
            expect(knowledgeBaseSeeMore.articles().getVersionsList()).toBeSubsetofArray(knowledgeBaseSeeMore.facets().getVersions());
        });
    });
});

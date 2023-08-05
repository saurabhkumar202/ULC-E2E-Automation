/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var ELearningSeeMore = require('../../pages/elearning.new.seemore.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
var eLearningSeeMore = new ELearningSeeMore();
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Browse eLearning See More For a Product/Family ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    describe('Using All Versions on Spotlight Page', function () {
        beforeAll(function () {
            landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
            browser.waitForAngular();
            browser.executeScript('window.scrollTo(0,0);').then(function () {
                browsePage.selfPacedELearningSeeMoreLink.click();
            })
        });

        it('Browse keyword should be present on grey ribbon', function () {
            expect(eLearningSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[0]);
        });
        it('Product should be same as from spotlight page', function () {
            expect(eLearningSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.seeMorePageFamily[0]);
        });
        it('Default no version should be selected on see more page', function () {
            eLearningSeeMore.facets().viewAllVersions();
            expect(eLearningSeeMore.facets().getCheckedVersionsList().count()).toBe(0);
        });
        it('Default content type should be same as from spotlight page.This case it should be Elearning', function () {
            var elem = eLearningSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe(seeMoreData.contentType[1]);
        });
        it('click see more and results should get appended', function () {
            var countBeforeResults = eLearningSeeMore.content().getCountSeeMore();
            eLearningSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(eLearningSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(eLearningSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);
            });
        });

        it('All courses versions should be present in facets', function () {
            eLearningSeeMore.facets().viewAllVersions();
            expect(eLearningSeeMore.content().getVersionsList()).toBeSubsetofArray(eLearningSeeMore.facets().getVersions());
        });

        it('Clear out the product list and verify the grey ribbon', function () {
            eLearningSeeMore.facets().clearCurrentProduct();
            expect(eLearningSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });

        it('Again Courses should get filtered out after a product is selected in facets', function () {
            eLearningSeeMore.facets().clickRandomFamily();
        });
        it('Again Courses should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            eLearningSeeMore.facets().viewAllVersions();
            let temp;
            eLearningSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val == 'true');
                if (!temp) {
                    eLearningSeeMore.facets().clickRandomVersion();
                    expect(eLearningSeeMore.content().getVersionsList()).toBeSubsetofArray(eLearningSeeMore.facets().getCheckedVersionsList());
                }
            });
        });
        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = eLearningSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
        });

    });
    describe('Using Latest Version on spotlight page', function () {
        beforeAll(function () {

            eLearningSeeMore.browseContentButton.click();
            eLearningSeeMore.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[3]);
            browsePage.selfPacedELearningSeeMoreLink.click();
        });

        it('Browse keyword should be present on grey ribbon', function () {
            expect(eLearningSeeMore.grayRibbonInfo()).toBe(seeMoreData.productToBrowse[3]);
        });

        it('Product should be same as from spotlight page', function () {
            expect(eLearningSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.productToBrowse[3]);
        });
        it('Default one version should be selected on see more page', function () {
            eLearningSeeMore.facets().viewAllVersions();
            expect(eLearningSeeMore.facets().getCheckedVersionsList().count()).toBe(1);
        });
        it('Default content type should be same as from spotlight page.This case it should be Elearning', function () {
            var elem = eLearningSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe(seeMoreData.contentType[1]);
        });
        it('click see more and results should get appended', function () {
            var countBeforeResults = eLearningSeeMore.content().getCountSeeMore();
            eLearningSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(eLearningSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(eLearningSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);

            });


        });
        it('All courses versions should be present in facets', function () {
            eLearningSeeMore.facets().viewAllVersions();
            expect(eLearningSeeMore.content().getVersionsList()).toBeSubsetofArray(eLearningSeeMore.facets().getCheckedVersionsList());
        });
        it('Clear out the product list and verify the grey ribbon', function () {
            eLearningSeeMore.facets().clearCurrentProduct();
            expect(eLearningSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });
        it('Again Courses should get filtered out after a product is selected in facets', function () {
            eLearningSeeMore.facets().clickRandomFamily();
        });
        it('Again Courses should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            eLearningSeeMore.facets().viewAllVersions();
            let temp;
            eLearningSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val == 'true');
                if (!temp) {
                    eLearningSeeMore.facets().clickRandomVersion();
                    expect(eLearningSeeMore.content().getVersionsList()).toBeSubsetofArray(eLearningSeeMore.facets().getCheckedVersionsList());
                }
            });
        });
        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = eLearningSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
        });

    });


});

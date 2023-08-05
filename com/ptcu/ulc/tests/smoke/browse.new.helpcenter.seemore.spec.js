/**
 * Created by saukumar on 28-07-2017.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var HCNewSeeMore = require('../../pages/helpCenter.new.seemore.page');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var BrowsePage = require('../../pages/browse.results.page');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
var headerFooterPage = new Header_footer_Page();
var helpCenterSeeMore = new HCNewSeeMore();
var ulcURL = browser.params.ulcOptions.ulcURL;
var seeMoreData = require('../../resources/seeMoreData.json');
var prodIndx = 0;

describe('Browse HelpCenter See More For a Product/Family ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
        browser.waitForAngular();
    });


    describe('Using All Versions on Spotlight Page', function () {
        beforeAll(function () {
            browsePage.browseContentButton.click();
            browser.waitForAngular();
            browser.sleep(3000);
            element(by.linkText(seeMoreData.familyToBrowse[0])).click();
            //browsePage.clickOnGivenProductOnBrowse(seeMoreData.familyToBrowse[0]);
            //landingPage.clickOnGivenProduct(seeMoreData.familyToBrowse[0]);
            browser.waitForAngular();

        });
        it('Browse keyword should be present on grey ribbon', function () {
            //browsePage.helpcenterSeeMoreLink.click();
            browsePage.helpcenterSeeMoreLink.click();
            expect(helpCenterSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Product should be same as from spotlight page', function () {
            expect(helpCenterSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.seeMorePageFamily[0]);
        });

        it('Default no version should be selected on see more page', function () {
            expect(helpCenterSeeMore.facets().getCheckedVersionsList().count()).toBe(0);
        });

        it('Default content type should be same as from spotlight page.This case it should be Help Center Documents', function () {
            var elem = helpCenterSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe('Help Center Documents');
        });

        it('click see more and results should get appended', function () {
            var countBeforeResults = helpCenterSeeMore.content().getCountSeeMore();
            helpCenterSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(helpCenterSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(helpCenterSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);
            });
        });

        it('All HC documents versions should be present in facets', function () {
            helpCenterSeeMore.facets().viewAllVersions();
            expect(helpCenterSeeMore.helpcenter().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getVersions());
        });

        it('Clear out the product list and verify the grey ribbon', function () {
            helpCenterSeeMore.facets().clearCurrentProduct();
            expect(helpCenterSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);
        });

        it('Again HC documents should get filtered out after a product is selected in facets', function () {
            helpCenterSeeMore.facets().clickRandomFamily();
            helpCenterSeeMore.facets().viewAllVersions();
            browser.waitForAngular();
            expect(helpCenterSeeMore.helpcenter().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getVersions());
        });

        it('Again HC documents should get filtered out after a version is selected in facets', function () {
            browser.waitForAngular();
            let temp;
            helpCenterSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val == 'true');
                if (!temp) {
                    helpCenterSeeMore.facets().clickRandomVersion();
                    expect(helpCenterSeeMore.content().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getCheckedVersionsList());
                }
            });
        });

        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = helpCenterSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
            browser.waitForAngular();

        });

    });


    describe('Using Latest Version on spotlight page', function () {
        beforeAll(function () {
            browsePage.browseContentButton.click();
            browser.waitForAngular();
            browser.sleep(3000);
            //element(by.linkText(seeMoreData.productToBrowse[0])).click();
            browsePage.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[0]);
            browser.waitForAngular();
            browsePage.helpcenterSeeMoreLink.isDisplayed().then(function (result) {
                if (result) {
                    browsePage.helpcenterSeeMoreLink.click();
                }
                else {
                    browsePage.browseContentButton.click();
                    browser.waitForAngular();
                    browsePage.clickOnGivenProductOnBrowse(seeMoreData.productToBrowse[2]);
                    browser.waitForAngular();
                    browsePage.helpcenterSeeMoreLink.click();
                    prodIndx = 2;
                }

            });
            console.log("Product Index" + prodIndx);
            //browser.waitForAngular();
        });

        it('Browse keyword should be present on grey ribbon', function () {
            expect(helpCenterSeeMore.grayRibbonInfo()).toBe(seeMoreData.productToBrowse[prodIndx]);
        });


        it('Product should be same as from spotlight page', function () {
            expect(helpCenterSeeMore.facets().getCurrentProduct().getText()).toBe(seeMoreData.productToBrowse[prodIndx]);
        });


        it('Default one version should be selected on see more page', function () {
            helpCenterSeeMore.facets().viewAllVersions();
            expect(helpCenterSeeMore.facets().getCheckedVersionsList().count()).toBe(1);
        });


        it('Default content type should be same as from spotlight page.This case it should be Help Center Documents', function () {
            var elem = helpCenterSeeMore.facets().getCheckedContentType();
            expect(elem.getText()).toBe(seeMoreData.contentType[3]);
        });

        it('click see more and results should get appended', function () {
            var countBeforeResults = helpCenterSeeMore.content().getCountSeeMore();
            helpCenterSeeMore.content().clickSeeMore().then(function (flag) {
                if (flag)
                    expect(helpCenterSeeMore.content().getCountSeeMore()).toBeGreaterThan(countBeforeResults);
                else
                    expect(helpCenterSeeMore.content().getCountSeeMore()).toBe(countBeforeResults);
            });
        });

        it('All HC documents versions should be present in facets', function () {
            helpCenterSeeMore.facets().viewAllVersions();
            expect(helpCenterSeeMore.helpcenter().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getVersions());

        });

        it('Clear out the product list', function () {
            helpCenterSeeMore.facets().clearCurrentProduct();
            browser.waitForAngular();
            expect(helpCenterSeeMore.grayRibbonInfo()).toBe(seeMoreData.seeMorePageFamily[2]);

        });
        it('Again HC documents should get filtered out after a product is selected in facets', function () {
            helpCenterSeeMore.facets().clickRandomFamily();
            helpCenterSeeMore.facets().viewAllVersions();
            browser.waitForAngular();
            expect(helpCenterSeeMore.helpcenter().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getVersions());
        });
        it('Again HC documents should get filtered out after a version is selected in facets', function () {
            let temp;
            helpCenterSeeMore.facets().getVersionDiv().then(function (val) {
                temp = (val == 'true');
                if (!temp) {
                    helpCenterSeeMore.facets().clickRandomVersion();
                    expect(helpCenterSeeMore.content().getVersionsList()).toBeSubsetofArray(helpCenterSeeMore.facets().getCheckedVersionsList());
                }
            });
        });
        it('Again Default content language should be same as from spotlight page.This case it should be English', function () {
            var elem = helpCenterSeeMore.facets().getCheckedContentLanguage();
            expect(elem.getText()).toBe(seeMoreData.contentLanguage[0]);
        });
    });

});

/**
 * Created by tdhir on 17-11-2016.
 */

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var SupportLoginPage = require('../../pages/support.login.page.js');
var SupportLandingPage = require('../../pages/support.landing.page.js');

var landingPage = new LandingPage();
var headerFooterPage = new Header_footer_Page();
var searchResultsPage = new SearchResultsPage();
var supportLoginPage = new SupportLoginPage();
var supportLandingPage = new SupportLandingPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
var supportWindow = browser.params.windowHandles.SUPPORT;
var ulcWindow = browser.params.windowHandles.ULC;
var contentURL = [];

describe('This is for testing the see more link of the support for the search functionality', function () {

    var searchKeyword = "ThingWorx";

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
    });
    it('Should display the content type as reference document and article after clicking on the see more link of KB and ' +
        'reference document', function () {
        searchResultsPage.kBSeeMoreLinkTemp.click();
        supportLandingPage.switchOn(supportWindow);
        supportLandingPage.runOnNonAngular(function () {
            supportLoginPage.enterUserIdandPassword("precisionautomation", "ptcse1");
            browser.getCurrentUrl().then(function (url) {
                contentURL = supportLandingPage.getParseURL(url);
                console.log(contentURL[0] + " " + contentURL[1] + " " + contentURL[2]);
                expect(supportLandingPage.getKeyowrdBox.getAttribute('value')).toEqual(contentURL[0]);
                browser.sleep(3000);
                expect(supportLandingPage.checkKBDocumentType).toBe(true);
                supportLandingPage.getDocumentTypeText.then(function (list) {
                    expect(list[0].getText()).toContain(contentURL[1]);
                    expect(supportLandingPage.checkArtDocumentType).toBe(true);
                    if (contentURL[2] != "")
                        expect(list[1].getText()).toContain(contentURL[2]);
                });
                browser.driver.close().then(function () {
                    supportLandingPage.switchOn(ulcWindow);
                });
            });

        });
    });

    it('Should display the content type as help center after clicking on the see more link of help center document', function () {
        searchResultsPage.HCSeeMoreLink.click();
        supportLandingPage.switchOn(supportWindow);
        browser.sleep(3000);
        supportLandingPage.runOnNonAngular(function () {
            browser.getCurrentUrl().then(function (url) {
                console.log(url);
                contentURL = supportLandingPage.getParseURL(url);
                browser.sleep(3000);
                expect(supportLandingPage.getKeyowrdBox.getAttribute('value')).toEqual(contentURL[0]);
                expect(supportLandingPage.checkHCDocumentType).toBe(true);
                supportLandingPage.getDocumentTypeText.then(function (list) {
                    expect(list[0].getText()).toContain(contentURL[1]);
                })
                browser.driver.close().then(function () {
                    //to switch to the previous window
                    supportLandingPage.switchOn(ulcWindow);
                });
            });
        });
    });

    it('Should display the content type as help center after clicking on the see more link of help center document', function () {
        searchResultsPage.CMSeeMoreLink.click();
        supportLandingPage.switchOn(supportWindow);
        supportLandingPage.runOnNonAngular(function () {
            browser.getCurrentUrl().then(function (url) {
                console.log(url);
                contentURL = supportLandingPage.getParseURL(url);
                browser.sleep(3000);
                expect(supportLandingPage.getKeyowrdBox.getAttribute('value')).toEqual(contentURL[0]);
                expect(supportLandingPage.checkCMDocumentType).toBe(true);
                supportLandingPage.getDocumentTypeText.then(function (list) {
                    expect(list[0].getText()).toContain(contentURL[1]);
                    expect(supportLandingPage.checkCBDocumentType).toBe(true);
                    if (contentURL[2] != "")
                        expect(list[1].getText()).toContain(contentURL[2]);
                })
                browser.driver.close().then(function () {
                    //to switch to the previous window
                    supportLandingPage.switchOn(ulcWindow);
                });
            });
        });
    });
});


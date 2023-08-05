/*
* Created by tdhir on 22-11-2016.
*/
/*

var LandingPage = require('../../pages/landing.page.js');
var Header_footer_Page = require ('../../pages/header.footer.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var SupportLoginPage = require('../../pages/support.login.page.js');
var SupportLandingPage = require('../../pages/support.landing.page.js');
var landingPage = new LandingPage();
var headerFooterPage = new Header_footer_Page();
var searchResultsPage=new SearchResultsPage();
var supportLoginPage = new SupportLoginPage();
var supportLandingPage = new SupportLandingPage();

var ulcURL= browser.params.ulcOptions.ulcURL;
var supportWindow = browser.params.windowHandles.SUPPORT;
var ulcWindow = browser.params.windowHandles.ULC;
var contentURL = [];

describe('This is for testing the see more link of the support for the browse functionality',function() {
     var productToBrowse = "ThingWorx";
     beforeAll(function () {
         landingPage.goTo(ulcURL);
         landingPage.clickOnGivenProduct(productToBrowse);
     });

     it('Should display the content type as reference document and article after clicking on the see more link of KB and' +
         'reference document', function () {
         searchResultsPage.kBSeeMoreLinkTemp.click();
         supportLandingPage.switchOn(supportWindow);
         supportLandingPage.runOnNonAngular(function() {
         supportLoginPage.enterUserIdandPassword("username","ddddfs");
             browser.getCurrentUrl().then(function (url) {
                 console.log(url);
                 contentURL = supportLandingPage.getParseURL(url);
                 browser.sleep(8000);
                 expect(supportLandingPage.getKeyowrdBox.getAttribute('value')).toEqual(contentURL[0]);
                 expect(supportLandingPage.checkKBDocumentType).toBe(true);
                 supportLandingPage.getDocumentTypeText.then(function (items) {
                     expect(items[0].getText()).toContain(contentURL[1]);
                     expect(supportLandingPage.checkArtDocumentType).toBe(true);
                     if (contentURL[2] != "")
                         expect(items[1].getText()).toContain(contentURL[2]);
                     if (contentURL[3] != "")
                         expect(items[2].getText()).toContain(contentURL[3]);
                     if (contentURL[4] != "")
                         expect(items[3].getText()).toContain(contentURL[4]);
                 });
                 browser.driver.close().then(function () {
                     //to switch to the previous window
                     supportLandingPage.switchOn(ulcWindow);
                 });
             });
         });
     });

     it('Should display the content type as help center after clicking on the see more link of help center document', function () {
         searchResultsPage.HCSeeMoreLink.click();
         supportLandingPage.switchOn(supportWindow);
         supportLandingPage.runOnNonAngular(function() {
             browser.getCurrentUrl().then(function (url) {
                 console.log(url);
                 contentURL = supportLandingPage.getParseURL(url);
                 browser.sleep(3000);
                 expect(supportLandingPage.getKeyowrdBox.getAttribute('value')).toEqual(contentURL[0]);
                 expect(supportLandingPage.checkHCDocumentType).toBe(true);
                 supportLandingPage.getDocumentTypeText.then(function (items) {
                     expect(items[0].getText()).toContain(contentURL[4]);
                     expect(supportLandingPage.checkHCDocumentType).toBe(true);
                     if (contentURL[1] != "")
                         expect(items[1].getText()).toContain(contentURL[1]);
                     if (contentURL[3] != "")
                         expect(items[2].getText()).toContain(contentURL[3]);
                 });
                 browser.driver.close().then(function () {
                     //to switch to the previous window
                     supportLandingPage.switchOn(ulcWindow);
                 });
             });
         });
     });
 });
*/

/**
 * Created by tdhir on 27-10-2016.
 */

'use strict';
var LandingPage = require('../../pages/landing.page.js');
var ResultsPage = require('../../pages/results.page.js');
var SupportLoginPage = require('../../pages/support.login.page.js');
var SupportLandingPage = require('../../pages/support.landing.page.js');
var exec = require('../../utils/specHelper');

var landingPage = new LandingPage();
var resultsPage = new ResultsPage();
var supportLoginPage = new SupportLoginPage();
var supportLandingPage = new SupportLandingPage();
var title = '';
var resultTitle = '';

describe('Checking navigation when support links are clicked from search page', function () {

    var searchKeyword = "ThingWorx";

    beforeAll(function () {
        landingPage.goTo(browser.params.ulcOptions.ulcURL);
        landingPage.homeSearchBar.sendKeys(searchKeyword);
        landingPage.homeSearchBarButton.click();
    });
    afterAll(function () {
        exec.cleanUp();
    });
    it('Should display reference documents and KB header and Title', function () {
        resultsPage.getFirstReferenceKBDoc.click();
        title = resultsPage.getfirstReferenceDocKBTitle.getText().then(function (title) {
            resultTitle = title;
            console.log(resultTitle);
        });
    });

    it('Should check that the title of reference documents and KB header getting displayed on ULC is matching with ' +
        'support site', function () {
        supportLandingPage.switchOn(browser.params.windowHandles.SUPPORT);
        supportLandingPage.runOnNonAngular(function () {
            browser.sleep(3000);
            //Need to change this before running the script
            supportLoginPage.enterUserIdandPassword("precisionautomation", "ptcse1");
            supportLandingPage.getDocumentTitle.getText().then(function (title) {
                expect(title).toEqual(resultTitle);
                browser.driver.close().then(function () {
                    //to switch to the previous window
                    supportLandingPage.switchOn(browser.params.windowHandles.ULC);
                });
            });
        });
    });

    it('Should display help center header and title', function () {
        supportLandingPage.switchOn(browser.params.windowHandles.ULC); //the focus moves back to first tab
        resultsPage.getFirstHCDoc.click();
        title = resultsPage.getFirstHCDocTitle.getText().then(function (title) {
            resultTitle = title;
            console.log(resultTitle);
            browser.sleep(3000);
        });
    });

    it('Should display community forum and post header and title', function () {
        supportLandingPage.switchOn(browser.params.windowHandles.ULC);//the focus moves back to first tab
        resultsPage.getFirstCFDoc.click();
        title = resultsPage.getFirstCFDocTitle.getText().then(function (title) {
            resultTitle = title;
            console.log(resultTitle);
        });
    });

    it('Should check that the title of community forum and post getting displayed on ULC site is matching with support ' +
        'site', function () {
            supportLandingPage.runOnNonAngular(function () {
                supportLandingPage.switchOn(browser.params.windowHandles.SUPPORT);
                browser.sleep(35000);
                supportLandingPage.getCFDocumentTitle.getText().then(function (title) {
                    expect(title).toEqual(resultTitle);
                    browser.driver.close();
                });

            });
        supportLandingPage.switchOn(browser.params.windowHandles.ULC);
        browser.get(browser.params.ulcOptions.ulcURL);
    });

});
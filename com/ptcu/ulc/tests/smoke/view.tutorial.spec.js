'use strict';


var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var AdvertPage = require('../../pages/advertisement.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');


describe('Tutorial page with advertisement', function () {
    var landingPage = new LandingPage();
    var browseResultsPage = new BrowseResultsPage();
    var advertPage = new AdvertPage();
    var browseContentMenuPage = new BrowseContentMenuPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        browseResultsPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
        element(by.linkText(seeMoreData.productToBrowse[1])).click();
        browser.waitForAngular();
        browseResultsPage.getFirstTutorial.click();
        browser.waitForAngular();
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should validate that advertisement details are getting displayed', function () {
        //expect(advertPage.closeButton.isDisplayed()).toBe(true);
        advertPage.getTutorialInlineAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertPage.getTitle.getText().then(function(title){
                  expect(title.length).toBeGreaterThan(0);
                });
                expect(advertPage.closeButton.isDisplayed()).toBe(true);
                expect(advertPage.getInlineAdCTALink.getAttribute("ng-href")).toContain("http");
                advertPage.getTutoralInlineAdCTALink.getText().then(function(linkText){
                    expect(linkText.length).toBeGreaterThan(0);
                });
                //expect(element(by.tagName('a')).getText().length).toBeGreaterThan(0);

            }else{
                expect(isDisplayed).not.toBe(false, "No Inline AD found")

            }
        });
    });

    it('Should validate that close button can be clicked', function () {
        advertPage.getTutorialInlineAd.isDisplayed().then(function (isDisplayed) {
            if (isDisplayed) {
                advertPage.closeButton.click();
                browser.waitForAngular();
                expect(advertPage.getTutorialInlineAd.isDisplayed()).toBe(false);
            } else {
                expect(isDisplayed).not.toBe(false, "No Inline AD found")

            }
        });
    });

});
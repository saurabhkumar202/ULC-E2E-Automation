/**
 * Created by dghan on 23-08-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var CourseViewer = require('../../pages/course.viewer.page.js');
var exec = require('../../utils/specHelper');
var loginData = require('../../resources/loginData.json');

var courseViewer = new CourseViewer();
var landingPage = new LandingPage();
var browseResultsPage = new BrowseResultsPage();
var headerFooterPage = new HeaderFooter();
var ulcURL = browser.params.ulcOptions.ulcURL;
var productToBrowse = "ThingWorx";
var resultCourseTitle;
var browseContentMenuPage = new BrowseContentMenuPage();

describe('E-Learning course navigation Browse product from landing page', function () {


    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        expect(headerFooterPage.isAt).toBe(true);
        exec.login(String(loginData.uid), String(loginData.pwd));
    });
    afterAll(function () {
        exec.cleanUp();
    });

    it('Browse-Click on tutorial should open the tutorial in details page', function () {
        // landingPage.clickOnGivenProduct(productToBrowse);
        // browser.waitForAngular();

        headerFooterPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
        element(by.linkText(productToBrowse)).click();
        browser.waitForAngular();

        browseResultsPage.getElearningTitle.getText().then(function (title) {
            resultCourseTitle = title;
            // console.log(resultCourseTitle);
        });
        browseResultsPage.getFirstElearning.click();
        browser.driver.manage().window().maximize();
        courseViewer.runOnNonAngular(function () {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(courseViewer.courseTitle), 25000);
            expect(courseViewer.getCourseTitle).toContain(resultCourseTitle);
            browser.isElementPresent(courseViewer.nextTopic);
            courseViewer.backToULC.click();
        });
        browser.waitForAngular();
    });

});

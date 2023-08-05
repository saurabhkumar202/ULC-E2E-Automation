/**
 * Created by dghan on 6/15/2016.
 */

'use strict';
var LandingPage = require('../../pages/landing.page.js');
var headerFooterPage = require('../../pages/header.footer.page');
var plmsLaunchPage = require('../../pages/plms.launch.page.js');
var ptcSupportPage = require('../../pages/ptc.support.launch.page.js');
var exec = require('../../utils/specHelper');
var DummyClient = require('../../pages/dummy.client.page.js');
var CourseViewer = require('../../pages/course.viewer.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var dummyClientData = require('../../resources/dummyClientData.json');
var loginData = require('../../resources/loginData.json');
var seeMoreData = require('../../resources/seeMoreData.json');

var ulcURL = browser.params.ulcOptions.ulcURL;
var plms = new plmsLaunchPage();
var ptcsupport = new ptcSupportPage();
var headerFooter = new headerFooterPage();
var dummyClient = new DummyClient();
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var productToBrowse = "ThingWorx";
var browseResultsPage = new BrowseResultsPage();
var courseViewer = new CourseViewer();
var forward = "1";
var backward = "0";

describe('SSO Test scenarios:', function () {
    var landingPage = new LandingPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var plmsURL = browser.params.ulcOptions.plmsURL;
    var ptcSupportURL = browser.params.ulcOptions.ptcsupport;
    var resultCourseTitle;
    beforeAll(function () {
        headerFooter.goTo(ulcURL);
        browser.waitForAngular();
    });
    beforeEach(function () {
        headerFooter.goTo(ulcURL);
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        exec.login(String(loginData.uid), String(loginData.pwd));
    });

  /*  afterAll(function () {
        exec.cleanUp();
    }); */

    it('Login to LC auto login to PLMS ', function () {
        //Login to LC auto login to PLMS TC Getting failed.Sign out not visible to user on LMS.Its a bug.Once we refresh both ULC and LMS its started showing signOut
        expect(landingPage.isSearchBoxDisplayed).toBe(true);
        headerFooter.runOnNonAngular(function () {
            browser.executeScript(function () {
                window.open(arguments[0], "second-window");
            }, plmsURL);
            browser.switchTo().window('second-window');
            browser.sleep(5000);
            plms.plmsLogOut.isDisplayed().then(function () {
                expect(1).toBe(1);
            }, function () {
                expect(1).toBe(0, 'Sign Out Link is not present');
            });
            browser.executeScript('window.close()');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[0]);
            })

        });

    });

    it('Login to LC auto login to PLMS hence no login is asked for viewing course viewer ', function () {
        expect(landingPage.isSearchBoxDisplayed).toBe(true);
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[2], seeMoreData.familyToBrowse[2]);
        browser.driver.manage().window().maximize();
        browseResultsPage.getFirstElearning.click();
        courseViewer.runOnNonAngular(function () {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(courseViewer.courseTitle), 15000);
            expect(courseViewer.getPageTitle).toEqual('Course Viewer');
            browser.wait(EC.presenceOf(courseViewer.backToULC), 15000);
            courseViewer.backToULC.click().then(function () {
            });
        });

    });
    it('Login to LC auto login to support ', function () {
        expect(landingPage.isSearchBoxDisplayed).toBe(true);
        headerFooter.runOnNonAngular(function () {
            browser.executeScript(function () {
                window.open(arguments[0], "second-window");
            }, ptcSupportURL);
            browser.switchTo().window('second-window');
            //browser.sleep(5000);
            ptcsupport.ptcSupportUserAccount.click();
            browser.sleep(4000);
            ptcsupport.ptcSupportLogOut.isDisplayed().then(function () {
                expect(1).toBe(1);
            }, function () {
                expect(1).toBe(0, 'Log Out Link is not present');
            });
            browser.executeScript('window.close()');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[0]);
            });
        });

    });

    it('Login to LC auto login to LC connected mode ', function () {
        expect(landingPage.isSearchBoxDisplayed).toBe(true);
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            //This needs to be changed to CREO
            dummyClient.launchUlc(ulcURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });
        //dummyClient.switchWindow(forward);

        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(headerFooter.lnkUserAccount), 15000);
        // browser.sleep(10000);
        // expect(headerFooter.isAt).toBe(true);
        expect(headerFooter.lnkUserAccount.isDisplayed()).toBe(true);
    });
    afterEach(function () {
        browser.waitForAngular();
        headerFooter.logOut();
    });


});

/**
 * Created by pankumar on 30-11-2016.
 */

'use strict';

var HeaderFooter = require('../pages/header.footer.page.js');
var LandingPage = require('../pages/landing.page');
var BrowsePage = require('../pages/browse.results.page');
var DummyClient = require('../pages/dummy.client.page');
var Tuner = require("../pages/tuner.page");
var ExternalTuner = require('../pages/external.url.tuner.page.js');
var headerFooter = new HeaderFooter();
var landingPage = new LandingPage();
var browsePage = new BrowsePage();
var dummyClient = new DummyClient();
var tuner = new Tuner();
var externalTuner = new ExternalTuner();

module.exports = {
    login: function (uid, pwd) {
        browser.waitForAngular();
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is not displayed");
        headerFooter.signInLink.click();
        expect(headerFooter.signInForm.isDisplayed()).toBe(true, "SignIn form is not displayed");
        headerFooter.login(uid, pwd);
        expect(headerFooter.lnkUserAccount.isDisplayed()).toBe(true, "My account (user logged in) is not displayed");
    },
    logout: function () {
        browser.waitForAngular();
        expect(headerFooter.lnkUserAccount.isDisplayed()).toBe(true, "My account (user logged in) is not displayed");
        headerFooter.logOut();
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is not displayed");
    },
    cleanUp: function () {
        //Close all the windows
        headerFooter.switchOn(browser.params.windowHandles.ULC);
        //Logout
        headerFooter.lnkUserAccount.isDisplayed().then(function (visibility) {
            if (visibility) {
                console.log("logging out from cleanup...");
                headerFooter.logOut();
                browser.sleep(5000);
            } else {
                console.log("didn't logged in.. cleanup")
            }
        });
        //For deleting content lang
        browser.manage().deleteCookie("selectedLanguage");
        browser.manage().deleteCookie("includeEnglish");
        headerFooter.closeAllOtherWindows();
        //TODO: Is there any need to clean org preference ?
    },
    launchULCFromDummyClient: function (dummyClientURL, connectedULCURL, product, ver, lang) {
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            browser.driver.manage().window().maximize();
            dummyClient.launchUlc(connectedULCURL, product, ver, lang);
        });
        browser.waitForAngular();
    },

    addExternalURL: function (toCommand, urlToAdd, urlTitle, urlThumbnail, urlDescription) {
        tuner.tunerSearch(toCommand);
        expect(tuner.commandTable).toContain(toCommand);
        tuner.clickExternalTunerIcon;
        expect(externalTuner.closeURLTuner.isDisplayed()).toBe(true, "Close button is missing");
        externalTuner.AddURLDetails(urlToAdd, urlTitle, urlThumbnail, urlDescription);
        browser.waitForAngular();
        tuner.clickRefreshRecommendations.then(function () {
            expect(tuner.getUrlTitle(urlTitle).getText()).toEqual(urlTitle);
            expect(tuner.getUrlDesc(urlTitle).getText()).toEqual(urlDescription);
            expect(tuner.verifyEditIcon(urlTitle).isDisplayed()).toBe(true, "Edit icon is present");
            expect(tuner.verifyDeleteUrl(urlTitle).isDisplayed()).toBe(true, "Delete url icon is present");
        });
    }
};
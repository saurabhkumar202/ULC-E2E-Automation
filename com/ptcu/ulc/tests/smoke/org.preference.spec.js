/**
 * Created by rdewangan on 04-08-2016.
 */

'use strict';

var OrgPreference = require('../../pages/org.preference.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var exec = require('../../utils/specHelper');
var LandingPage = require('../../pages/landing.page.js');
var loginData = require('../../resources/loginData.json');

var orgPreference = new OrgPreference();
var dummyClient = new DummyClient();
var headerFooter = new HeaderFooter();
var landingPage = new LandingPage();

describe('Org Preference', function () {

    var ulcURL = browser.params.ulcOptions.ulcURL;
    var dummyClientURL = browser.params.ulcOptions.dummyClient;

    afterEach(function () {
        exec.cleanUp();
    });

    beforeEach(function () {

        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.lnkUserAccount.click();
        expect(headerFooter.lnkAdminSettings.isDisplayed()).toBe(true);
        headerFooter.lnkAdminSettings.click();
    });
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
    });

    it('should display and click Administrative settings link', function () {

        browser.waitForAngular();
        expect(orgPreference.isOrgPreferenceDisplayed).toBe(true);
    });

    it('should display the org preference selected', function () {
        orgPreference.lnkOrgPreference.click();

        expect(orgPreference.isSelectedOrgPrefDisplayed).toBe(true);
        orgPreference.chooseOrgPref();
        orgPreference.saveOrgPref();
        browser.waitForAngular();
    });

});
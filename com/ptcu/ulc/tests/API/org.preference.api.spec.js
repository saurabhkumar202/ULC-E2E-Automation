/**
 * Created by rdewangan on 17-10-2016.
 */

'use strict';

var OrgPreference = require('../../pages/org.preference.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var DummyClient = require('../../pages/dummy.client.page.js');
var exec = require('../../utils/specHelper');
var loginData = require('../../resources/loginData.json');
var dummyClientData = require('../../resources/dummyClientData.json');


var orgPreference = new OrgPreference();
var dummyClient = new DummyClient();
var headerFooter = new HeaderFooter();
var pref;

describe('launch Standalone ULC', function () {

    var ulcURL = browser.params.ulcOptions.ulcURL;
    var dummyClientURL = browser.params.ulcOptions.dummyClient;

    afterAll(function () {
        exec.cleanUp();
    });

    beforeAll(function () {
        headerFooter.goTo(ulcURL);
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
    });

    it('should launch standalone ulc and login', function () {
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.lnkUserAccount.click();
        expect(headerFooter.lnkAdminSettings.isDisplayed()).toBe(true);
        headerFooter.lnkAdminSettings.click();
        browser.driver.sleep(5000);
        expect(orgPreference.isOrgPreferenceDisplayed).toBe(true);
        orgPreference.chooseOrgPref();
        orgPreference.saveOrgPref();
        browser.waitForAngular();
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
        orgPreference.getOrgPrefSelected().then(function (value) {
            pref = value;
            console.log(pref);
        });
        exec.logout();
        dummyClient.runOnNonAngular(function () {
            dummyClient.goTo(dummyClientURL);
            browser.driver.manage().window().maximize();
            dummyClient.launchUlc(ulcURL, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        });
        browser.waitForAngular();
    });


    it('should launch dummy client', function () {

        expect(headerFooter.isAt).toBe(true);
    });

    it('should display and click Administrative settings link', function () {
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.lnkUserAccount.click();
        expect(headerFooter.lnkAdminSettings.isDisplayed()).toBe(true);
        headerFooter.lnkAdminSettings.click();
        browser.waitForAngular();
        expect(orgPreference.isOrgPreferenceDisplayed).toBe(true)
    });

    it('should display the org preference selected', function () {
        expect(orgPreference.isSelectedOrgPrefDisplayed).toBe(true);
    });

    it('verify api call for org preference ', function () {
        orgPreference.startFreshNetworkCapture();
        orgPreference.chooseOrgPref();
        orgPreference.saveOrgPref();
        browser.waitForAngular();
        orgPreference.getCurrentHARDetails(browser.params.apiType.ORG_PREF, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            expect(responses[0].url).toMatch(pref);
        });
        exec.logout();
    });
});
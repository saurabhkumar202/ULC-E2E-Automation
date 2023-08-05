/**
 * Created by dghan on 8/17/2016.
 */

'use strict'

var DummyClient = require('../../pages/dummy.client.page.js');
var OrgPreference = require('../../pages/org.preference.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var exec = require('../../utils/specHelper');
var loginData = require('../../resources/loginData.json');
var dummyClientData = require('../../resources/dummyClientData.json');

var dummyClient = new DummyClient();
var orgPreference = new OrgPreference();
var headerFooter = new HeaderFooter();
var plmsUrl = browser.params.ulcOptions.plmsURL;
var connectedULC = browser.params.ulcOptions.ulcConnectedModeURL;
var dummyClientURL = browser.params.ulcOptions.dummyClient;
var orgPref;
var apiCallRequestExp = headerFooter.regexpEscape(plmsUrl
    + '/api/resourcehub/v1/content/recommendations/en/thingworx/6');

describe('Org preference recommendations ', function () {
    beforeAll(function () {
        orgPreference.goTo(browser.params.ulcOptions.ulcURL);
    });

    beforeEach(function () {
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.lnkUserAccount.click();
        headerFooter.lnkAdminSettings.click();
    });

    afterEach(function () {
        exec.logout();
        headerFooter.getBrowserErrors(function (logs) {
            expect(logs.length).toBe(0, logs.toString());
        });
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Set org preference to BOTH and verify the PLMS recommendation API call', function () {
        orgPref = 'BOTH'
        orgPreference.setOrgPreferences(orgPref);
        exec.logout();
        browser.waitForAngular();
        exec.launchULCFromDummyClient(dummyClientURL, connectedULC, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        orgPreference.startFreshNetworkCapture();
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.getCurrentHARDetails(browser.params.apiType.RECOMMENDATION, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            //this code needs a refactoring just a hack
            var expression = new RegExp(orgPref + '.*');
            expression = apiCallRequestExp + expression;
            expression = expression.replace(".*/", ".*");
            expression = expression.replace(" ", "");
            expect(responses[0].url).toMatch(expression);
        });

    });

    it('Set org preference to ALWAYSHIDEPTCCONTENT and verify the PLMS recommendation API call', function () {
        orgPref = 'ALWAYSHIDEPTCCONTENT'
        orgPreference.setOrgPreferences(orgPref);
        exec.logout();
        exec.launchULCFromDummyClient(dummyClientURL, connectedULC, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        orgPreference.startFreshNetworkCapture();
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.getCurrentHARDetails(browser.params.apiType.RECOMMENDATION, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            var expression = new RegExp(orgPref + '.*');
            expression = apiCallRequestExp + expression;
            expression = expression.replace(".*/", ".*");
            expression = expression.replace(" ", "");
            expect(responses[0].url).toMatch(expression);
        });

    });

    it('Set org preference to HIDEPTCCONTENT and verify the PLMS recommendation API call', function () {
        orgPref = 'HIDEPTCCONTENT'
        orgPreference.setOrgPreferences(orgPref);
        exec.logout();
        exec.launchULCFromDummyClient(dummyClientURL, connectedULC, dummyClientData.Prod, dummyClientData.Version, dummyClientData.locale);
        orgPreference.startFreshNetworkCapture();
        exec.login(String(loginData.uid), String(loginData.pwd));
        headerFooter.getCurrentHARDetails(browser.params.apiType.RECOMMENDATION, "queryString", function (responses) {
            expect(responses.length).toBe(1);
            var expression = new RegExp(orgPref + '.*');
            expression = apiCallRequestExp + expression;
            expression = expression.replace(".*/", ".*");
            expression = expression.replace(" ", "");
            expect(responses[0].url).toMatch(expression);
        });

    });

});

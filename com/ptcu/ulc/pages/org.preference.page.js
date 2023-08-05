/**
 * Created by rdewangan on 04-08-2016.
 */
'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var orgPref = function () {
};

orgPref.prototype = Object.create(HeaderFooter.prototype, {

    lnkOrgPreference: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.lnkOrgPreference));
        }
    },
    isOrgPreferenceDisplayed: {
        get: function () {
            return this.lnkOrgPreference.isDisplayed();
        }
    },
    selectedOrgPref: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.selectedOrgOref));
        }
    },
    getOrgPrefSelected: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.selectedOrgOref)).getAttribute("value");
        }
    },
    isSelectedOrgPrefDisplayed: {

        get: function () {
            return this.selectedOrgPref.isDisplayed();
        }
    },
    chooseOrgPref: {
        value: function () {
            element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.orgPrefBoth)).click();
        }
    },
    saveOrgPref: {
        value: function () {
            element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.savebtn)).click();
        }
    },
    chooseOrgPrefAsGiven: {
        value: function (orgPref) {
            if (orgPref === 'BOTH') {
                element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.orgPrefBoth)).click();
            } else if (orgPref === 'ALWAYSHIDEPTCCONTENT') {
                element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.OrgPrefAlwaysHidePtcContent)).click();
            } else if (orgPref === 'HIDEPTCCONTENT') {
                element(this.getLocator(locRepo.pageObjects.administrativeSettingsPage.orgPrefHidePtcContent)).click();
            }
        }
    },
    setOrgPreferences: {
        value: function (orgPref) {
            this.chooseOrgPrefAsGiven(orgPref);
            this.saveOrgPref();
        }
    }
});

module.exports = orgPref;
/**
 * Created by dghan on 23-08-2016.
 */
'use strict';
var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var PtcSupportLaunchPage = function () {
};

PtcSupportLaunchPage.prototype = Object.create(headerFooter.prototype, {
    ptcSupportLogOut: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.ptcsupport.logOut));
        }
    },
    ptcSupportUserAccount: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.ptcsupport.userAccount));
        }
    },
    supportWelcome: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.ptcsupport.welcomeMsg));
        }
    },
    getPageTitle: {
        get: function () {
            return browser.getTitle().then(function (title) {
                console.log(title);
            })
        }
    }
});
module.exports = PtcSupportLaunchPage;
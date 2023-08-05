/**
 * Created by dghan on 23-08-2016.
 */
'use strict';
var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var PlmsLaunchPage = function () {
};
PlmsLaunchPage.prototype = Object.create(headerFooter.prototype, {
    plmsLogOut: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.plms.logOut));
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
module.exports = PlmsLaunchPage;
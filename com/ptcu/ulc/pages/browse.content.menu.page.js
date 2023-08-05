/**
 * Created by dghan on 9/7/2016.
 */


'use strict';

var locRepo = require('../resources/locatorRepository.json');
var Header_Footer = require('./header.footer.page.js');
var results = require('./browse.results.page.js');
var BrowseContentMenuPage = function () {

};
BrowseContentMenuPage.prototype = Object.create(Header_Footer.prototype, {
    getProductLink: {
        value: function (lnkText) {
            return element(this.getLocator({
                "method": "linkText",
                "value": lnkText
            })).click();
        }
    },
    getBrowseMenu: {
        get: function () {
            return element(this.getLocator({
                "method": "css",
                "value": ".showDD"
            }));
        }
    },
    getURL: {
        get: function () {
            return browser.getCurrentUrl();
        }
    },
});

module.exports = BrowseContentMenuPage;
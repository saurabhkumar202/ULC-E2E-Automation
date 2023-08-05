'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var AdvertHomePage = function () {
};

AdvertHomePage.prototype = Object.create(HeaderFooter.prototype, {

    getBottomAdTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.adTitle)).getText();
        }
    },

    });

module.exports = AdvertPage;
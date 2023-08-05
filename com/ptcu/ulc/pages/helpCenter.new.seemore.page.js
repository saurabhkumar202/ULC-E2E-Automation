/**
 * Created by saukumar on 28-07-2017.
 */

"use strict";

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');
var SeeMore = require('../pages/see.more.page');


function HCNewSeeMore() {
};

HCNewSeeMore.prototype = Object.create(SeeMore.prototype);
HCNewSeeMore.prototype.helpcenter = function () {
    var that = this;
    return {
        getCount: function () {
            return element.all(that.getLocator(locRepo.pageObjects.hCkBSeeMore.helpCenter)).count();
        },
        getProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesProductsList)).getText();
        },
        getVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.hCkBSeeMore.hcVersionInfoResultSet)).map(function (elem, index) {
                return elem.getText().then(function (temp) {
                    return temp.substring(9);
                });
            });
        }
    }
};
HCNewSeeMore.prototype.productInfo = function () {
    return element.all(this.getLocator(locRepo.pageObjects.hCkBSeeMore.hcProductInfoResultSet)).getText();
};
HCNewSeeMore.prototype.versionInfo = function () {
    return element.all(this.getLocator(locRepo.pageObjects.hCkBSeeMore.hcVersionInfoResultSet)).getText();
};

module.exports = HCNewSeeMore;

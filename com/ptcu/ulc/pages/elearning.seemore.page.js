"use strict";

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');

function ELearningSeeMore() {
};

ELearningSeeMore.prototype = Object.create(HeaderFooter.prototype);


ELearningSeeMore.prototype.courses = function () {
    var that = this;


    return {
        getCount: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.courses)).count();
        },
        getProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesProductsList)).getText();
        },
        getVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesVersionsList)).getText();
        },

    }
};

ELearningSeeMore.prototype.facets = function () {
    var that = this;

    return {

        getProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsProductsList)).getText();
        },
        getVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).getText();
        },
        getCheckedProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsProductsList)).filter(function (product) {
                return product.element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsProductsCheckbox)).isSelected();
            }).getText();
        },
        getCheckedVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).filter(function (version) {
                return version.element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsCheckedCheckbox)).isSelected();
            }).getText();

        }

    }
};

ELearningSeeMore.prototype.btnSeeMore = function () {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.btnSeeMore));
};
ELearningSeeMore.prototype.getVersion = function () {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).getText();
};

module.exports = ELearningSeeMore;

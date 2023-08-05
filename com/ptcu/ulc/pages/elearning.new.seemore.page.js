/**
 * Created by saukumar on 28-07-2017.
 */

"use strict";

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');
var SeeMore = require('../pages/see.more.page');

function ELearningNewSeeMore() {
};

ELearningNewSeeMore.prototype = Object.create(SeeMore.prototype);


/*ELearningNewSeeMore.prototype.courses = function() {
    var that = this;
    return {
        getCount: function() {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.courses)).count();
        },
        getProductsList: function() {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesProductsList)).getText();
        },
        getVersionsList: function() {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesVersionsList)).getText();
        }

    }
};

ELearningNewSeeMore.prototype.btnSeeMore = function() {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.btnSeeMore));
};
ELearningNewSeeMore.prototype.getVersion = function() {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).getText();
};*/

module.exports = ELearningNewSeeMore;

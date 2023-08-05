/**
 * Created by saukumar on 28-07-2017.
 */

"use strict";

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');
var SeeMore = require('../pages/see.more.page');


function KBNewSeeMore() {
};

KBNewSeeMore.prototype = Object.create(SeeMore.prototype);


KBNewSeeMore.prototype.articles = function () {
    var that = this;
    return {
        getCount: function () {
            return element.all(that.getLocator(locRepo.pageObjects.hCkBSeeMore.knowledgeBase)).count();
        },
        getProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesProductsList)).getText();
        },
        getVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesVersionsList)).getText();
        }

    }
};

KBNewSeeMore.prototype.btnSeeMore = function () {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.btnSeeMore));
};
/*
KBNewSeeMore.prototype.getVersion = function() {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).getText();
};*/

module.exports = KBNewSeeMore;

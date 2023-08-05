"use strict";

var eLearningSeeMore = require('../pages/elearning.seemore.page');
var locRepo = require('../resources/locatorRepository.json');

function BrowseSeeMore() {

}

BrowseSeeMore.prototype = Object.create(eLearningSeeMore.prototype);

BrowseSeeMore.prototype.title = function () {
    var that = this;
    return {
        keyword: element(
            that.getLocator(locRepo.pageObjects.browseResultsPage.productNameOnSeeMore)).getText()
    }
};

module.exports = BrowseSeeMore;
/**
 * Created by rdewangan on 12-08-2017.
 */

"use strict";

var locRepo = require('../resources/locatorRepository.json');
var SeeMore = require('../pages/see.more.page');


function CommunitySeeMore() {
};
CommunitySeeMore.prototype = Object.create(SeeMore.prototype);
CommunitySeeMore.prototype.community = function () {
    return element.all(this.getLocator(locRepo.pageObjects.communitySeeMore.communityresults)).count();
};

CommunitySeeMore.prototype.btnSeeMore = function () {
    return element(this.getLocator(locRepo.pageObjects.eLearningSeeMore.btnSeeMore));
};

module.exports = CommunitySeeMore;
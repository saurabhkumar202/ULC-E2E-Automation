/**
 * Created by pankumar on 24-11-2016.
 */

"use strict";

var eLearningSeeMore = require('../pages/elearning.seemore.page');
var locRepo = require('../resources/locatorRepository.json');

function SearchSeeMore() {

}

SearchSeeMore.prototype = Object.create(eLearningSeeMore.prototype);

SearchSeeMore.prototype.title = function () {
    var that = this;
    return {
        icon: function () {
            var getBeforeContent = browser.executeScript("return window.getComputedStyle(document.querySelector('#mainContent h1'),':before').getPropertyValue('content')");
            return {
                isDisplayed: function () {
                    var deferred = protractor.promise.defer();
                    getBeforeContent.then(function (text) {
                        deferred.fulfill(text.length > 0);
                    });
                    return deferred.promise;
                }
            }
        },
        keyword: element(
            that.getLocator(locRepo.pageObjects.searchResultsPage.pageHeaderTitle)).getText()
    }
};

module.exports = SearchSeeMore;
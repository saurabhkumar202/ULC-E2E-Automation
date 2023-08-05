/**
 * Created by rdewangan on 02-08-2017.
 */

"use strict";

var eLearningNewSeeMore = require('../pages/elearning.new.seemore.page');
var locRepo = require('../resources/locatorRepository.json');

function SearchSeeMore() {

}

SearchSeeMore.prototype = Object.create(eLearningNewSeeMore.prototype, {


    productInformationMetadata: {
        get: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesVersionsList)).getText();
        }
    }

})


module.exports = SearchSeeMore;
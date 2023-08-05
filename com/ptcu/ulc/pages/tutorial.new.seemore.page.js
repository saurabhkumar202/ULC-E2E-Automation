/**
 * Created by saukumar on 28-07-2017.
 */

"use strict";

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');
var SeeMore = require('../pages/see.more.page');


function TutorialNewSeeMore() {
};

TutorialNewSeeMore.prototype = Object.create(SeeMore.prototype);

TutorialNewSeeMore.prototype.TutContent = function () {
    var that = this;

    return {
        getSeeMorePageBtn: function () {
            return element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.btnSeeMore));
        },
        clickSeeMorePageBtn: function () {
            return element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.btnSeeMore)).click();

        },
        getFirstLexTutorial: function () {
            return element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.firstLexTutorial));

        },
        getFirstLexTutorialTitle: function () {
            return element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.firstLexTutorial))
                .element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.resultTitle))

        },
        getFirstLexTutorialDescription: function () {
            return element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.firstLexTutorial))
                .element(that.getLocator(locRepo.pageObjects.tutorialSeeMore.resultDescription))
        },
        getTutorialVersions: function () {
            return element.all(that.getLocator(locRepo.pageObjects.tutorialSeeMore.productVersions)).getText()
        }


    }

}
module.exports = TutorialNewSeeMore;

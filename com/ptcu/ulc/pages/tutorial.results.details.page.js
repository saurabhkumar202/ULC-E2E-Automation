/**
 * Created by dghan on 7/29/2016.
 */

'use strict';
var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var TutorialsResultsDetailsPage = function () {

};
TutorialsResultsDetailsPage.prototype = Object.create(headerFooter.prototype, {
    relatedArticles: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.relatedArticles));
        }
    },
    firstTutorialResultTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.firstCaseStudyResultTitle));
        }
    },

    firstTutorialResultDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.firstCaseStudyResultDescription));
        }
    },
    getFirstTutorialResultTitle: {
        get: function () {
            return this.firstTutorialResultTitle.getText();
        }
    },
    getFirstTutorialResultDescription: {
        get: function () {
            return this.firstTutorialResultDescription.getText();
        }
    },
    isRelatedArticlesDisplayed: {
        get: function () {
            return this.relatedArticles.isDisplayed();
        }
    }
});

module.exports = TutorialsResultsDetailsPage;

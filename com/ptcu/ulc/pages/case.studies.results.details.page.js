/**
 * Created by dghan on 7/29/2016.
 */

'use strict';
var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var CaseStudiesResultsDetailsPage = function () {

};
CaseStudiesResultsDetailsPage.prototype = Object.create(headerFooter.prototype, {
    relatedArticles: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.relatedArticles));
        }
    },
    firstCaseStudyResultTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.firstCaseStudyResultTitle));
        }
    },

    firstCaseStudyResultDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.caseStudiesResultDetailsPage.firstCaseStudyResultDescription));
        }
    },
    getFirstCaseStudyResultTitle: {
        get: function () {
            return this.firstCaseStudyResultTitle.getText();
        }
    },
    getFirstCaseStudyResultDescription: {
        get: function () {
            return this.firstCaseStudyResultDescription.getText();
        }
    },
    isRelatedArticlesDisplayed: {
        get: function () {
            return this.relatedArticles.isDisplayed();
        }
    }
});

module.exports = CaseStudiesResultsDetailsPage;

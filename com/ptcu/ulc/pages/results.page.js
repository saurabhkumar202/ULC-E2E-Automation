/**
 * Created by dghan on 9/13/2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');


var ResultsPage = function () {
};

ResultsPage.prototype = Object.create(HeaderFooter.prototype, {

    noContentSection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.noContentMessage)).getText()
        }
    },


    tutorialsSection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.sectionTutorials))
        }
    },

    tutorialsHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.headerTutorials))
        }
    },

    tutorialsCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listTutorials)).count()
        }
    },
    tutorialsCountonSeeMorePage: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listTutorialsSeeMorePage)).count()
        }
    },

    tutorialsSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkTutorialsSeeMore))
        }
    },
    helpcenterSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkHelpCenterDocumentsSeeMore))
        }
    },
    knowledgebaseSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkReferenceDocumentsAndKnowledgeBaseSeeMore))
        }
    },

    selfPacedELearningSection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.sectionSelfPacedELearning))
        }
    },

    selfPacedELearningHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.headerSelfPacedELearning))
        }
    },

    selfPacedELearningCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listSelfPacedELearning)).count()
        }
    },

    selfPacedELearningSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkSelfPacedELearningSeeMore))
        }
    },

    referenceDocumentsAndKnowledgeBaseArticlesSection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.sectionReferenceDocumentsAndKnowledgeBase))
        }
    },

    referenceDocumentsAndKnowledgeBaseArticlesHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.headerReferenceDocumentsAndKnowledgeBase))
        }
    },

    referenceDocumentsAndKnowledgeBaseArticlesCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listReferenceDocumentsAndKnowledgeBase)).count()
        }
    },

    referenceDocumentsAndKnowledgeBaseArticlesSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkReferenceDocumentsAndKnowledgeBaseSeeMore))
        }
    },

    helpCenterDocumentsSection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.sectionHelpCenterDocuments))
        }
    },

    helpCenterDocumentsHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.headerHelpCenterDocuments));
        }
    },

    helpCenterDocumentsCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listHelpCenterDocuments)).count()
        }
    },

    helpCenterDocumentsSeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.lnkHelpCenterDocumentsSeeMore))
        }
    },

    getFirstCaseStudy: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCaseStudy))
        }
    },

    getFirstTutorial: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTutorial))
        }
    },
    getFirstTextTutorial: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTextTutorial))
        }
    },
    getLockedCourses: {},
    getFirstElearning: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstElearning))
        }
    },

    getFirstReferenceKBDoc: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstReferenceDocKB))
        }
    },

    getFirstReferenceKBDocHref: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstReferenceDocKBHref))
        }
    },

    getfirstReferenceDocKBTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstReferenceDocKB))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },

    getFirstHCDoc: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstHCDoc))
        }
    },

    getFirstHCDocTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstHCDoc))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },

    getFirstCFDoc: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCFDoc))
        }
    },

    getFirstCFDocTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCFDoc))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },

    getCaseStudy: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCaseStudy))
        }
    },

    getTutorial: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTutorial))
        }
    },

    getCaseStudyTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCaseStudy))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },

    getTutorialTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTutorial))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },
    getTextTutorialTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTextTutorial))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))

        }
    },

    getCaseStudyDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstCaseStudy))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultDescription))
        }
    },

    getTutorialDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTutorial))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultDescription))
        }
    },
    getTextTutorialDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstTextTutorial))
                .element(this.getLocator(locRepo.pageObjects.resultsPage.resultDescription))
        }
    },

    getElearningTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.resultsPage.firstElearning))
            //.element(this.getLocator(locRepo.pageObjects.resultsPage.resultTitle))
        }
    },

//Get all the title : UI
    getSwimLaneTitles: {
        value: function (dataType) {

            var configDataTypes = browser.params.dataType;
            var that = this;
            switch (dataType) {
                case configDataTypes.LEX_USE_CASE:
                    return element.all(that.getLocator(locRepo.pageObjects.resultsPage.listTitleCaseStudiesAndTalks)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
                case configDataTypes.LEX_TUTORIAL:
                    return element.all(that.getLocator(locRepo.pageObjects.resultsPage.listTitleTutorials)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
                case configDataTypes.PLMS_BROWSE:
                case configDataTypes.PLMS_SEARCH:
                    return element.all(that.getLocator(locRepo.pageObjects.resultsPage.listTitletopics)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
                case configDataTypes.ARTICLE:
                    return element.all(that.getLocator(locRepo.pageObjects.resultsPage.listTitleReferenceDocumentsAndKnowledgeBase)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
                case configDataTypes.HELP_CENTER:
                    return element.all(that.getLocator(locRepo.pageObjects.resultsPage.listTitleHelpCenterDocuments)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
                case configDataTypes.COMMUNITY:
                    return element.all(that.getLocator(locRepo.pageObjects.searchResultsPage.listTitleCommunityForumsAndPosts)).filter(function (element) {
                        return element.isDisplayed();
                    }).getText();
            }
        }
    },

//Get all the titles : API response
    getAPIResponseTitles: {
        value: function (dataType) {
            var deferred = protractor.promise.defer();
            var that = this;
            this.getCurrentHARDetails(that.fetchAPIType(dataType), 'content', function (responses) {
                var titles = [];
                responses.forEach(function (response) {
                    titles.push(that.fetchTitle(dataType, response));
                });
                deferred.fulfill(titles);
            });

            return deferred.promise;
        }
    },

    fetchTitle: {
        value: function (dataType, response) {

            var configDataTypes = browser.params.dataType;

            switch (dataType) {
                case configDataTypes.LEX_USE_CASE:
                    return response.content["Learning ExchangeDocs"].map(function (response) {
                        return response.Metadata.tutorial.title;
                    });
                case configDataTypes.LEX_TUTORIAL:
                    return response.content["courses"].map(function (response) {
                        return response.learning_object.originalJson.tutorial.title;
                    });
                case configDataTypes.PLMS_BROWSE:
                case configDataTypes.PLMS_SEARCH:
                    return response.content.courses.map(function (response) {
                        return response.title;
                    });
                case configDataTypes.ARTICLE:
                    return response.content["TS ArticlesDocs"].map(function (response) {
                        return response.Title;
                    });
                case configDataTypes.HELP_CENTER:
                    return response.content["Help CenterDocs"].map(function (response) {
                        return response.Title;
                    });
                case configDataTypes.COMMUNITY:
                    return response.content["CommunityDocs"].map(function (response) {
                        return response.Title;
                    });
            }
        }
    },

    getAPIDataCount: {
        value: function (dataType) {
            var deferred = protractor.promise.defer();
            var that = this;
            this.getCurrentHARDetails(that.fetchAPIType(dataType), 'content', function (responses) {
                var counts = [];
                responses.forEach(function (response) {
                    counts.push(that.fetchDataCount(dataType, response));
                });
                deferred.fulfill(counts);
            });

            return deferred.promise;
        }
    },

    fetchDataCount: {
        value: function (dataType, response) {
            var configDataTypes = browser.params.dataType;

            switch (dataType) {
                case configDataTypes.LEX_USE_CASE:
                    if (!response.content["Learning ExchangeDocs"])
                        throw new Error("\"Learning ExchangeDocs\" not present in API response");
                    var entries = response.content["Learning ExchangeDocs"] instanceof Array ? response.content["Learning ExchangeDocs"].length : 1;
                    if (entries == response.content["Learning Exchange Count"])
                        return entries;
                    return false;
                case configDataTypes.LEX_TUTORIAL:
                    if (!response.content["courses"])
                        throw new Error("\"courses\" not present in API response");
                    var entries = response.content["courses"] instanceof Array ? response.content["courses"].length : 0;
                    if (entries > 0)
                        return entries;
                    return false;
                case configDataTypes.PLMS_BROWSE:
                case configDataTypes.PLMS_SEARCH:
                    return response.content.courses.length;
                case configDataTypes.ARTICLE:
                    if (!response.content["TS ArticlesDocs"])
                        throw new Error("\"TS ArticlesDocs\" not present in API response");
                    var entries = response.content["TS ArticlesDocs"] instanceof Array ? response.content["TS ArticlesDocs"].length : 1;
                    if (entries == response.content["TS Articles Count"])
                        return entries;
                    return false;
                case configDataTypes.HELP_CENTER:
                    if (!response.content["Help CenterDocs"])
                        throw new Error("\"Help CenterDocs\" not present in API response");
                    var entries = response.content["Help CenterDocs"] instanceof Array ? response.content["Help CenterDocs"].length : 1;
                    if (entries == response.content["Help Center Count"])
                        return entries;
                    return false;
                case configDataTypes.COMMUNITY:
                    if (!response.content["CommunityDocs"])
                        throw new Error("\"CommunityDocs\" not present in API response");
                    var entries = response.content["CommunityDocs"] instanceof Array ? response.content["CommunityDocs"].length : 1;
                    if (entries == response.content["Community Count"])
                        return entries;
                    return false;
            }
        }
    }
});

module.exports = ResultsPage;
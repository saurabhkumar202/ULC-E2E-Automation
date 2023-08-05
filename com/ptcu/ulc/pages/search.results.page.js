/**
 * Created by pankumar on 22-06-2016.
 */

'use strict';
var locRepo = require('../resources/locatorRepository.json');
var ResultsPage = require('./results.page');


var SearchResultsPage = function () {

};

SearchResultsPage.prototype = Object.create(ResultsPage.prototype, {

    pageHeaderTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.searchResultsPage.pageHeaderTitle));
        }
    },
    //Community Locators and Functions
    communityHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.searchResultsPage.headerCommunityForumsAndPosts)).getText();
        }
    },
    communityResultCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.searchResultsPage.listTitleCommunityForumsAndPosts)).count();
        }
    },
    communitySeeMoreLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.searchResultsPage.lnkCommunityForumsAndPostsSeeMore));
        }
    },
    getCommunityDataCount: {
        value: function (cb) {
            this.getCurrentHARDetails(browser.params.apiType.FEDERATED_SEARCH, 'content', function (responses) {
                var count = [];
                responses.forEach(function (response) {
                    if (response.content["CommunityDocs"]) {
                        var entries = response.content["CommunityDocs"] instanceof Array ? response.content["CommunityDocs"].length : 1;
                        entries == response.content["Community Count"] ? count.push(entries) : count.push(false);
                    }
                });
                cb(count);
            })
        }
    },

    fetchAPIType: {
        value: function (dataType) {

            var dataTypes = browser.params.dataType;
            var apiTypes = browser.params.apiType;

            switch (dataType) {
                case dataTypes.LEX_USE_CASE:
                    return apiTypes.FEDERATED_LEX_USE_CASE;
                case dataTypes.LEX_TUTORIAL:
                    return apiTypes.UNIFIED_TUTORIAL_TOPIC;
                case dataTypes.PLMS_BROWSE:
                    return apiTypes.PLMS_BROWSE;
                case dataTypes.PLMS_SEARCH:
                    return apiTypes.UNIFIED_TUTORIAL_TOPIC_SEARCH;
                case dataTypes.ARTICLE:
                case dataTypes.HELP_CENTER:
                case dataTypes.COMMUNITY:
                    return apiTypes.FEDERATED_SEARCH;
                default:
                    throw new Error("Browse Invalid option : " + dataType);
            }
        }
    }
});

module.exports = SearchResultsPage;
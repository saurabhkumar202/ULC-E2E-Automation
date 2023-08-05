/**
 * Created by dghan on 7/14/2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var ResultsPage = require('./results.page');

var BrowseResultsPage = function () {
};

BrowseResultsPage.prototype = Object.create(ResultsPage.prototype, {
    getProductName: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.productName));
        }
    },
    productLabel: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.productLabel));
        }
    },
    getProductLabel: {
        get: function () {
            return this.productLabel.getAttribute('title').then(function (productLabel) {
                return productLabel;
            })
        }
    },
    communityHelpMessage: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.joinDiscussionButton));
        }
    },
    joinDiscussionButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.joinDiscussionButton));
        }
    },
    getJoinDiscussionLink: {
        get: function () {
            return this.joinDiscussionButton.getAttribute('href').then(function (communityLink) {
                return communityLink;
            });
        }
    },
    versionDropDown: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.productVersion));
        }
    },
    versionDropDownSelection: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.versionDropDownselection));
        }
    },
    versionDropDownList: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.versionDropDownElementsList));
        }
    },
    contentLanguage: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.contentLanguage));
        }
    },
    contentLanguageKorean: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.contentLanguageKorean));
        }
    },
    contentLanguageFrench: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.contentLanguageFR));
        }
    },
    contentLanguageEnglish: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.contentLanguageEnglish));
        }
    },
    contentLanguageIncludeEnglish: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.contentLanguageIncludeEnglish));
        }
    },
    //No Content Section
    noContentSectionBrowse: {
        get: function () {
            var elm = element(this.getLocator(locRepo.pageObjects.resultsPage.noContentMessage));
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.visibilityOf(elm), 25000);
            return elm.getText();
        }
    },
    getCommunityTextMessage: {
        get: function () {
            return this.communityHelpMessage.getText();
        }
    },
    getMessage: {
        get: function () {
            return findElements(this.getLocator(locRepo.pageObjects.browseResultsPage.productLebel));
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
                    return apiTypes.PLMS_SEARCH;
                case dataTypes.ARTICLE:
                    return apiTypes.FEDERATED_TA_BROWSE;
                case dataTypes.HELP_CENTER:
                    return apiTypes.FEDERATED_HC_BROWSE;
                // case dataTypes.COMMUNITY:
                //     return apiTypes.FEDERATED_CM_SEARCH;
                default:
                    throw new Error("Browse Invalid option : " + dataType);
            }
        }
    },

    getSelfPacedTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedSwimlaneLabel).getText());
        }
    },
    getSelfPacedAllContents: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedAllContents));
        }
    },
    getSelfPacedPLMSContentsWithoutAccess: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedPLMSContentsWithoutAccess));
        }
    },
    getSelfPacedIoTUContents: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedIoTUContents));
        }
    },
    getSelfPacedLockIcons: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedSwimlaneKeyIcon));
        }
    },
    getSelfPacedSeeMore: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.SelfPacedSeeMore));
        }
    },
    clickBrowseProduct: {
        value: function(linkToClick){
            //console.log('//a[text()="' + linkToClick + '"]/@href');
            element(by.xpath('//a[text()="' + linkToClick + '"]')).click();
        }
    }

});

module.exports = BrowseResultsPage;
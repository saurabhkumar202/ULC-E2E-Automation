/**
 * Created by bgupta on 08-09-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var helper = require('../utils/helper.js');

var TunerPage = function () {
};

TunerPage.prototype = Object.create(headerFooter.prototype, {

    tunerIcon: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tunerWindow.tunerIcon));
        }
    },

    clickTunerIcon: {
        value: function () {
            return this.tunerIcon.click();
        }
    },

    tunerSearchField: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tunerWindow.tunerSearch));
        }
    },

    tunerSearch: {
        value: function (tunerKeyword) {
            return this.tunerSearchField.sendKeys(tunerKeyword);
        }
    },
    commandTable: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tunerWindow.commands)).getText();
        }
    },
    clickCommand: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tunerWindow.commands)).click();
        }
    },
    getExternalTunerIcon: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.externalTunerIcon)).first();
        }
    },
    clickExternalTunerIcon: {
        get: function () {
            return this.getExternalTunerIcon.click();
        }
    },
    editCstmRecommendation: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.editCstmRecommendation)).first();
        }
    },
    clickEditCstmRecommendation: {
        get: function () {
            return this.editCstmRecommendation.click();
        }
    },
    editStdRecommendation: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.editStdRecommendation)).first();
        }
    },
    clickEditStdRecommendation: {
        get: function () {
            return this.editStdRecommendation.click();
        }
    },
    findCommandInList: {
        value: function (map) {
            element.all(this.getLocator(locRepo.pageObjects.tunerWindow.commands)).filter(function (command) {
                return command.getText().then(function (text) {
                    return text == map;
                })
            }).click();
        }
    },
    courseMapped: {
        value: function () {
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.courseMappedList)).first();
        }
    },
    verifyCourseMapped: {
        value: function () {
            return this.courseMapped().isDisplayed();
        }
    },
    getCountOfCourseMapped:{
        get: function(){
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.courseMappedList)).count();
        }
    },
    isNoRecommendationsMessageDisplayed: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.noRecommendationsMessage)).isDisplayed();
        }
    },
    clickCourseMapped: {
        value: function () {
            return this.courseMapped().click();
        }
    },
    courseExitButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.backToULC));
        }
    },

    coursePTCLinkInHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.coursePTCLinkInHeader)).getText();
        }
    },
    coursePTCLinkInFooter: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.coursePTCLinkInFooter)).getText();
        }
    },
    verifyCoursePTCLinkInHeader: {
        get: function () {
            return this.coursePTCLinkInHeader.getText();
        }
    },
    verifyCoursePTCLinkInFooter: {
        get: function () {
            return this.coursePTCLinkInFooter.getText();
        }
    },
    courseTitleInHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.courseTitleInHeader)).getText();
        }
    },
    courseTitleInTree: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.courseTitleInTree)).getText();
        }
    },
    bookmarkIcon: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.bookmarkIcon));
        }
    },
    verifyBookmarkIcon: {
        get: function () {
            return this.bookmarkIcon.isDisplayed();
        }
    },
    courseModules: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.courseViewer.courseModules)).first();
        }
    },
    markCourseComplete: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.markCourseComplete));
        }
    },
    verifyMarkCourseComplete: {
        get: function () {
            return this.markCourseComplete.isDisplayed();
        }
    },

    tunerWindowPTCTitle: {
        value: function () {
          //  this.clearFocus();
            return element(this.getLocator(locRepo.pageObjects.tuner.ptcHeader)).getText();
        }
    },
    tnrWdwCurrCustomizing: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.currentlyCustomizing)).getText();
        }
    },
    saveTitleBtn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.saveTitleButton));
        }
    },
    titleTxt: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.mappingTitleTextBox));
        }
    },
    setCommandTitle: {
        value: function (commandTitle) {
            this.titleTxt.clear();
            this.titleTxt.sendKeys(commandTitle);
            this.saveTitleBtn.click();
        }
    },
    selectCategory: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.selectCtgDrpdwn)).click();
        }
    },
    selectTWXInCtgDrpdwn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.selectTWXInCtgDrpdwn)).click();
        }
    },
    selectProductInCtg: {
        value: function () {
            this.selectCategory.then(function (product) {
                product.selectProductInCtg();
            })
        }
    },
    selectVersion: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.selectVrsnDrpdwn)).click();
        }
    },
    select6_5InVrsn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tuner.selectVrsn6_5)).click();
        }
    },
    selectVrsnInDrpdwn: {
        value: function () {
            return this.selectVersion.then(function (vrsn) {
                vrsn.select6_5InVrsn();
            })
        }
    },
    //This needs to change once we have image upload working
    getUrlSource: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tunerWindow.urlSource));
        }
    },

    getUrlTitle: {
        value: function (expectedURLTitle) {

            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle));

        }
    },
    getUrlDesc: {
        value: function (expectedURLTitle) {

            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.urlDesc));

        }
    },
    getRefreshRecommendations: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.refreshRecommendation)).get(0);
        }
    },
    clickRefreshRecommendations: {
        get: function () {
            //helper.scrollIntoView(element.all(this.getLocator(locRepo.pageObjects.tunerWindow.refreshRecommendation)).get(0));
            return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.refreshRecommendation)).get(0).click();
        }
    },
    verifyEditIcon: {
        value: function (expectedURLTitle) {
            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.editUrl));
            //return element.all(this.getLocator(locRepo.pageObjects.tunerWindow.editUrl)).first();
        }

    },
    verifyDeleteUrl: {
        value: function (expectedURLTitle) {
            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.deleteUrl));
        }

    },
    clickDeleteUrl: {
        value: function () {
            var that = this;
            var parentElement = element(this.getLocator(locRepo.pageObjects.tunerWindow.deleteUrlAlertBox));
            return parentElement.element(that.getLocator(locRepo.pageObjects.tunerWindow.deleteUrlAlertOption));
        }

    },
    getExternalURLTitles: {
        value: function () {
            var that = this;
            return element.all(that.getLocator(locRepo.pageObjects.recommendations.externalURLList)).map(function (extUrl) {
                return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText();
            });
        }
    },
    btnMoveUp: {
        value: function (expectedURLTitle) {
            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.moveUpExtUrl));
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList))
                .element(this.getLocator(locRepo.pageObjects.tunerWindow.moveUpExtUrl));
        }
    },
    btnMoveDown: {
        value: function (expectedURLTitle) {
            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.moveDownExtUrl));
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList))
                .element(this.getLocator(locRepo.pageObjects.tunerWindow.moveDownExtUrl));
        }
    },
    isMoveDisabled: {
        value: function (elm) {
            return elm.getAttribute('class').then(function (classVal) {
                return /disabled/.test(classVal);
            });
        }
    },
    moveExternalURLByTitle: {
        value: function (titleToBeMoved, direction) {
            var that = this;
            var moveButtonLocator = direction === "up" ? locRepo.pageObjects.tunerWindow.moveUpExtUrl :
                locRepo.pageObjects.tunerWindow.moveDownExtUrl;
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                    return title === titleToBeMoved;
                });
            }).first().element(that.getLocator(moveButtonLocator)).click();
        }
    },
    deleteExternalURLByTitle: {
        value: function (titleToBeDeleted) {
            var that = this;
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                    return title === titleToBeDeleted;
                })
            }).first().element(that.getLocator(locRepo.pageObjects.tunerWindow.deleteUrl)).click();
        }
    },
    getTitleOfMappedCourse: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.plmstunerwindow.selectFirstTitleForMap)).get(0).getText();
        }
    },
    clickMappingContent: {
        value: function (lnkText) {
           // return this.getTitleOfMappedCourse.click();
            return element(this.getLocator({
                "method": "linkText",
                "value": lnkText
            })).click();
        }
    },
    getFirstCourseTitleForMapping:{
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.plmstunerwindow.getTitleCourseForMap)).get(0);
        }
    },

    selectFirstCourseForMapping: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.plmstunerwindow.selectFirstCourseForMap)).get(0).click();
        }
    },
    clickOnAddAndContinue: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.btnAddAndContinue)).click();
        }
    },
    getFirstCourseTitleMapped:{
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.courseTitleOfMappedContent)).last().getText();
        }
    },
    getTitleMappedToCommand:{
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.recommendations.titleMappedToCommand)).getText();
        }
    },
    clearMapping:{
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.btnClearMapping)).click();
        }
    },
    deleteRecommendations:{
        value: function (titleToBeDeleted) {
            var that = this;
            return element.all(this.getLocator(locRepo.pageObjects.resultsPage.listSelfPacedELearning)).filter(function (extUrl) {
                return extUrl.element(that.getLocator(locRepo.pageObjects.recommendations.courseTitleOfMappedContent)).getText().then(function (title) {
                    return title === titleToBeDeleted;
                })
            }).first().element(that.getLocator(locRepo.pageObjects.recommendations.deleteIcon)).click();
        }
    },
    deleteCustomRecommendations:{
        value: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.deleteIcon)).last().click()
        }
    }
});

module.exports = TunerPage;

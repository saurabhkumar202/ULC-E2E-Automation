/**
 * Created by mbenur on 27-04-2018.
 */

'use strict';

var locRepo = require('../../resources/locatorRepository.json');
var HeaderFooter = require('../../pages/header.footer.page.js');
var myLearningData = require('../../resources/myLearningData.json');
var Helper = require('../../utils/helper.js');
var helper = new Helper();


var myEnrollmentPage = function () {

};

myEnrollmentPage.prototype = Object.create(HeaderFooter.prototype, {
    getMyLearningLabel: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.myEnrollment.myLearningLabel)).getText();
        }
    },
    selectCompletedTab: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.myEnrollment.completedLearning));
        }
    },
    selectEnrollementsTab: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.myEnrollment.enrollmentsLearning));
        }
    },
    learningItems: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.myEnrollment.enrollmentTabLearningItemTitles));
        }
    },
    verifyElearningCourse: {
        value: function (eLearningCourse) {
            var learningType = myLearningData.learningTypes.eLearningCourse.type;
            return this.learningItems.filter(function (learningItem) {
                return learningItem.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (learningItem) {
                return learningItem.getText().then(function (learningItemName) {
                        return learningItemName == (eLearningCourse);
                });
            }).first().element(by.xpath('./../dl[1]/dd')).getText().then(function (res) {
                return res == (learningType);
            });
        }
    },
    verifyAssessment: {
        value: function (assessment) {
            var learningType = myLearningData.learningTypes.assessment.type;
            return this.learningItems.filter(function (learningItem) {
                return learningItem.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (learningItem) {
                return learningItem.getText().then(function (learningItemName) {
                    return learningItemName == (assessment);
                });
            }).first().element(by.xpath('./../dl[1]/dd')).getText().then(function (res) {
                return res == (learningType);
            });
        }
    },
    completeElearningCourse: {
            value: function (eLearningCourse) {
                this.learningItems.filter(function (learningItem) {
                    return learningItem.isDisplayed().then(function (val) {
                        return val;
                    })
                }).filter(function (learningItem) {
                    return learningItem.getText().then(function (learningItemName) {
                        return learningItemName == (eLearningCourse);
                    });
                }).first().element(by.xpath('./../nav/button')).click();

                var that = this;

                helper.runOnNonAngular(function () {
                    browser.sleep(15000);
                    element(that.getLocator(locRepo.pageObjects.myEnrollment.MarkComplete)).click().then(function ()
                    {
                        browser.sleep(10000);
                        element(that.getLocator(locRepo.pageObjects.myEnrollment.CloseCourseViwer)).click();
                    });
                });
            }
    },
    completeAssessment: {
        value: function (assessment) {

            var wHandle = "";
            var learningType = myLearningData.learningTypes.assessment.type;

            browser.getWindowHandle().then(function (winHandle){
                wHandle = winHandle;
                console.log("window handle :" + wHandle);
            });
            this.learningItems.filter(function (learningItem) {
                return learningItem.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (learningItem) {
                return learningItem.getText().then(function (learningItemName) {
                    return learningItemName == (assessment);
                });
            }).first().element(by.xpath('./../nav/button')).click();

            var that = this;

            helper.runOnNonAngular(function ()
            {
                browser.sleep(6000);
                browser.getAllWindowHandles().then(function (handles) {
                    browser.switchTo().window(handles[1]);
                    element(that.getLocator(locRepo.pageObjects.myEnrollment.startOrResumeAssessmentBtn)).click();
                    browser.sleep(5000);
                    element(that.getLocator(locRepo.pageObjects.myEnrollment.submitAssessment)).click().then(function () {
                        browser.sleep(5000);
                        element(that.getLocator(locRepo.pageObjects.myEnrollment.confirmSubmission)).click();
                        browser.sleep(5000);
                    });
                    browser.switchTo().window(handles[0]);
                });
            });
        }
    }
});

module.exports = myEnrollmentPage;
/**
 * Created by saukumar on 07-11-2017.
 */
'use strict';

var locRepo = require('../../resources/locatorRepository.json');
var BrowseResultsPage = require('../../pages/browse.results.page');
var browseResultsPage = new BrowseResultsPage();
var BrowseLXResultsPage = function () {
};
BrowseLXResultsPage.prototype = Object.create(BrowseResultsPage.prototype);

BrowseLXResultsPage.prototype.banner = function () {
    var that = this;
    return {
        getCoursesCount: function () {
            return element.all(that.getLocator(locRepo.pageObjects.browseResultsPage.LXCourses)).count();
        },
        getHeaderLink: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseHeaderLink)).getAttribute('href');
        },
        getHeaderInfo: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage)).getText();
        },
        getSwimLaneLabel: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.LXCourseSwimLaneLabel)).getText();
        },
        getSwimLaneLink: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseSwimLaneLink)).getAttribute('ng-href');
        },
        getCourseIcon: function () {
            var getBeforeContent = browser.executeScript("return window.getComputedStyle(document.querySelector('#eLearningList > li:nth-child(1)'),':before').getPropertyValue('content')");
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
        ValidateACourse: function () {
            element.all(that.getLocator(locRepo.pageObjects.browseResultsPage.LaunchIoTUCourse)).first().click();
            var temp = (element.all(By.css('#eLearningList li[ng-repeat=\'course in iotuCourseCtrl.courses\'] a')).first()).getAttribute('ng-href');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]);
            });
            return browser.executeScript('return location.href');

        },
        closeLXPage: function () {
            browser.executeScript('window.close()');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[0]);
            });
        },
        getIncludeEnglishCourses: function () {
            that.scrollTo(browseResultsPage.contentLanguage).then(function () {
                browseResultsPage.contentLanguage.click();
            });
            browseResultsPage.contentLanguageFrench.click();
            browseResultsPage.contentLanguage.click();
            browseResultsPage.contentLanguageIncludeEnglish.click();

        },
        clickRandomVersion: function () {
            that.scrollTo(browseResultsPage.versionDropDown).then(function () {
                browseResultsPage.versionDropDown.click().then(function () {
                    element.all(that.getLocator(locRepo.pageObjects.browseResultsPage.versionDropDownElementsList)).filter(function (checkbox, index) {
                        if (Math.random() < 0.6) {
                            return Math.floor(Math.random() * 10);
                        }

                    }).first().click();
                });
            })

        }
    }
}
module.exports = BrowseLXResultsPage;
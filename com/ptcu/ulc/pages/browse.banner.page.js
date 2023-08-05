/**
 * Created by saukumar on 07-11-2017.
 */
//This is browse banner page
'use strict';

var locRepo = require('../resources/locatorRepository.json');
var BrowseResultsPage = require('./browse.results.page');
var browseResultsPage = new BrowseResultsPage();
var BrowseBannerResultsPage = function () {
};
BrowseBannerResultsPage.prototype = Object.create(BrowseResultsPage.prototype);

BrowseBannerResultsPage.prototype.banner = function () {
    var that = this;
    return {
        getCoursesCount: function () {
            return element.all(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourses)).count();
        },
        getHeaderLink: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseHeaderLink)).getAttribute('href');
        },
        getHeaderInfo: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseHeaderInfo)).getText();
        },
        getSwimLaneLabel: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseSwimLaneLabel)).getText();
        },
        getSwimLaneLink: function () {
            return element(that.getLocator(locRepo.pageObjects.browseResultsPage.IoTUCourseSwimLaneLink)).getAttribute('ng-href');
        },
        getCourseIcon: function () {
            var getBeforeContent = browser.executeScript("return window.getComputedStyle(document.querySelector('li[title=\"Course\"]'),':before').getPropertyValue('content')");
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
            var temp = (element.all(By.css('#eLearningList li[title=\'Course\'] a')).first()).getAttribute('ng-href');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]);
            });
            return browser.executeScript('return location.href');

        },
        closeIoTUPage: function () {
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
            that.scrollTo(browseResultsPage.versionDropDown);
            browseResultsPage.versionDropDown.click();
            // element(that.getLocator(locRepo.pageObjects.browseResultsPage.versionDropDownElementsList)).click();
            element.all(that.getLocator(locRepo.pageObjects.browseResultsPage.versionDropDownElementsList)).filter(function (checkbox, index) {
                return checkbox.getText().then(function (text) {
                    return (text !== 'All Versions' && Math.floor(Math.random() * 10) > 2);
                })

            }).first().click();

        }

    }
}
module.exports = BrowseBannerResultsPage;
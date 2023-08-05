/**
 * Created by saukumar on 13-02-2018.
 */
'use strict';
var LandingPage = require('../../pages/landing.page.js');

var locRepo = require('../../resources/locatorRepository.json');

var ILEDetailPage = function () {
};
ILEDetailPage.prototype = Object.create(LandingPage.prototype, {

    getILETitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.ILECourseTitle)).getText();
        }
    },

    getILETitleDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.ILECourseDescription)).getText();
        }
    },

    getParentTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.ParentLX)).getText();
        }
    },
    getInstructorImage: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.InstructorImage)).getAttribute('ng-src');
        }
    },
    getTrailerVideo: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.TeaserVideo)).getAttribute('ng-src');
        }
    },
    getLinkToStartLearning: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.StartLearningLink)).getText();
        }
    },
    getSyllabus: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.Syllabus)).getText();
        }
    },
    availableFormatHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.AvailableFormatHeader)).getText();
        }
    },
    ListOfAvailableFormats: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.AvailableFormatList));
        }
    },
    TypeOfAvailableFormats: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.TypeOfAvailableFormats));
        }
    },
    LaunchAnILEButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.LaunchILEButton))
        }
    },

    LaunchAnILEFromILEModal:{
      get:function(){
          return element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.LaunchILEButtonFromModal))
      }
    },
    findILEPackage: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.findILE))
        }
    },
    getContentTitle:{
        get:function(){
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.ILEDetailPage.getContentTitle))
        }
    }


});

module.exports = ILEDetailPage;
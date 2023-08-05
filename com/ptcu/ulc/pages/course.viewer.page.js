/**
 * Created by dghan on 23-08-2016.
 */

'use strict';
var locRepo = require('../resources/locatorRepository.json');

var HeaderFooter = require('./header.footer.page.js');

var CourseViewer = function () {

};

CourseViewer.prototype = Object.create(HeaderFooter.prototype, {

    courseTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.courseTitle));
        }
    },
    backToULC: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.backToULC));
        }
    },
    nextTopic: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.courseViewer.nextTopic));
        }
    },
    getCourseTitle: {
        get: function () {
            return this.courseTitle.getText().then(function (title) {
                //  console.log("on course viewer"+title);
                return title;
            });


        }
    },

});

module.exports = CourseViewer;
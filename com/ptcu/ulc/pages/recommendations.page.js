/**
 * Created by tdhir on 06-01-2017.
 */
'use strict';

var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');

var RecommendationPage = function () {
};

RecommendationPage.prototype = Object.create(headerFooter.prototype, {

    getFeaturedLearningHeader: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.recommendations.featuredLearningTitle));
        }
    },
    countFeaturedLearning: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.listFeaturedLearning)).count();
        }
    },
    seeMoreFeaturedLearning: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.recommendations.seemoreFeaturedLearningSection));
        }
    },
    getRecommendationTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.recommendations.recommendationTitle)).getText();
        }
    },
    getVideoHeader: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(1).getText().then(
                function (header) {
                    return header == "Tutorials";
                }
            );
        }
    },
    getVideoList: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.videoList)).count().then(
                function (count) {
                    return count > 0;
                }
            );
        }
    },
    getElearningHeader: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(2).getText().then(
                function (header) {
                    return header == "eLearning Topics";
                }
            );
        }
    },
    getElearningList: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.elearningList)).count().then(
                function (count) {
                    return count > 0;
                }
            );
        }
    },
    getExternalURLHeader: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(0).getText().then(
                function (header) {
                    return header == "External URLs";
                }
            );
        }
    },
    getExternalURLList: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).count().then(
                function (count) {
                    return count > 0;
                }
            );
        }
    },
    countExternalURLList: {
        value: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).count().then(
                function (count) {
                    if (count == 0)
                        count = 0;
                    return count;
                }
            );
        }
    }
});

module.exports = RecommendationPage;

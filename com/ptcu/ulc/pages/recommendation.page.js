/**
 * Created by tdhir on 06-01-2017.
 */
'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var RecommendationPage = function () {
};

RecommendationPage.prototype = Object.create(HeaderFooter.prototype, {

    getFeaturedLearningHeader: {
        get: function () {
            expect(element(this.getLocator(locRepo.pageObjects.recommendations.featuredLearningTitle)).getText()).toBe("Featured Recommendations");
            return element(this.getLocator(locRepo.pageObjects.recommendations.featuredLearningTitle));

        }
    },
    countFeaturedLearning: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.listFeaturedLearning)).count();
        }
    },
    eLearningTopic: {
        get: function () {
            //expect(element(this.getLocator(locRepo.pageObjects.recommendations.eLearningTopicTitle)).getText()).toBe("Introduction to the ThingWorx Composer");
            //return element(this.getLocator(locRepo.pageObjects.recommendations.eLearningTopicTitle));
            expect(element(this.getLocator(locRepo.pageObjects.recommendations.eLearningTopicTitle)).getText()).toBe("Course");
            expect(element(this.getLocator(locRepo.pageObjects.recommendations.eLearningProduct)).getText()).toBe("ThingWorx");
        }
    },
    countLearning: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.eLearningTopicTitle)).count();
        }
    },
    additionalRecourse: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.addtionalResource));
        }
    },
    countAdditionalRecourse: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.addtionalResource)).count();
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
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(0).getText().then(
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
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(1).getText().then(
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
            return element.all(this.getLocator(locRepo.pageObjects.recommendations.recommendationHeader)).get(2).getText().then(
                function (header) {
                    return header == "Additional Resources";
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
    },

    countOfAddedExternalURLList: {
        value: function (expectedURLTitle) {

            var that = this;
            if (expectedURLTitle)
                return element.all(this.getLocator(locRepo.pageObjects.recommendations.externalURLList)).filter(function (extUrl) {
                    return extUrl.element(that.getLocator(locRepo.pageObjects.tunerWindow.urlTitle)).getText().then(function (title) {
                        return title === expectedURLTitle;
                    });
                }).count();
        }
    },
    backToRecommendation: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.recommendations.backToRecommendation));
        }
    },
    getFirstElearningTitle: {
        get: function () {
            browser.sleep(5000);
            return element(this.getLocator(locRepo.pageObjects.elearningRecommendations.elearningTitle));
        }
    },
    getFirstElearningInfo: {
        value: function () {
            var parent = element.all(this.getLocator(locRepo.pageObjects.recommendations.elearningList));
            return parent.element(this.getLocator(locRepo.pageObjects.elearningRecommendations.elearningProductVersionInfo)).first();

        }
    }

});

module.exports = RecommendationPage;

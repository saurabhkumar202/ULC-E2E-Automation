/**
 * Created by rdewangan on 08-12-2016.
 */
"use strict"

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('../pages/header.footer.page');

var TutorialSeeMorePage = function () {

};

TutorialSeeMorePage.prototype = Object.create(HeaderFooter.prototype, {
    getProductName: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.productNameOnSeeMore));
        }
    },
    getSeeMorePageBtn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.btnSeeMore));
        }
    },
    clickSeeMorePageBtn: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.btnSeeMore)).click();
        }
    },
    getCheckedVersionsList: {
        value: function () {
            var that = this;
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).filter(function (version) {
                return version.element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsCheckedCheckbox)).isSelected();
            }).getText();
        }
    },
    clickProductList: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.listProduct)).click();
        }
    },

    clickShowAllProduct: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.showAllProduct)).click();
        }
    },
    clickProductVersion: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.listProductVersion)).click();
        }
    },
    getWhatsNewCheckBox: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.checkboxWhatsNew));
        }

    },
    getTutorialTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.seeMore.contentTitle));
        }

    },
    getFirstTutorial: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.seeMore.content));
        }

    },
    clickWhatsNewCheckBox: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.checkboxWhatsNew)).click();
        }
    },
    seeMoreContentType: {
        value: function () {
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.contentType)).getText()).toBe("Content type");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.radioContentTypeElearning)).getText()).toBe("Self-paced eLearning");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.radioContentTypeTutorials)).getText()).toBe("Tutorials");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.contentTypeTitleTutorial)).getText()).toBe("Tutorials");
        }
    },
    selectContentTypeLearning: {
        value: function () {
            element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.radioElearning)).click();
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.contentTypeTitleLearning)).getText()).toBe("Self-paced eLearning");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.productTitle)).getText()).toBe("Product");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.versionTitle)).getText()).toBe("Version");
            expect(element(this.getLocator(locRepo.pageObjects.tutorialSeeMore.createdByTitle)).getText()).toBe("Created by");
        }
    }


});

module.exports = TutorialSeeMorePage;




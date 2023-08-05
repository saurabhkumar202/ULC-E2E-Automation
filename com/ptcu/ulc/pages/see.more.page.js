/**
 * Created by saukumar on 29-07-2017.
 */


/**
 * Created by saukumar on 10-07-2017.
 */
"use strict";

var locRepo = require('../resources/locatorRepository.json');
var BrowseResultsPage = require('../pages/browse.results.page');
var headerFooter = require('./header.footer.page.js');

function NewSeeMore() {
};

NewSeeMore.prototype = Object.create(headerFooter.prototype);

NewSeeMore.prototype.facets = function () {
    var that = this;

    return {
        clearCurrentProduct: function () {
            return that.scrollTo(element(that.getLocator(locRepo.pageObjects.seeMore.product.facetProductHeader))).then(function () {
                return element(that.getLocator(locRepo.pageObjects.seeMore.product.clearCurrentProduct)).click();
            });
        },
        getCurrentProduct: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.product.getCurrentProduct));
        },
        RandomProduct: function () {

        },
        getProducts: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.product.facetsProductsList));
        },
        getVersions: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.version.facetsVersionsList)).getText();
        },
        getVersionDiv: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.VersionDiv)).getAttribute("aria-hidden");
        },
        TutorialContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.Tutorial));
        },

        ELearningContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.ELearning));
        },

        getVersion: function () {
            return element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).getText();
        },
        ReferenceDocumentsContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.ReferenceDocuments));
        },
        HelpCenterDocumentsContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.HelpCenterDocuments));

        },
        /* getContentTypeList: function () {
         },*/
        ContentLanguage: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentLanguages));
        },
        /*getContentLanguagesList: function () {
         },*/
        getCheckedProductsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsProductsList)).filter(function (product) {
                return product.element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsProductsCheckbox)).isSelected();
            }).getText();
        },
        viewAllVersions: function () {
            that.scrollTo(element(that.getLocator(locRepo.pageObjects.seeMore.version.facetsVersionsHeader))).then(function () {
                element(that.getLocator(locRepo.pageObjects.seeMore.version.allVersions)).isDisplayed().then(function (flag) {
                    if (flag)
                        element(that.getLocator(locRepo.pageObjects.seeMore.version.allVersions)).click();
                });

            });

        },
        getCheckedVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.version.facetsVersionsCheckedCheckbox)).getText();
        },
        getProductInformation: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.ProductInfolist)).getText();
        },
        getVersionInformation: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.productVersionInfoList)).getText();
        },
        getALLContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.AllContentType))
        },
        getCheckedContentType: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentType.SelectedContentType))
        },
        getCheckedContentLanguage: function () {
            return element(that.getLocator(locRepo.pageObjects.seeMore.contentLanguages.selectedContentLanguage));
        },
        clickViewAllProducts: function () {
            element(that.getLocator(locRepo.pageObjects.seeMore.product.viewAllProducts)).click();
        },
        clickRandomFamily: function () {

            var eleme = element.all(that.getLocator(locRepo.pageObjects.seeMore.product.listFamilies)).filter(function (elem, index) {
                return Math.floor(Math.random() * 10) >= 2;
            }).first();
            var eleme2 = element.all(that.getLocator(locRepo.pageObjects.seeMore.product.listProducts)).filter(function (elem, index) {
                return Math.floor(Math.random() * 10) >= 0;
            }).first();
            eleme.click().then(function () {
                eleme2.click();
            });
        },
        clickRandomVersion: function () {
            // that.scrollTo(element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsHeader)));
            // var versionsList = element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList));
            that.scrollTo(element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsHeader)));
            element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.facetsVersionsList)).filter(function (checkbox, index) {
                return (Math.floor(Math.random() * 10) > 2);

            }).first().click();
        },

        clickCreoFamilyProductVersion: function () {

            that.scrollTo(element(that.getLocator(locRepo.pageObjects.seeMore.product.productFamilyCreo)));
            browser.waitForAngular();
            return element(that.getLocator(locRepo.pageObjects.seeMore.product.productFamilyCreo)).click().then(function () {

                return element(that.getLocator(locRepo.pageObjects.seeMore.product.productCreo)).click().then(function () {

                    return element(that.getLocator(locRepo.pageObjects.seeMore.version.selectedVersionCreo3)).click()
                })
            })
        }


    };

};
NewSeeMore.prototype.content = function () {
    var that = this;
    return {
        getCountSeeMore: function () {
            return element.all(that.getLocator(locRepo.pageObjects.seeMore.content)).count();
        },
        clickSeeMore: function () {
            var seeMore = element(that.getLocator(locRepo.pageObjects.eLearningSeeMore.btnSeeMore));
            return seeMore.isDisplayed().then(function (flag) {
                if (flag) {
                   return seeMore.click().then(function(){
                       browser.sleep(5000);
                       //browser.waitForAngular();
                       return true;
                    });

                }
                else return false;
            });
        },
        getVersionsList: function () {
            return element.all(that.getLocator(locRepo.pageObjects.eLearningSeeMore.coursesVersionsList)).getText();
        }
    }

};

NewSeeMore.prototype.grayRibbonInfo = function () {
    return element(this.getLocator(locRepo.pageObjects.browseResultsPage.productNameOnSeeMore)).getText();
};
module.exports = NewSeeMore;
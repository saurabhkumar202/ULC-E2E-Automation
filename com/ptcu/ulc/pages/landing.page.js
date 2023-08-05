/**
 * Created by pankumar on 16-06-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');
var results = require('./browse.results.page.js');
var LandingPage = function () {

};
LandingPage.prototype = Object.create(HeaderFooter.prototype, {

    getIoTUCoursesCount: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.IoTUCourses)).count();
        }
    },

    ValidateACourse: {
        get: function () {
            element.all(this.getLocator(locRepo.pageObjects.landing.IoTUCourses)).first().click();
            browser.getAllWindowHandles().then(function (handles) {
                if(!(handles.length >= 2))
                {
                    browser.sleep(5000);
                }
                browser.switchTo().window(handles[1]);
            });
            return browser.executeScript('return location.href');
        }
    },

    btnHomeSearchBar: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.btnHomeSearchBar));
        }
    },
    browseContentButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.browseButton));
        }
    },
    isBrowseContentButtonDisplayed: {
        get: function () {
            return this.browseContentButton.isDisplayed();
        }
    },
    homeSearchBar: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.headerSearchBar));
        }
    },
    homeSearchBarButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.homeSearchBarButton));
        }
    },


    isSearchBoxDisplayed: {
        get: function () {
            return this.homeSearchBar.isDisplayed();
        }
    },

    productFamily: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.productFamily));
        }
    },

    getProduct: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.product1));
        }
    },

    learningExperience: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.LearningExperience));
        }
    },
    learningExperienceDescription: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.LearningExperienceDescription));
        }
    },

    firstProduct: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.firstProduct));
        }
    },
    getCountOfTiles: {
        get: function () {
            return this.productFamily.filter(function (prodFamily, index) {
                return prodFamily.isDisplayed().then(function (value) {
                    return value;
                });
            }).count();
        }
    },
    clickFirstProductTile: {
        get: function () {

        }
    },
    getVisibleProducts: {
        get: function () {
            return this.productFamily.filter(function (prodFamily) {
                return prodFamily.isDisplayed().then(function (val) {
                    return val;
                })
            })
        },
    },
    browseProductThingworx: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.browseThingworx)).click();
        }
    },
    browseProductCreo: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.browseResultsPage.browseCreo)).click();
        }
    },
    expectedProductURL: {
        value: function (productName) {
            return this.getExpectedUrl();
        }
    },
    /*getProductDetails: {
        get: function () {

            var that = this;
            return this.productFamily.filter(function (prodFamily) {
                return prodFamily.isDisplayed().then(function (val) {
                    return val;
                });
            }).map(function (prodFamily) {
                return prodFamily.element(by.tagName('a')).getAttribute('href').then(function (productHref) {
                    return prodFamily.element(by.tagName('a')).getText().then(function (productName) {
                        var expectedUrl = that.expectedProductURL(productName);
                        return {
                            'product': productName, 'prodHref': productHref,
                            'expectedURL': expectedUrl
                        };
                    })
                });
            });
        }
    },*/
    getProductDetails: {
        get: function () {

            var that = this;
            //element.all(by.css('.filter-options ul li')).map(function (elm, index){
              //  elm.click().then(function())

            //}

            return element.all(by.css('.filter-options ul li')).map(function (elm, index){
                return elm.click().then(function () {
                    browser.waitForAngular();
                    return that.getProduct.filter(function (product) {
                        return product.isDisplayed().then(function (val) {
                            //console.log("getlinks" + val);
                            return val;
                        })
                    }).map(function (products) {
                        return products.element(by.tagName('a')).getAttribute('href').then(function (productHref) {
                            //console.log(productHref);
                            return productHref;
                        });
                    });
                });
            });
        }
    },

    enterAndSearchKeyword: {
        value: function (keyword) {
            var that = this;
            this.homeSearchBar.sendKeys(keyword).then(function (value) {
                console.log(value);
                that.btnHomeSearchBar.click();
            })
        }
    },

    clickOnGivenProduct:{
        value: function(productFamily, productName) {
            var EC = protractor.ExpectedConditions;
            var that = this;
            return this.clickOnGivenProductFamily(productFamily).then(function () {
                browser.waitForAngular();
               var selProduct =  that.getProduct.filter(function (LX) {
                    return LX.isDisplayed().then(function (val) {
                        //console.log("getlinks" + val);
                        return val;
                    })
                }).filter(function (LXlink) {
                    //console.log("LXlink" + LXlink);
                    return LXlink.element(by.tagName('a')).getAttribute('href').then(function (productHref) {
                        //console.log(productHref);
                        if(productHref.match('/' + productName.toLowerCase() + '/'))
                        {
                            return LXlink;
                        }
                    });
                }).first().click();
            })
        }
    },
    clickOnGivenProductFamily: {
        value: function (productName) {
            var EC = protractor.ExpectedConditions;
            return this.productFamily.filter(function (prodFamily) {
                return prodFamily.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (prodLink) {
                return prodLink.getText().then(function (linkName) {
                    //console.log(linkName);
                    return linkName == (productName);

                });
            }).click();
        }
    },

   /* clickOnGivenProduct: {
        value: function (productName) {
            var that = this;

            return this.productFamily.filter(function (prodFamily) {
                return prodFamily.isDisplayed().then(function (val) {
                    return val;
                });
            }).map(function (prodFamily) {
                return prodFamily.element(by.tagName('a')).getAttribute('href').then(function (productHref) {
                    return prodFamily.element(by.tagName('a')).getText().then(function (linkName) {
                        var expectedUrl = that.expectedProductURL(linkName);
                        return linkName == (productName.toLowerCase());
                    })
                })
            });
        }
    },*/

    clickOnFirstTutorial: {
        value: function () {
            var firstTutorial = element.all(this.getLocator(locRepo.pageObjects.browseResultsPage.firstTutorialTile)).first();
            return firstTutorial.click();
        }
    },
    clickOnGivenLE: {
        value: function (LXName) {
            return this.learningExperience.filter(function (LX) {
                return LX.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (LXlink) {
                return LXlink.getAttribute("title").then(function (LearningXName) {
                    return LearningXName == (LXName);
                });
            }).click();
        }
    },

    LXDescriptionGivenTitle: {
        value: function (LXName) {
            return this.learningExperience.filter(function (LX) {
                return LX.isDisplayed().then(function (val) {
                    return val;
                })
            }).filter(function (LXlink) {
                return LXlink.getAttribute("title").then(function (LearningXName) {
                    return LearningXName == (LXName);
                });
            }).first().element(by.xpath('./../p')).getAttribute('title').then(function (res) {
                return res;
            });
        }
    }

});

module.exports = LandingPage;
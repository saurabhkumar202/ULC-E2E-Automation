'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var AdvertPage = function () {
};

AdvertPage.prototype = Object.create(HeaderFooter.prototype, {

    getTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.adTitle));
        }
    },

    getBottomAdTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.bottomAdTitle)).getText();
        }
    },

    closeButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.closeButton));
        }
    },
    getBottomAd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.bottomAd));
        }
    },

    closeBottomAdButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.bottomAdCloseButton));
        }
    },
    getBottomAdCTALink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.bottomAdCTALink)).getAttribute("ng-href");
        }
    },
    getBottomAdCTAText: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.bottomAdCTALink)).getText();
        }
    },

    getBottomAdImage: {
        get: function () {
            return browser.executeScript("return window.getComputedStyle(document.querySelector('#mainContent > ui-view > lc-comm:nth-child(1) > aside > div > figure'),null).getPropertyValue('background-image')");

        }
    },
    getSideAd:{
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.sideAd));
        }
    },
    getSideAdTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.sideAdTitle)).getText();
        }
    },
    getSideAdCTAText: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.sideAdCTALink)).getText();
        }
    },
    getSideAdCTALink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.sideAdCTALink)).getAttribute("ng-href");
        }
    },
    closeSideAdButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.sideAdCloseButton));
        }
    },
    getSideAdImage: {
        get: function () {
            return browser.executeScript("return window.getComputedStyle(document.querySelector('lc-comm > aside > div > div > figure'),null).getPropertyValue('background-image')");
        }
    },

    getTopAdTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.topAdTitle)).getText();
        }
    },
    getTopAdCTALink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.topAdCTALink)).getAttribute("ng-href");
        }
    },
    getTopAdCTAText: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.topAdCTALink)).getText();
        }
    },
    closeTopAdButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.topAdCloseButton));
        }
    },
    getTopAd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.topAd));
        }
    },

    getInlineAdTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.inlineAdTitle)).getText();
        }
    },
    getInlineAdCTALink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.inlineAdCTALink)).getAttribute("ng-href");
        }
    },
    getInlineAdCTAText: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.inlineAdCTALink)).getText();
        }
    },
    getInlineAdImage: {
        get: function () {
            return browser.executeScript("return window.getComputedStyle(document.querySelector('#mainContent .lcComm-container figure'),null).getPropertyValue('background-image')");
        }
    },
    closeInlineAdButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.inlineAdCloseButton));
        }
    },
    getInlineAd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.inlineAd));
        }
    },
    getTutorialInlineAd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.tutorialInlineAd));
        }
    },
    getTutoralInlineAdCTALink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.advertisement.tutorialInlineAdCTALink));
        }
    },



});

module.exports = AdvertPage;
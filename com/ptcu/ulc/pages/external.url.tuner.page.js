/**
 * Created by tdhir on 23-12-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');
var path = require('path');

var ExtUrlTunerPage = function () {
};

ExtUrlTunerPage.prototype = Object.create(headerFooter.prototype, {

    AddURLDetails: {
        value: function (urlToAdd, urlTitle, urlThumbnail, urlDescription) {
            var absolutePath = path.resolve(__dirname, urlThumbnail);
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlMapped)).clear();
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlMapped)).sendKeys(urlToAdd);
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlTitle)).clear();
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlTitle)).sendKeys(urlTitle);
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlPath)).clear();
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlPath)).sendKeys(absolutePath);
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlDesc)).clear();
            element(this.getLocator(locRepo.pageObjects.externalURLMap.urlDesc)).sendKeys(urlDescription);
            browser.sleep(5000);
            element(this.getLocator(locRepo.pageObjects.externalURLMap.saveButton)).click();
        }
    },
    closeSaveMsgBox: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.externalURLMap.msgCloseButton));
        }
    },
    closeURLTuner: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.externalURLMap.closeButton));
        }
    },
    aliasMessage: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.externalURLMap.aliasMessage));
        }
    }
});

module.exports = ExtUrlTunerPage;

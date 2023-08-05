/**
 * Created by rdewangan on 22-11-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var Forward = 1;
var backward = 0;
var windchillURL = browser.params.ulcOptions.windchillURL;

var WindchillApplication = function () {
};


WindchillApplication.prototype = Object.create(HeaderFooter.prototype, {

    launchULC: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.windchill.QuickLinks));
        }
    },
    commandTitle: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.searchResultsPage.pageHeaderTitle)).getAttribute("title");
        }
    },
    openLCFromwindchill: {

        value: function () {
            this.launchULC.click();
            browser.driver.sleep(5000);
            element(this.getLocator(locRepo.pageObjects.windchill.LCLink)).click();
            browser.driver.sleep(5000);
            this.switchOn(browser.params.windowHandles.ULC);
        }
    },
    sendCommand: {
        value: function () {
            this.switchOn(browser.params.windowHandles.WINDCHILL);
            browser.sleep(15000);
            element(this.getLocator(locRepo.pageObjects.windchill.submitChangeNotice)).click();
            this.switchOn(browser.params.windowHandles.ULC);
            browser.driver.manage().window().maximize();
        }
    },
    switchWindow: {
        value: function (state) {
            browser.getAllWindowHandles().then(function (handles) {
                var newWindowHandle = handles[state];
                browser.switchTo().window(newWindowHandle);
            });
        }
    }
});


module.exports = WindchillApplication;
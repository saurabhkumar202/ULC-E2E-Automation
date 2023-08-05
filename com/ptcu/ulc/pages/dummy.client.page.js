/**
 * Created by rdewangan on 17-08-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');
var Forward = 1;
var backward = 0;

var DummyClient = function () {
};

DummyClient.prototype = Object.create(HeaderFooter.prototype, {

    setUlcUrl: {
        value: function (inputUrl) {
            element(this.getLocator(locRepo.pageObjects.hostApplication.ulcUrlInput)).clear();
            element(this.getLocator(locRepo.pageObjects.hostApplication.ulcUrlInput)).sendKeys(inputUrl);
        }
    },
    selectProduct: {
        value: function (product) {
            return this.selectDropdownByText(element(this.getLocator(locRepo.pageObjects.hostApplication.selectProduct)), product);
        }
    },
    selectVersion: {
        value: function (version) {
            return this.selectDropdownByValue(element(this.getLocator(locRepo.pageObjects.hostApplication.selectVersion)), version);
        }
    },
    selectLanguage: {
        value: function (language) {
            return this.selectDropdownByValue(element(this.getLocator(locRepo.pageObjects.hostApplication.selectLanguage)), language);
        }
    },
    setCommand: {
        value: function (command) {
            element(this.getLocator(locRepo.pageObjects.hostApplication.commandInput)).clear();
            element(this.getLocator(locRepo.pageObjects.hostApplication.commandInput)).sendKeys(command);
            element(this.getLocator(locRepo.pageObjects.hostApplication.btnSendCommand)).click();
        }
    },
    launchUlc: {
        value: function (inputUrl, product, version, language) {
            this.setUlcUrl(inputUrl);
            this.selectProduct(product);
            this.selectVersion(version);
            this.selectLanguage(language);
            this.click(element(this.getLocator(locRepo.pageObjects.hostApplication.launchLcBtn)));
            this.switchWindow(Forward);
            browser.wait(protractor.ExpectedConditions.presenceOf(this.browseContentButton), 55000);
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

module.exports = DummyClient;

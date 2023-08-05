/**
 * Created by tdhir on 31-01-2017.
 */
'use strict';
var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');
var PlmsTunerPage = function () {
};
PlmsTunerPage.prototype = Object.create(HeaderFooter.prototype, {
    clickCreateMapping: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.createMappingButton)).click();
        }
    },
    verifyButtonText: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.createMappingButton)).getText();
        }
    },
    isModalDisplayed: {
      get: function(){
          return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.modalWindow)).isDisplayed();
      }
    },

    clickCommandToMap: {
        get: function(){
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.radioButtonToMapCommand)).click();
        }
    },

    clickAddButton: {
        get: function(){
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.addButtonToCreateAlias)).click();
        }
    },

    verifyCreateAliasMessage: {
        get: function(){
            return element(this.getLocator(locRepo.pageObjects.plmstunerwindow.createAliasMessage)).isDisplayed();
        }
    }

});
module.exports = PlmsTunerPage;
/**
 * Created by tdhir on 28-10-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var page = require('./../utils/helper.js');

var supportLogin = function () {
};

supportLogin.prototype = Object.create(page.prototype, {
    enterUserIdandPassword: {
        value: function (userID, password) {
            element(this.getLocator(locRepo.pageObjects.supportLogin.userName)).sendKeys(userID);
            element(this.getLocator(locRepo.pageObjects.supportLogin.password)).sendKeys(password);
            element(this.getLocator(locRepo.pageObjects.supportLogin.loginButton)).click();
        }
    }
});
module.exports = supportLogin;
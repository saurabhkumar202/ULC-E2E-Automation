/**
 * Created by pankumar on 20-06-2016.
 */


'use strict';

var Helper = require('./../utils/helper.js');
var locRepo = require('../resources/locatorRepository.json');

var HeaderFooter = function () {
};

HeaderFooter.prototype = Object.create(Helper.prototype, {

    signInLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.SignInLink));
        }
    },
    signOutLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.lnkSignOut));
        }
    },

    myLearningDropDown: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.myLearning));
        }
    },

    headerSearchBar: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.headerSearchBar));
        }
    },
    browseContentButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.browseContentButton));
        }
    },
    browseProduct: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.landing.product));
        }
    },

    lnkHome: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.lnkHome));
        }
    },
    lnkAbout: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.aboutLink));
        }
    },
    isAt: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.header_footer.browseContentButton)).isDisplayed();
        }
    },
    signInForm: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.loginForm));
        }
    },
    signInPopup: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.loginWindow));
        }
    },
    closeSignInFormBtn: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnCloseSignInform));
        }
    },
    login: {
        value: function (uid, pwd) {
            element(this.getLocator(locRepo.pageObjects.signInWindow.userName)).sendKeys(uid);
            element(this.getLocator(locRepo.pageObjects.signInWindow.password)).sendKeys(pwd);
            element(this.getLocator(locRepo.pageObjects.signInWindow.signInSubmit)).click();
            browser.waitForAngular();
        }
    },
    logOut: {
        value: function () {
            this.lnkUserAccount.click();
            this.signOutLink.click();
            browser.waitForAngular();
        }
    },
    lnkUserAccount: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.lnkUserAccount));
        }
    },
    lnkAdminSettings: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.landing.lnkAdminSettings));
        }
    },
    forgotPwd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.lnkForgotPassword));
        }
    },
    signUpLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.lnkSignUp));
        }
    },
    exploreLC: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.lnkExploreLC));
        }
    },
    onBoardingWizard: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.modalOnBoarding));
        }
    },
    closeWizard: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnCloseModal));
        }
    },
    wizardHeader1: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.modalHeader1));
        }
    },
    wizardHeaderTxt1: {
        value: function () {
            return this.wizardHeader1().getText();
        }
    },

    wizardHeader2: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.modalHeader2));
        }
    },
    wizardHeaderTxt2: {
        value: function () {
            return this.wizardHeader2().getText();
        }
    },

    wizardHeader3: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.modalHeader3));
        }
    },
    wizardHeaderTxt3: {
        value: function () {
            return this.wizardHeader3().getText();
        }
    },
    btnNext1st: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnNext1st));
        }
    },
    btnNext2nd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnNext2nd));
        }
    },
    btnBack1st: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnBack1st));
        }
    },
    btnBack2nd: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnBack2nd));
        }
    },
    btnClose: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.signInWindow.btnClose));
        }
    }
    ,
    clickOnGivenProductOnBrowse:
        {
            value: function (productName) {
                return this.browseProduct.filter(function (prodFamily) {
                    return prodFamily.getText().then(function (linkName) {
                        return linkName == (productName);
                    });
                }).click();
            }
        }

});


module.exports = HeaderFooter;

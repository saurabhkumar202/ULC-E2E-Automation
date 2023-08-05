/**
 * Created by bgupta on 08-09-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');

var SystemMessagesPage = function () {
};

SystemMessagesPage.prototype = Object.create(HeaderFooter.prototype, {


    addNewMsgBtn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.addNewMsgBtn));
        }
    },

    isAddNewMsgBtnDisplayed: {
        get: function () {
            return this.addNewMsgBtn.isDisplayed();
        }
    },

    clickAddNewMsgBtn: {
        value: function () {
            return this.addNewMsgBtn.click();
        }
    },
    backBtn: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.backBtn));
        }
    },
    isBackBtnDisplayed: {
        get: function () {
            return this.backBtn.isDisplayed();
        }
    },
    titleText: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.titleText));
        }
    },
    selectProductVersion: {
        value: function (prodvers) {
            switch (prodvers) {
                case "all":
                    return element(this.getLocator(locRepo.pageObjects.systemMessages.allProductVersion));
                case "thingworx6_0":
                    return element(this.getLocator(locRepo.pageObjects.systemMessages.thingworx6_0));
                case "thingworx6_5":
                    return element(this.getLocator(locRepo.pageObjects.systemMessages.thingworx6_5));
                case "thingworx7_2":
                    return element(this.getLocator(locRepo.pageObjects.systemMessages.thingworx7_2));
                case "windchill11_0":
                    return element(this.getLocator(locRepo.pageObjects.systemMessages.windchill11_0));
            }
        }
    },
    setContext: {
        value: function (context) {
            if (context == 'all') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.allContext)).click();
            }
            else if (context !== 'all') {
                element(this.getLocator(locRepo.pageObjects.systemMessages.newContext)).sendKeys(context);
                return element(this.getLocator(locRepo.pageObjects.systemMessages.addContext)).click();
            }
        }
    },
    setMsgText: {
        value: function (locale, msgText) {
            if (locale == 'en') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.englishMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'fr') {
                element(this.getLocator(locRepo.pageObjects.systemMessages.englishMsgTxt)).sendKeys(msgText);

            }
            else if (locale == 'de') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.germanMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'ja') {
                element(this.getLocator(locRepo.pageObjects.systemMessages.englishMsgTxt)).sendKeys(msgText);
                return element(this.getLocator(locRepo.pageObjects.systemMessages.japaneseMsgTxt)).sendKeys(msgText + 'これはテストメッセージです');
            }
            else if (locale == 'zh-CN') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.sChineseMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'zh-TW') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.tChineseMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'it') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.italianMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'ko') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.koreanMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'ru') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.russianMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'es') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.spanishMsgTxt)).sendKeys(msgText);
            }
            else if (locale == 'pt') {
                return element(this.getLocator(locRepo.pageObjects.systemMessages.portugueseMsgTxt)).sendKeys(msgText);
            }
        }
    },
    saveMsg: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.btnSave)).click();
        }
    },
    setSystemMessage: {
        value: function (titleText, prodvers, context, locale, msgText) {
            this.titleText.sendKeys(titleText);
            this.selectProductVersion(prodvers).click();
            this.setContext(context);
            this.setMsgText(locale, msgText);
            this.saveMsg();
        }
    },
    msgTitleStatusInTable: {
        value: function (msgTitle) {
            var that = this;
            return element.all(this.getLocator(locRepo.pageObjects.systemMessages.msgRowsInTable)).filter(function (row) {
                return row.element(that.getLocator(locRepo.pageObjects.systemMessages.msgTitleInTable)).getText().then(function (text) {
                    return msgTitle === text;
                });
            }).getText();
        }
    },
    getSystemMessageDisplayedOnLC: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.sysMsgOnTheProduct)).getText();
        }
    },
    closeSysMessage: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.systemMessages.closeSystemMsg)).click();
        }
    },
    deleteTheGivenSystemMessage: {
        value: function (msgTitle) {
            var that = this;
            element.all(this.getLocator(locRepo.pageObjects.systemMessages.msgRowsInTable)).then(function (rows) {
                for (var i = 0; i < rows.length; i++) {
                    rows[i].all(that.getLocator(locRepo.pageObjects.systemMessages.msgTitleInTable)).then(function (text) {
                        text[0].getText().then(function (msg) {
                            if (msg == msgTitle) {
                                that.removeMsgFromTable();
                            }
                        })
                    })
                }
            })
        }
    },
    removeMsgFromTable: {
        value: function () {
            var that = this;
            element(this.getLocator(locRepo.pageObjects.systemMessages.removeMsg)).click();
            element(this.getLocator(locRepo.pageObjects.systemMessages.acceptRemoveMsg)).click();
            browser.waitForAngular();
        }
    },
    getSystemMessagesCount: {
        value: function () {
            return element.all(this.getLocator(locRepo.pageObjects.systemMessages.removeMsgAll)).count();
        }
    },
    removeAllMessages: {
        value: function () {
            var that = this;
            console.log("inside remove msg all");

            return this.getSystemMessagesCount().then(function (count) {
                for (var i = 0; i < count; i++) {
                    element.all(that.getLocator(locRepo.pageObjects.systemMessages.removeMsgAll)).first().click();
                    element(that.getLocator(locRepo.pageObjects.systemMessages.acceptRemoveMsg)).click();
                    browser.waitForAngular();
                }
            });

        }
    }
});

module.exports = SystemMessagesPage;

/**
 * Created by tdhir on 02-11-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var page = require('./../utils/helper.js');
var SupportLoginPage = require('./support.login.page.js');

var supportLoginPage = new SupportLoginPage();
var ulcWindow = browser.params.windowHandles.ULC;
var supportLanding = function () {
};

supportLanding.prototype = Object.create(page.prototype, {

    getDocumentTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTitle));
        }
    },
    getHCDocumentTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentHCTitle));
        }
    },
    getCFDocumentTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentCFTitle));
        }
    },

    getKeyowrdBox: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.keywordBox));
        }
    },
    checkKBDocumentType: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTypeKB)).isSelected();
        }
    },
    getDocumentTypeText: {
        get: function () {
            return element.all((this.getLocator(locRepo.pageObjects.supportDocument.documentTypeText)));
        }
    },
    checkArtDocumentType: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTypeArt)).isSelected();
        }
    },
    checkHCDocumentType: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTypeHC)).isSelected();
        }
    },
    checkCMDocumentType: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTypeCM)).isSelected();
        }
    },
    checkCBDocumentType: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.supportDocument.documentTypeCB)).isSelected();
        }
    },
    getParseURL: {
        value: function (url) {

            var temp, temp1 = {};
            var keyword = "";
            var documentType1 = "";
            var documentType2 = "";
            var documentType3 = "";
            var documentType4 = "";
            var contentUrl = [];
            var that = this;

            var params = url.split("#");

            for (var i = 1; i < params.length; i++) {
                temp = params[i].split(":");
            }

            var regex = /","|"}},{"/g;
            console.log(temp.length);

            for (var i = 0; i < temp.length; i++) {
                temp1 = temp[i].split(regex);

                if (i == 1)
                    keyword = temp1[0];
                if (i == 8 && i != temp.length)
                    documentType1 = temp1[0];

                if (i == 9 && documentType2 == "")
                    documentType2 = temp1[0];

                if (i == (temp.length - 7))
                    documentType3 = temp1[0];

                if (i == (temp.length - 1))
                    documentType4 = temp1[0];
            }

            keyword = keyword.replace("\"", "");
            keyword = keyword.replace("\\", "");
            keyword = keyword.replace("\\", "");
            documentType1 = documentType1.replace("\"", "");
            documentType1 = documentType1.replace("\"}}]}", "");
            if (documentType2 != "" || documentType2 != undefined) {
                documentType2 = documentType2.replace("\"", "");
                documentType2 = documentType2.replace("\"}}]}", "");
            }
            if (documentType3 != "" || documentType2 != undefined)
                documentType3 = documentType3.replace("\"", "");
            if (documentType4 != "" || documentType2 != undefined) {
                documentType4 = documentType4.replace("\"", "");
                documentType4 = documentType4.replace("\"}}]}", "");
            }
            return [keyword, documentType1, documentType2, documentType3, documentType4];
        }
    },
    closeWindow: {
        get: function () {
            browser.driver.close().then(function () {
                //to switch to the previous window
                this.switchOn(ulcWindow);
            });
        }
    }
});
module.exports = supportLanding;
'use strict';

var using = require('jasmine-data-provider');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var siteStructure = require('../../resources/product.site.structure.js');
var exec = require('../../utils/specHelper');

describe('Tests for Site Structure', function () {

    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var urlPathParameterForProduct = "/products/";
    var urlQueryParamter = "?locale=en&contentLocale=en&includeEnglish=false";
    var urlVersionParameter;

    beforeAll(function () {
        browseResultsPage.goTo(ulcURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    using(siteStructure, function (site) {
        it('Verify the correct url and results title for browse ' + site.productName, function () {
            headerFooter.browseContentButton.click();
            browser.waitForAngular();
            browser.sleep(3000);
            element(by.linkText(site.productName)).click();
            browser.waitForAngular();
            if (site.menuType === 'productFamily') {
                urlVersionParameter = '?version=all'
            } else {
                urlVersionParameter = '?version=latest'
            }
            var expectedURL = urlPathParameterForProduct + site.expectedUrl + urlVersionParameter;

            expect(browseResultsPage.getURL).toContain(expectedURL);
            expect(browseResultsPage.getProductName.getText()).toEqual(site.productTitle);
        });
    });

});

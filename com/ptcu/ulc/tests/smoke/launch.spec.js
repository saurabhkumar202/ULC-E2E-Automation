/**
 * Created by dghan on 6/15/2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var exec = require('../../utils/specHelper');

var landingPage = new LandingPage();
var ulcURL = browser.params.ulcOptions.ulcURL;


describe('ULC Landing Page test cases', function () {

    var expectedLandingPageTitle = "Home | PTC Learning Connector";

    beforeEach(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
    });
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
    });
    afterAll(function () {
        exec.cleanUp();
    });

    it('Should have search box on main landing landingPage', function () {
        expect(landingPage.isSearchBoxDisplayed).toBe(true);
    });

    it('Should display Browse Content button on browse results Page', function () {
        expect(landingPage.isBrowseContentButtonDisplayed).toBe(true);
    });
    it('Should show five product/product family tiles in a banner on landingPage', function () {
        expect(landingPage.getCountOfTiles).toBe(6);
    });

    it('Should have Page Title', function () {
        expect(landingPage.getPageTitle).toBe(expectedLandingPageTitle);
    });

    xit('Should have url in patten like products/productname for each product- when browsed from Landing Page', function () {
        landingPage.getProductDetails.then(function (productHref) {
            console.log(productHref);
            productHref.map(function (prodHrefs) {
                prodHrefs.forEach(function(prodHref){
                    expect(prodHref).toContain("product");
                });
            });
        });
    });

});
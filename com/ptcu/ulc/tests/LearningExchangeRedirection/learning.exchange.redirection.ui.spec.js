'use strict';

var using = require('jasmine-data-provider');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var lexURLStructure = require('../../resources/learning.exchange.data.js');
var LandingPage = require('../../pages/landing.page.js');
var SeeMorePage = require('../../pages/see.more.page.js');
var exec = require('../../utils/specHelper');

describe('UI Tests for redirected ULC Site Structure', function () {

    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var landingPage = new LandingPage();
    var seeMorePage = new SeeMorePage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var urlVersionParameter;
    beforeAll(function () {
        browser.restart();
        browser.get(browser.params.ulcOptions.learningExchangeURL);
    });

    afterAll(function () {
        exec.cleanUp();
    });
    it('The Learning Exchange application should redirect user to ULC', function () {
        expect(landingPage.getURL).toContain(browser.params.ulcOptions.redirectToULCURL);
    });
    it('In ULC a redirection message dialog should display', function () {
        expect(landingPage.getURL).toContain(browser.params.ulcOptions.redirectToULCURL);
    });
    using(lexURLStructure, function (LEXsite) {
        it('Verify the Learning Exchange redirection for URL ' + LEXsite.URLID, function () {
            browser.get(LEXsite.learningExchangeURL);
            expect(browseResultsPage.getURL).toContain(LEXsite.expectedURL);
            expect(seeMorePage.grayRibbonInfo()).toEqual(LEXsite.title);

        });
    });

});

'use strict';
var using = require('jasmine-data-provider');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var lexURLStructure = require('../../resources/learning.exchange.data.js');
var LandingPage = require('../../pages/landing.page.js');
var SeeMorePage = require('../../pages/see.more.page.js');
var exec = require('../../utils/specHelper');

describe('API Tests for redirected ULC Site Structure', function () {

    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var landingPage = new LandingPage();
    var seeMorePage = new SeeMorePage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var urlVersionParameter;


    afterAll(function () {
        exec.cleanUp();
    });

    using(lexURLStructure, function (LEXsite) {
        it('Verify the Learning Exchange redirection for URL ' + LEXsite.URLID, function () {
            landingPage.startFreshNetworkCapture();
            landingPage.goTo(LEXsite.learningExchangeURL);
            landingPage.getCurrentHARDetails(browser.params.apiType.LEARNING_EXCHANGE_BROWSE, "status", function (responses) {
                expect(responses.length).toBe(1);
                expect(responses[0].status).toBe(301);
            });
            landingPage.getCurrentHARDetails(browser.params.apiType.LEARNING_CONNECTOR_BROWSE, "status", function (responses) {
                expect(responses.length).toBe(1);
                expect(responses[0].status).toBe(200);
            });
        });
    });

});

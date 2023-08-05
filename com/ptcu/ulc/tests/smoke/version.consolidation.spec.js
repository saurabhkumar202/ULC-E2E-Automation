/**
 * Created by rdewangan on 03-07-2017.
 */


var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var exec = require('../../utils/specHelper');
var Header_Footer = require('../../pages/header.footer.page.js');
var ELearningSeeMore = require('../../pages/elearning.new.seemore.page.js');
var SeeMore = require('../../resources/seeMoreData.json')
var browseContentMenuPage = new BrowseContentMenuPage();

describe('Tests for version consolidation UI', function () {

    var landingPage = new LandingPage();
    var productToBrowse = "ThingWorx";
    var headerFooter = new Header_Footer();
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var eLearningSeeMore = new ELearningSeeMore();

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        headerFooter.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should be able to click on the ThingWorx product from browse drop down', function () {
        element(by.linkText(SeeMore.productToBrowse[1])).click();
        browser.waitForAngular();
    });

    it('Should select version 6.5 for thingworx product and verify product and version for course lane', function () {
        browseResultsPage.versionDropDown.click();
        browseResultsPage.versionDropDownSelection.click();
        expect(browseResultsPage.getProductLabel).toMatch('^ \| $|^ThingWorx \| 6$');

    });
    it('Product title and browse product verification on see more of SPEL', function () {
        browseResultsPage.selfPacedELearningSeeMoreLink.click();
        expect(eLearningSeeMore.grayRibbonInfo()).toBe(SeeMore.seeMorePageFamily[1]);
    });
    it('Should click on see more button and verify the version as 6', function () {
        eLearningSeeMore.content().clickSeeMore().then(function (flag) {
            expect(eLearningSeeMore.content().getVersionsList()).toBeSubsetofArray(['6']);
        });

    });
});
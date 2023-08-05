/**
 * Created by kbiswakarma on 13-10-2017.
 */
var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var BrowseContentMenuPage = require('../../pages/browse.content.menu.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var CourseViewer = require('../../pages/course.viewer.page.js');
var exec = require('../../utils/specHelper');
var loginData = require('../../resources/loginData.json');

var courseViewer = new CourseViewer();
var landingPage = new LandingPage();
var browseResultsPage = new BrowseResultsPage();
var browseContentMenuPage = new BrowseContentMenuPage();
var headerFooterPage = new HeaderFooter();
var ulcURL = browser.params.ulcOptions.ulcURL;
var productToBrowse = "ThingWorx";
var resultCourseTitle;
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Licensing verification for PLMSk courses', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        browser.waitForAngular();
        headerFooterPage.browseContentButton.click();
        browser.waitForAngular();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.presenceOf(browseContentMenuPage.getBrowseMenu), 3000, 'Cannot find browse menu');
        element(by.linkText(seeMoreData.productToBrowse[1])).click();
        browser.waitForAngular();
    });

    afterAll(function () {
        //browser.sleep(10000);
        exec.cleanUp();
    });

    it('Non-logged-in user should see standard courses marked with key icon', function () {
        browser.executeScript("return document.querySelectorAll('.selfpacedItem')").then(function(elems){
            //console.log('The length is'+elems.length);
            for(let i=0;i<elems.length;i++)
            {
                browser.executeScript("var temp=arguments[0]; var index=arguments[1];console.log('The index is '+index);return window.getComputedStyle(temp[index].querySelector('.locked'),':before').getPropertyValue('content')",elems,i).then(function(text){
                    if(text.length>0)
                    { //console.log('The inner length is'+text.length);
                        expect(1).toBe(1);
                    }
                    else{
                        expect(true).toBe(false,'Lock icon is missing');
                    }
                });
            }
        });
    });

    it('Non-logged-in user should be prompted to login', function () {
        browseResultsPage.getSelfPacedPLMSContentsWithoutAccess.first().click();
        expect(headerFooterPage.signInPopup.isDisplayed()).toBe(true, "SignIn Popup is not displayed");
    });
});

/**
 * Created by saukumar on 13-02-2018.
 */


var ulcURL = browser.params.ulcOptions.ulcURL;
var ILEDetailPage = require('./ILE.detail.page.js');
var LandingPage = require('../../pages/landing.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var LoginData = require('../../resources/loginData.json');
var exec = require('../../utils/specHelper');
var landingPage = new LandingPage();
var ILE_detailPage = new ILEDetailPage();
var headerFooter = new Header_Footer();

var ILETitle = 'Creo Parametric Modeling Essentials: Core';
var TPTitle = 'Creo Parametric Modeling Essentials';
var ILEDesc = 'abc';
describe('Tests for ILE Detail page from ULC home page ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        ILEDesc = landingPage.LXDescriptionGivenTitle(ILETitle);
    });
    afterAll(function () {
        exec.cleanUp();
    });
    it('ILE title should be present on ILE details page', function () {
        landingPage.clickOnGivenLE(ILETitle);
        expect(ILE_detailPage.getILETitle).toBe(ILETitle);
    });
    it('Link to parent detail should be available', function () {
        expect(ILE_detailPage.getParentTitle).toBe(TPTitle);
    });
    it('ILE description should be present', function () {
        expect(ILE_detailPage.getILETitleDescription).toBe(ILEDesc);

    });
    it('Instructor image should be available', function () {
        expect(ILE_detailPage.getInstructorImage).toMatch(/https:\/\/.*cloudfront.net\/tutorials\/images\/original\/.*png/);
    });
    it('Link to "Start Learning" should be available', function () {
        expect(ILE_detailPage.getLinkToStartLearning).toBe('Start learning');
    });
    it('Syllabus should be available', function () {
        expect(ILE_detailPage.getSyllabus).toMatch(/Syllabus.*/);

    });
    it('Available delivery Type header should be available', function () {
        expect(ILE_detailPage.availableFormatHeader).toBe('Available Formats');
    });
    it('Available format should be only Independent learning', function () {
        expect((ILE_detailPage.ListOfAvailableFormats).count()).toBe(1);
        expect((ILE_detailPage.TypeOfAvailableFormats).get(0).getText()).toBe('Independent learning');

    });
    it('Non Logged in user should see Launch button but should login first to launch the content ', function () {
        expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Launch');
    });
    it('Non Logged in user should get login modal first to launch the content ', function () {
        // expect(element(by.css('#lxILE > nav > a')).getText()).toBe('Launch');
        ILE_detailPage.LaunchAnILEButton.click();
        expect(headerFooter.signInPopup.isDisplayed()).toBe(true, "SignIn form is missing");
        headerFooter.login(String(LoginData.uid), String(LoginData.pwd));
    });
    it('ILE Course should launch in an iframe', function () {
        browser.refresh();
        ILE_detailPage.runOnNonAngular(function () {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(ILE_detailPage.findILEPackage), 40000, 'Cannot find first iframe');
            browser.switchTo().frame(0);
            browser.sleep(40000);
            browser.switchTo().frame(0);
            expect(browser.driver.findElement(by.xpath('//*[@id="menu_course_title"]')).getText()).toBe(ILETitle);
        });


    })
});
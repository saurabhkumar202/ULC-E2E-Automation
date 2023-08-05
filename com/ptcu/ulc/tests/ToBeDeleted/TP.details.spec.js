/**
 * Created by saukumar on 13-02-2018.
 */


var ulcURL = browser.params.ulcOptions.ulcURL;
var ILEDetailPage = require('./ILE.detail.page.js');
var LandingPage = require('../../pages/landing.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var exec = require('../../utils/specHelper');
var LoginData = require('../../resources/loginData.json');
var landingPage = new LandingPage();
var ILE_detailPage = new ILEDetailPage();
var headerFooter = new Header_Footer();

var ILETitle_one = 'Creo Parametric Modeling Essentials: Core';
var ILETitle_two = 'Creo Parametric Modeling Essentials: Extended';

var TPTitle = 'Creo Parametric Modeling Essentials';
var ILEDesc = 'abc';
describe('ILEs should launch from a training plan ', function () {
    beforeAll(function () {
        landingPage.goTo(ulcURL);
        ILEDesc = landingPage.LXDescriptionGivenTitle(TPTitle);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    it('Training Plan title should be present on Training plan details page', function () {
        landingPage.clickOnGivenLE(TPTitle);
        expect(ILE_detailPage.getILETitle).toBe(TPTitle);
    });
    it('Training Plan description should be present on Training plan details page', function () {
        expect(ILE_detailPage.getILETitleDescription).toBe(ILEDesc);

    });
    it('Teaser video should be available', function () {
        expect(ILE_detailPage.getTrailerVideo).toMatch(/https:\/\/.*cloudfront.net\/data\/packages\/.*\/assets\/.*\.mp4/);
    });

    it('Link to "Start Learning" should be available', function () {
        expect(ILE_detailPage.getLinkToStartLearning).toBe('Start learning');
    });
    it('Syllabus should be available', function () {
        expect(ILE_detailPage.getSyllabus).toMatch(/Syllabus.*/)

    });
    it('Available delivery Type header should be available', function () {
        expect(ILE_detailPage.availableFormatHeader).toBe('Available Formats');
    });
    it('Available format should be only Independent learnings', function () {
        expect((ILE_detailPage.ListOfAvailableFormats).count()).toBe(1);
        expect((ILE_detailPage.TypeOfAvailableFormats).get(0).getText()).toBe('Independent learning');

    });
    it('User should see Learn more button', function () {
        expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Learn more');

    });
    describe('Test for ILE 1 launch from dialog box', function () {
        it('Non Logged in user should get login modal first to launch the content', function () {
            ILE_detailPage.LaunchAnILEButton.click();
            // expect(element(by.css('#lxILE > nav > a')).getText()).toBe('Launch');
            ILE_detailPage.LaunchAnILEFromILEModal.first().click();
            expect(headerFooter.signInPopup.isDisplayed()).toBe(true, "SignIn form is missing");
            headerFooter.login(String(LoginData.uid), String(LoginData.pwd));
        });
        it('ILE Course should launch in an iframe', function () {
            browser.refresh();
            ILE_detailPage.runOnNonAngular(function () {
                var EC = protractor.ExpectedConditions;
                browser.wait(EC.presenceOf(ILE_detailPage.findILEPackage), 40000, 'Cannot find first iframe');
                browser.switchTo().frame(0);
                browser.sleep(80000);
                browser.switchTo().frame(0);
                expect((ILE_detailPage.getContentTitle).getText()).toBe(ILETitle_one);
            });
        });
    });
    describe('Test for ILE 2 launch from dialog box', function () {
        beforeAll(function () {
            landingPage.goTo(ulcURL);
            ILEDesc = landingPage.LXDescriptionGivenTitle(TPTitle);
        });
        it('User should see Learn more button', function () {
            landingPage.clickOnGivenLE(TPTitle);
            expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Learn more');
            ILE_detailPage.LaunchAnILEButton.click();
        });
        it('Logged in user should be able to launch the content ', function () {
            ILE_detailPage.LaunchAnILEFromILEModal.last().click();
        });
        it('ILE Course should launch in an iframe', function () {
            browser.refresh();
            ILE_detailPage.runOnNonAngular(function () {
                var EC = protractor.ExpectedConditions;
                browser.wait(EC.presenceOf(ILE_detailPage.findILEPackage), 40000, 'Cannot find first iframe');
                browser.switchTo().frame(0);
                browser.sleep(80000);
                browser.switchTo().frame(0);
                expect((ILE_detailPage.getContentTitle).getText()).toBe(ILETitle_two);
            });
        })
    });
    describe('Tests for ILE 1 Detail page from dialog box', function () {
        beforeAll(function () {
            landingPage.goTo(ulcURL);
            //ILEDesc = landingPage.LXDescriptionGivenTitle(ILETitle_one);
        });
        it('User should see Learn more button', function () {
            landingPage.clickOnGivenLE(TPTitle);
            expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Learn more');
            ILE_detailPage.LaunchAnILEButton.click();
        });
        it('ILE title should be present on ILE details page', function () {
            browser.findElement(by.css('main >ul > li:nth-child(1) > a')).click();
            //landingPage.clickOnGivenLE(ILETitle);
            expect(ILE_detailPage.getILETitle).toBe(ILETitle_one);
        });
        it('Link to parent detail should be available', function () {
            expect(ILE_detailPage.getParentTitle).toBe(TPTitle);
        });
        it('ILE description should be present', function () {
            expect(ILE_detailPage.getILETitleDescription).toMatch(/.*/);

        });
        it('Instructor image should be available', function () {
            expect(ILE_detailPage.getInstructorImage).toMatch(/https:\/\/.*cloudfront.net\/tutorials\/images\/original\/.*png/);
        });
        it('Link to "Start Learning" should be available', function () {
            expect(ILE_detailPage.getLinkToStartLearning).toBe('Start learning');
        });
        it('Syllabus should be available', function () {
            expect(ILE_detailPage.getSyllabus).toMatch(/Syllabus.*/)

        });
        it('Available delivery Type header should be available', function () {
            expect(ILE_detailPage.availableFormatHeader).toBe('Available Formats');
        });
        it('Available format should be only Independent learning', function () {
            expect((ILE_detailPage.ListOfAvailableFormats).count()).toBe(1);
            expect((ILE_detailPage.TypeOfAvailableFormats).get(0).getText()).toBe('Independent learning');

        });
        it('User should see Launch button', function () {
            expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Launch');
            ILE_detailPage.LaunchAnILEButton.click();
        });
        it('ILE Course should launch in an iframe', function () {
            browser.refresh();
            ILE_detailPage.runOnNonAngular(function () {
                var EC = protractor.ExpectedConditions;
                browser.wait(EC.presenceOf(ILE_detailPage.findILEPackage), 40000, 'Cannot find first iframe');
                browser.switchTo().frame(0);
                browser.sleep(80000);
                browser.switchTo().frame(0);
                expect((ILE_detailPage.getContentTitle).getText()).toBe(ILETitle_one);
            });
        });
    });
    describe('Tests for ILE 2 Detail page from dialog box', function () {
        beforeAll(function () {
            landingPage.goTo(ulcURL);
            //ILEDesc = landingPage.LXDescriptionGivenTitle(ILETitle_two);
        });
        it('User should see Learn more button', function () {
            landingPage.clickOnGivenLE(TPTitle);
            expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Learn more');
            ILE_detailPage.LaunchAnILEButton.click();
        });

        it('ILE title should be present on ILE details page', function () {
            browser.findElement(by.css('main >ul > li:nth-child(2) > a')).click();
            //landingPage.clickOnGivenLE(ILETitle);
            expect(ILE_detailPage.getILETitle).toBe(ILETitle_two);
        });

        it('Link to parent detail should be available', function () {
            expect(ILE_detailPage.getParentTitle).toBe(TPTitle);
        });
        it('ILE description should be present', function () {
            expect(ILE_detailPage.getILETitleDescription).toMatch(/.*/);

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
        it('User should see Launch button', function () {
            expect((ILE_detailPage.LaunchAnILEButton).getText()).toBe('Launch');
            ILE_detailPage.LaunchAnILEButton.click();
        });
        it('ILE Course should launch in an iframe', function () {
            browser.refresh();
            ILE_detailPage.runOnNonAngular(function () {
                var EC = protractor.ExpectedConditions;
                browser.wait(EC.presenceOf(ILE_detailPage.findILEPackage), 40000, 'Cannot find first iframe');
                browser.switchTo().frame(0);
                browser.sleep(80000);
                browser.switchTo().frame(0);
                expect((ILE_detailPage.getContentTitle).getText()).toBe(ILETitle_two);
            });
        });
    });
});

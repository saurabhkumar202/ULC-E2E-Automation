/**
 * Created by mbenur on 27-04-2018.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var landingPage = new LandingPage();
var exec = require('../../utils/specHelper');
var ulcURL = browser.params.ulcOptions.ulcURL;
var loginData = require('../../resources/loginData.json');
var MyLearning = require('./myLearning.page.js');
var myLearning = new MyLearning();
var HeaderFooter = require('../../pages/header.footer.page.js');
var headerFooter = new HeaderFooter();
var myLearningData = require('../../resources/myLearningData.json');
var courseTitle = myLearningData.learningTypes.eLearningCourse.name;
var assessmentTitle = myLearningData.learningTypes.assessment.name;

describe('Test my learning page of user profile', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        exec.login(String(loginData.userName1), String(loginData.password1));
        headerFooter.lnkUserAccount.click();
        expect(headerFooter.myLearningDropDown.isDisplayed()).toBe(true);
        headerFooter.myLearningDropDown.click();
    });

    afterAll(function () {
        exec.cleanUp();
    });

   describe('Verify available learnings present under enrollment section',function () {
        it('My Learning Label should be displayed',function() {
            expect(myLearning.getMyLearningLabel).toBe("My Learning");
        });
        it('E-Learning course is present under enrollment section',function() {
            expect(myLearning.verifyElearningCourse(courseTitle)).toBe(true);
        });
        it('Assessment is present under enrollment section',function() {
            expect(myLearning.verifyAssessment(assessmentTitle)).toBe(true);
        });
   //    // it('Learning path is present under enrollment section',function() {
   //    //    });
   //    //
   //    // it('Digital Guide is present under enrollment section',function() {
   //    //});
   });

    describe('Verify completed learnings visible under completed section',function () {
        it('E-Learning course is present under completed learning section',function() {
            myLearning.selectEnrollementsTab.click();
            myLearning.completeElearningCourse(courseTitle);
            myLearning.selectCompletedTab.click();
            expect(myLearning.getMyLearningLabel).toBe("My Learning");
            expect(myLearning.verifyElearningCourse(courseTitle)).toBe(true);
        });
        it('Assessment is present under completed learning section',function() {
            myLearning.selectEnrollementsTab.click();
            myLearning.completeAssessment(assessmentTitle);
            browser.sleep(5000);
            myLearning.scrollTo(myLearning.selectCompletedTab);
            myLearning.selectCompletedTab.click();
            expect(myLearning.getMyLearningLabel).toBe("My Learning");
            expect(myLearning.verifyAssessment(assessmentTitle)).toBe(true);
        });
        //it('Learning path is present under completed learning section',function() {
        //});
        //
        //it('Digital Guide is present under completed learning section',function() {
        //});
    });
});
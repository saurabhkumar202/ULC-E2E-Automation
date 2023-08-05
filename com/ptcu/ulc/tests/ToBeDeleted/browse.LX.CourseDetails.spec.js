/*
/!**
 * Created by saukumar on 07-11-2017.
 *!/
var LandingPage = require('../../pages/landing.page.js');
var BrowseLXCDPage=require('../../pages/browse.LX.CourseDetails.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var landingPage=new LandingPage();
var browseLXCourseDetailsPage =new BrowseLXCDPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
describe('Browse Creo for LX Courses & Banner on home page',function(){

    beforeAll(function(){
        landingPage.goTo("http://qa-learningconnector.ptc.com/learningexperience/course/2/class/2?locale=en&contentLocale=en&includeEnglish=false");
        //landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[0]);
    });

    afterAll(function(){
       exec.cleanUp();
    });

describe('Verify LX course details page :: Logged out user', function(){
    /!*afterAll(function(){
        browseLXCourseDetailsPage.banner().closeLXPage();
    });*!/
    it('Syllabus, Session Detail & Instructor info should be present',function(){
        //expect(browseLXCourseDetailsPage.detail().getSyllabus()).toBe("[ 'Syllabus' ]");
        expect(browseLXCourseDetailsPage.detail().getSessionDetail()).toBe("Session Detail");
        expect(browseLXCourseDetailsPage.detail().getCourseInstructor()).toBe("Meet your instructor");
    });

    it('User should see Enroll button to enroll for the class', function () {
       expect(browseLXCourseDetailsPage.detail().getEnrollOption()).toBe("Enroll");
        browseLXCourseDetailsPage.detail().getEnrollOption().click();
    });

    it("Logged out user should get a login page", function () {
        expect(browseLXCourseDetailsPage.detail().loginPopUp()).toBe("Sign in");
       //need to write the login spec
    });




/!*
    it('LX banner header should link to LX site',function(){
        //need to write this section
        // expect( browseLXCourseDetailsPage.banner().getHeaderLink()).toBe('https://www.iotu.com/')
    });
    it('LX banner should have swimlane label as Courses',function(){
        expect(browseLXCourseDetailsPage.banner().getSwimLaneLabel()).toBe('Courses');
    });
    it('LX courses should have book icon',function(){
        expect(browseLXCourseDetailsPage.banner().getCourseIcon().isDisplayed()).toBe(true);
    });
    it('LX courses should not have lock icon',function(){
        //Need to write this sections
        // expect(browseLXCourseDetailsPage.banner().getCourseIcon().isDisplayed()).toBe(true);
    });
    it('LX banner swimlane label should link to LX site',function(){
        //Need to write this sections
        // expect(browseLXCourseDetailsPage.banner().getSwimLaneLink()).toBe('https://www.iotu.com/catalog');
    });
    it('On click of this course verify that the course opens in a new tab/window',function(){
        //Need to write this sections
        // expect(browseLXCourseDetailsPage.banner().ValidateACourse()).toContain('https://www.iotu.com');

    });*!/
});

/!*describe('Change the version to a Random Version on spotlight page',function(){
        beforeAll(function(){
            browseLXCourseDetailsPage.banner().clickRandomVersion();
        });
        afterAll(function(){
            browseLXCourseDetailsPage.banner().closeLXPage();
        });
        it('LX banner Courses count should be at max 5',function(){
            landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[1]);
            expect(browseLXCourseDetailsPage.banner().getCoursesCount()).toBe(5);
        });

        it('LX banner header should link to LX site',function(){
            //Need to write this sections
            // expect( browseLXCourseDetailsPage.banner().getHeaderLink()).toBe('https://www.iotu.com/')
        });
        it('LX banner should have swimlane label as Courses',function(){
            expect(browseLXCourseDetailsPage.banner().getSwimLaneLabel()).toBe('Courses');
        });

        it('LX banner swimlane label should link to LX site',function(){
            expect(browseLXCourseDetailsPage.banner().getSwimLaneLink()).toBe('https://www.iotu.com/catalog');
        });
        it('On click of this course verify that the course opens in a new tab/window',function(){
            //Need to write this section
            // expect(browseLXCourseDetailsPage.banner().ValidateACourse()).toContain('https://www.iotu.com');

        });
    });

describe('change the language to French and Include English',function(){
        beforeAll(function(){
            browseLXCourseDetailsPage.banner().getIncludeEnglishCourses();
        });
       afterAll(function(){
           browseLXCourseDetailsPage.banner().closeLXPage();
        });
        it('LX banner Courses count should be at max 5',function(){
            expect(browseLXCourseDetailsPage.banner().getCoursesCount()).toBe(5);
        });
        it('LX banner header should link to LX site',function(){
            //need to write this section
            //expect( browseLXCourseDetailsPage.banner().getHeaderLink()).toBe('https://www.iotu.com/')
        });
        it('LX banner should have swimlane label as Courses',function(){
            expect(browseLXCourseDetailsPage.banner().getSwimLaneLabel()).toBe('Courses');
        });
        it('LX banner swimlane label should link to LX site',function(){
            expect(browseLXCourseDetailsPage.banner().getSwimLaneLink()).toBe('https://www.iotu.com/catalog');
        });
        it('On click of this course verify that the course opens in a new tab/window',function(){
            //need to write this section
            // expect(browseLXCourseDetailsPage.banner().ValidateACourse()).toContain('https://www.iotu.com');
            browser.executeScript('window.close()');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[0]);
            });
        });
    });*!/
});*/

/*
/!**
 * Created by saukumar on 07-11-2017.
 *!/
var LandingPage = require('../../pages/landing.page.js');
var BrowseLXResultsPage=require('../../pages/browse.LX.banner.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var landingPage=new LandingPage();
var browseLXBannerPage =new BrowseLXResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
describe('Browse Creo for LX Courses & Banner on home page',function(){

    beforeAll(function(){
        landingPage.goTo(ulcURL);
        //landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[0]);
    });

    afterAll(function(){
       exec.cleanUp();
    });

describe('With Default All Version',function(){

    beforeAll(function(){
        landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[0]);
    });

    afterAll(function(){
        browseLXBannerPage.banner().closeLXPage();
    });
    it('LX banner Courses count should be at max 5',function(){
        expect(browseLXBannerPage.banner().getCoursesCount()).toBeLessThanOrEqual(5);
        //browser.driver.sleep(10000);

    });
    it('LX banner should have swimlane label as Immersive Learning Experience',function(){
        expect(browseLXBannerPage.banner().getSwimLaneLabel()).toBe('Immersive Learning Experiences');
    });
    it('LX courses should have book icon',function(){
        expect(browseLXBannerPage.banner().getCourseIcon().isDisplayed()).toBe(true);
    });
});


describe('Change the Product to family to validate LX Banner',function(){
        beforeAll(function(){
           landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[2]);
        });
        afterAll(function(){
            browseLXBannerPage.banner().closeLXPage();
        });

        it('LX banner Courses count should be at max 5',function(){
            expect(browseLXBannerPage.banner().getCoursesCount()).toBeLessThanOrEqual(5);
        });

        it('LX banner should have swimlane label as Immersive Learning Experience',function(){
        expect(browseLXBannerPage.banner().getSwimLaneLabel()).toBe('Immersive Learning Experiences');
        });

        it('LX courses should have book icon',function(){
        expect(browseLXBannerPage.banner().getCourseIcon().isDisplayed()).toBe(true);
        });

    });

describe('change the language to French and Include English',function(){
        beforeAll(function(){
            browseLXBannerPage.banner().getIncludeEnglishCourses();
        });

        afterAll(function(){
           browseLXBannerPage.banner().closeLXPage();
        });

/!*
        it('LX banner Courses count should be at max 5',function(){
            expect(browseLXBannerPage.banner().getCoursesCount()).toBeLessThanOrEqual(5);
        });

        it('LX banner should have swimlane label as Immersive Learning Experience',function(){
            expect(browseLXBannerPage.banner().getSwimLaneLabel()).toBe('Immersive Learning Experiences');
        });

        it('LX courses should have book icon',function(){
            expect(browseLXBannerPage.banner().getCourseIcon().isDisplayed()).toBe(true);
        });*!/

    });
});*/

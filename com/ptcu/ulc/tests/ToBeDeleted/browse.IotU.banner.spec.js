/**
 * Created by saukumar on 07-11-2017.
 */
var LandingPage = require('../../pages/landing.page.js');
var BrowseBannerResultsPage = require('../../pages/browse.banner.page.js');
var exec = require('../../utils/specHelper');
var seeMoreData = require('../../resources/seeMoreData.json');
var landingPage = new LandingPage();
var IoTUBannerLane = new BrowseBannerResultsPage();
var ulcURL = browser.params.ulcOptions.ulcURL;
xdescribe('Browse ThingWorx for IOT Courses from home page', function () {

    beforeAll(function () {
        landingPage.goTo(ulcURL);
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[2], seeMoreData.familyToBrowse[2]);
    });

    afterAll(function () {
        exec.cleanUp();
    });

    describe('With Default All Version', function () {
        afterAll(function () {
            IoTUBannerLane.banner().closeIoTUPage();
        });
        it('IotU banner Courses count should be 4', function () {
            expect(IoTUBannerLane.banner().getCoursesCount()).toBe(4);
        });
         it('IotU banner should have an informative header', function () {
             expect(IoTUBannerLane.banner().getHeaderInfo()).toBe('Learn the Latest in IoT Development')
         });
        it('IotU banner should have an informative description ', function () {
            expect(IoTUBannerLane.banner().getSwimLaneLabel()).toBe('Learn at your own pace with our in-depth online IoT courses. Get the skills you need to become an IoT developer.')
        });
        it('IotU courses should have book icon', function () {
            expect(IoTUBannerLane.banner().getCourseIcon().isDisplayed()).toBe(true);
        });
        it('On click of this course verify that the course opens in a new tab/window', function () {
            expect(IoTUBannerLane.banner().ValidateACourse()).toContain('https://www.ptcu.com');

        });
    });

    describe('Change the version to a Random Version on spotlight page', function () {
        beforeAll(function () {
            IoTUBannerLane.banner().clickRandomVersion();
        });
        afterAll(function () {
            IoTUBannerLane.banner().closeIoTUPage();
        });
        it('IotU banner Courses count should be 4', function () {
            landingPage.clickOnGivenProduct(seeMoreData.productToBrowse[1]);
            expect(IoTUBannerLane.banner().getCoursesCount()).toBe(4);
        });
        it('IotU banner should have an informative header', function () {
            expect(IoTUBannerLane.banner().getHeaderInfo()).toBe('Learn the Latest in IoT Development')
        });
        it('IotU banner should have an informative description ', function () {
            expect(IoTUBannerLane.banner().getSwimLaneLabel()).toBe('Learn at your own pace with our in-depth online IoT courses. Get the skills you need to become an IoT developer.')
        });
        it('On click of this course verify that the course opens in a new tab/window', function () {
            expect(IoTUBannerLane.banner().ValidateACourse()).toContain('https://www.ptcu.com');

        });
    });

    describe('change the language to French and Include English', function () {
        beforeAll(function () {
            IoTUBannerLane.banner().getIncludeEnglishCourses();
        });
        afterAll(function () {
            IoTUBannerLane.banner().closeIoTUPage();
        });
        it('IotU banner Courses count should be 4', function () {
            expect(IoTUBannerLane.banner().getCoursesCount()).toBe(4);
        });
        it('IotU banner should have an informative header', function () {
            expect(IoTUBannerLane.banner().getHeaderInfo()).toBe('Learn the Latest in IoT Development')
        });
        it('IotU banner should have an informative description ', function () {
            expect(IoTUBannerLane.banner().getSwimLaneLabel()).toBe('Learn at your own pace with our in-depth online IoT courses. Get the skills you need to become an IoT developer.')
        });
        it('On click of this course verify that the course opens in a new tab/window', function () {
            expect(IoTUBannerLane.banner().ValidateACourse()).toContain('https://www.ptcu.com');
            browser.executeScript('window.close()');
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[0]);
            });
        });
    });

});
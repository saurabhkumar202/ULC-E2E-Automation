/**
 * Created by bgupta on 16-11-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var VideoDetailPage = require('../../pages/videoDetail.page.js');
var Header_Footer = require('../../pages/header.footer.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var exec = require('../../utils/specHelper');
var DummyClient = require('../../pages/dummy.client.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');

describe('Lead generation login pop-up', function () {
    var browser2;
    var landingPage = new LandingPage();
    var headerFooter = new Header_Footer();
    var videoDetail = new VideoDetailPage();
    var productToBrowse1 = "ThingWorx";
    var productToBrowse2 = "Integrity";
    var browseResultsPage = new BrowseResultsPage();
    var ulcURL = browser.params.ulcOptions.ulcURL;
    var relatedVideoToPlay = 4;
    // var browsePageVideosToPlay = 5;
    var dummyClient = new DummyClient();

    beforeAll(function () {
        landingPage.goTo(ulcURL);
    });


    afterAll(function () {
        exec.cleanUp();
    });

    it('Should browse a product and click on the lex tutorial', function () {
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[2], seeMoreData.familyToBrowse[2]);
        browser.waitForAngular();
        browseResultsPage.getFirstTutorial.click();
        browser.waitForAngular();
    });

    it('Should verify the Video detail page', function () {
        var relatedVideoHeader = "Related Content";
        videoDetail.waitForVideoToAppear();
        expect(videoDetail.videoPlayer.isPresent()).toBe(true);
        expect(headerFooter.isAt).toBe(true);
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
        expect(videoDetail.communityForumLnk().isDisplayed()).toBe(true, "Community forum link is missing");
        expect(videoDetail.videoTitle.isDisplayed()).toBe(true, "Video title is missing");
        expect(videoDetail.videoDescription.isDisplayed()).toBe(true, "Video description is missing");
        expect(videoDetail.videoPlayer.isDisplayed()).toBe(true, "Video player is missing");
        expect(videoDetail.viewInfoTxt.isDisplayed()).toBe(true, "Video info message is missing");
        expect(videoDetail.viewInfoTxt).toContain("Views", "Level", "Created by");
        expect(videoDetail.relatedVideoTitle.isDisplayed()).toBe(true, "Related video title is missing");
        expect(videoDetail.relatedVdoTitleTxt).toContain(relatedVideoHeader);
        expect(videoDetail.isRelatedVideosDisplayed).toBe(true, "Related videos are missing");

    });

    it('Should play 5 videos in the Video details page', function () {
        expect(headerFooter.isAt).toBe(true);
        expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
        videoDetail.clickVideoPlayer().then(function () {
            browser.sleep(10000);//Need to play video for 10 seconds
            console.log("Clicked");

        });
        browser.waitForAngular();
        videoDetail.playVideosInVideoDetailPage(relatedVideoToPlay);
        videoDetail.lastVideo();
    });

    it('Should verify the login pop-up', function () {
        browser.waitForAngular();
        expect(headerFooter.signInPopup.isDisplayed()).toBe(true);
        expect(headerFooter.closeSignInFormBtn().isDisplayed()).toBe(true, "Close button in sign in window is missing");
        headerFooter.closeSignInFormBtn().click();
    });

    it('Restart browser and should play 5 videos of a different product family in the same swimlane', function () {
        browser.restart();
        browser.manage().window().maximize();
        landingPage.goTo(ulcURL);
        expect(headerFooter.isAt).toBe(true);
        var count = 0;
        browsePlayTutorial(count);

        function browsePlayTutorial(count) {
            headerFooter.lnkHome.click();
            expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
            //landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
           // browser.waitForAngular();
            browseResultsPage.browseContentButton.click();
            browser.waitForAngular();
            browseResultsPage.clickBrowseProduct(seeMoreData.productToBrowse[4]);
            browser.waitForAngular();
            browseResultsPage.getFirstTutorial.click();
            browser.waitForAngular();
            videoDetail.waitForVideoToAppear();
            console.log("counter" + count);
            videoDetail.clickAndCountVideoPlayer(count).then(function resolve(loc) {
                return loc;
            }).then(function (fcount) {
                //console.log("counter" + fcount);
                if (fcount < 5) {
                    browsePlayTutorial(fcount);
                }
                else {
                    headerFooter.lnkHome.click();
                    expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
                    //landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
                    browser.waitForAngular();
                    browseResultsPage.browseContentButton.click();
                    browser.waitForAngular();
                    browseResultsPage.clickBrowseProduct(seeMoreData.productToBrowse[4]);
                    browser.waitForAngular();
                    //browser.waitForAngular();
                    browseResultsPage.getFirstTutorial.click();
                }
            });
        }
    });

    it('Should verify the login pop-up', function () {
        browser.waitForAngular();
        expect(headerFooter.signInPopup.isDisplayed()).toBe(true);
        expect(headerFooter.closeSignInFormBtn().isDisplayed()).toBe(true, "Close button in sign in window is missing");
        headerFooter.closeSignInFormBtn().click();

    });

    it('Capability to play 5 videos for the single/multiple tutorial videos for a product family in the same swimlane', function () {
        browser.restart();
        browser.manage().window().maximize();
        landingPage.goTo(ulcURL);
        var count = 0;
        expect(headerFooter.isAt).toBe(true);
        browseTutorial(count);

        function browseTutorial(count) {
            headerFooter.lnkHome.click();
            expect(headerFooter.signInLink.isDisplayed()).toBe(true, "SignIn link is missing");
            //landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
            browser.waitForAngular();
            browseResultsPage.browseContentButton.click();
            browser.waitForAngular();
            browseResultsPage.clickBrowseProduct(seeMoreData.productToBrowse[4]);
            browser.waitForAngular();
            browseResultsPage.getFirstTutorial.click();
            videoDetail.waitForVideoToAppear();
            videoDetail.clickMultipleVideoPlayer(count).then(function (tcount) {
                //console.log("updated Value of count is " + tcount);
                return tcount;

            }).then(function (tcount) {
                if (tcount < 5) {
                    browseTutorial(tcount);
                }
                else {
                    console.log("Played 5 videos");
                    headerFooter.lnkHome.click();
                    //landingPage.clickOnGivenProduct(seeMoreData.productFamily[0], seeMoreData.familyToBrowse[0]);
                    browser.waitForAngular();
                    browseResultsPage.browseContentButton.click();
                    browser.waitForAngular();
                    browseResultsPage.clickBrowseProduct(seeMoreData.productToBrowse[4]);
                    browser.waitForAngular();
                    browseResultsPage.getFirstTutorial.click();
                }
            });
        }
    });

    it('Should verify the login pop-up', function () {
        browser.waitForAngular();
        expect(headerFooter.signInPopup.isDisplayed()).toBe(true, "Sign in form is missing");
        expect(headerFooter.closeSignInFormBtn().isDisplayed()).toBe(true, "Close button in sign in window is missing");
        headerFooter.closeSignInFormBtn().click();
    });


});
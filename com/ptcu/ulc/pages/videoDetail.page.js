/**
 * Created by bgupta on 29-11-2016.
 */

'use strict';

var locRepo = require('../resources/locatorRepository.json');
var headerFooter = require('./header.footer.page.js');

var VideoDetailPage = function () {
};
VideoDetailPage.prototype = Object.create(headerFooter.prototype, {

    videoTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.videoTitle));
        }
    },

    videoDescription: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.videoDescription));
        }
    },

    videoPlayer: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.videoPlayer));
        }
    },
    btnVideoPause: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.videoPause));
        }
    },
    videoPause: {
        value: function () {
            return this.btnVideoPause();
        }
    },
    videoForward: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.videoForward)).click();
        }
    },
    multipleVideoPlayer: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.videoDetailPage.videoPlayer));
        }
    },

    clickVideoPlayer: {
        value: function () {
            return this.videoPlayer.click();
        }
    },

    clickAndCountVideoPlayer: {
        value: function (count) {
            return this.videoPlayer.click().then(function () {
                browser.sleep(10000);//Need to play video for 10 seconds
                console.log("played Video" + (count + 1));
                return count + 1;
            });
        }
    },
    clickMultipleVideoPlayer: {
        value: function (count) {
            //browser.sleep(5000);
            //console.log("Trying to play video");
            var playedVideoCount;
            var temp = count;
            return this.multipleVideoPlayer.then(function abc(items) {
                for (var i = 0, temp = count; i < items.length && temp < 6; i++, temp++) {
                    playVideo(items[i], temp).then(function resolve(loc) {
                        //console.log("new count is" + loc);
                        playedVideoCount = loc;

                    }, function reject(toc) {
                        /*console.log("Last count is" + toc);
                         console.log("Lets Stop");*/

                    });
                }

            }).then(function () {
                return playedVideoCount;
            });

            function playVideo(elem, currentCount) {

                if (currentCount < 5) {
                    return elem.click().then(function () {
                        browser.sleep(9000);
                        console.log("Clicked Video " + (currentCount + 1));
                        // currentCount = (currentCount + 1);
                        return (currentCount + 1);
                    });
                }
                if (currentCount >= 5) {
                    return new Promise(function (resolve, reject) {
                        reject(currentCount);
                    });
                }

            }
        }

    }
    ,

    communityForumLnk: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.communityForumLnk));
        }
    },

    viewInfo: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.viewInfo));
        }
    },
    viewInfoTxt: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.viewInfo)).getText();
        }
    },

    relatedVideoTitle: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.videoDetailPage.relatedVideosHeader));
        }
    },

    relatedVdoTitleTxt: {
        get: function () {
            return this.relatedVideoTitle.getText();
        }
    },
    relatedVideos: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.videoDetailPage.relatedVideos));
        }
    },
    isRelatedVideosDisplayed: {
        get: function () {
            return this.relatedVideos.isDisplayed().then(function (displayArray) {
                return displayArray.reduce(function (shouldBeTrue, isVideoDisplayed) {
                    return shouldBeTrue === isVideoDisplayed;
                }, true);
            });
        }
    },
    firstRelatedVideoTitle: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.videoDetailPage.ttlRelatedVideos)).first().getText();
        }
    },
    clickFirstRelatedVideo: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.videoDetailPage.relatedVideosThumb)).first().click();
        }
    },

    playVideosInVideoDetailPage: {
        value: function (count) {
            var listOfVideosPlayed = [];
            var tempTitle;
            var that = this;
            for (var i = 0; i < count; i++) {
                this.firstRelatedVideoTitle.then(function (title) {
                    tempTitle = title;
                    //console.log('1',title);
                });
                this.clickFirstRelatedVideo.then(function () {
                    var data = listOfVideosPlayed.filter(function (elem) {
                        return elem === tempTitle;
                    });
                    //console.log('2',listOfVideosPlayed);
                    if (!data.length) {
                        listOfVideosPlayed.push(tempTitle);
                        that.waitForVideoToAppear();
                        expect(that.videoPlayer.isPresent()).toBe(true);
                        that.clickVideoPlayer().then(function () {
                            browser.sleep(10000);//Need to play video for 10 seconds
                            console.log("Clicked");

                        });
                    }
                })
            }
        }
    },

    lastVideo: {
        value: function () {
            this.clickFirstRelatedVideo.then(function () {
                console.log("clickedlast ")
            });
        }

    },
    waitForVideoToAppear: {
        value: function () {
            var that = this;
            browser.wait(function () {
                //console.log("Still Waiting for video to appear");
                return that.videoPlayer.isPresent().then(function (disp) {
                    return disp;
                });
            }, 30000);
        }
    },

    waitForVideoToPlay: {
        value: function () {
            var that = this;
            browser.wait(function () {
                return that.videoPause().isPresent().then(function (disp) {
                    return disp;
                });
            }, 30000);
        }
    }


});

module.exports = VideoDetailPage;

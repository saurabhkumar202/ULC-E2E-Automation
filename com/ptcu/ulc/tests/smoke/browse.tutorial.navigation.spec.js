/**
 * Created by dghan on 03-08-2016.
 */

'use strict';

var LandingPage = require('../../pages/landing.page.js');
var BrowseResultsPage = require('../../pages/browse.results.page.js');
var SearchResultsPage = require('../../pages/search.results.page.js');
var TutorialNewSeeMore = require('../../pages/tutorial.new.seemore.page.js');
var TutorialSeeMorePage = require('../../pages/tutorial.seemore.page.js');
var TutorialsResultsDetailsPage = require('../../pages/tutorial.results.details.page.js');
var exec = require('../../utils/specHelper');
var Header_footer_Page = require('../../pages/header.footer.page.js');
var seeMoreData = require('../../resources/seeMoreData.json');
var landingPage;
var browseResultsPage = new BrowseResultsPage();
var searchResultsPage = new SearchResultsPage();
var tutorialSeeMore = new TutorialNewSeeMore();
var tutorialSeeMorePage = new TutorialSeeMorePage();
var headerFooterPage = new Header_footer_Page();
var ulcURL = browser.params.ulcOptions.ulcURL;
var productToBrowse = "ThingWorx";
var productToBrowse1 = "ThingWorx Manufacturing Apps";
var tutorialsResultsDetailsPage = new TutorialsResultsDetailsPage();
var resultTitle;
var resultDescription;
var tutFound = false;
var searchTerm = "thingworx";


describe('Browse product from landing page and verify the navigation of result type -Tutorial', function () {

    beforeAll(function () {
        landingPage = new LandingPage();
        landingPage.goTo(ulcURL);
    });
    afterAll(function () {
        exec.cleanUp();
    });

    it('Browse-Click on tutorial should open the tutorial in details page', function () {
        landingPage.clickOnGivenProduct(seeMoreData.productFamily[2], seeMoreData.familyToBrowse[2]);
        browser.waitForAngular();
        browseResultsPage.getTutorial.getText().then(function (title) {
            tutFound = true;
            browseResultsPage.getTutorialTitle.getText().then(function (title) {
                resultTitle = title;
            });
            browseResultsPage.getTutorialDescription.getText().then(function (description) {
                resultDescription = description;
            });
            browseResultsPage.getFirstTutorial.click();
            browser.waitForAngular();
            tutorialsResultsDetailsPage.getFirstTutorialResultTitle.then(function (detailsTitle) {
                expect(detailsTitle).toEqual(resultTitle);
            });
            tutorialsResultsDetailsPage.getFirstTutorialResultDescription.then(function (resultDescription) {
                expect(resultDescription).toEqual(resultDescription);
            });
            expect(tutorialsResultsDetailsPage.isRelatedArticlesDisplayed).toBe(true);
        }, function reject(err) {
            console.log("Check for see more link");
            browser.waitForAngular();
            browseResultsPage.tutorialsSeeMoreLink.isDisplayed().then(function resolve() {
                    console.log("See more link is available.");
                    browseResultsPage.tutorialsSeeMoreLink.click();
                    tutorialSeeMore.TutContent().getFirstLexTutorial().getText().then(function resolve(txt) {
                            tutFound = true;
                            console.log("Lex tutorial found.");
                            getFirstLextutorialDetailsFromSeeMorePage();
                        }, function reject() {
                            findFirstLextutorialOnSeeMorePage();
                        }
                    );
                }, function reject() {
                    console.log("See more link is not available. No lex tutorial found.")
                }
            );
        });

    });

    function findFirstLextutorialOnSeeMorePage() {
        console.log("Check for See more button");
        browser.waitForAngular();
        tutorialSeeMore.TutContent().getSeeMorePageBtn().isDisplayed().then(function resolve(flag) {
                if (flag) {
                    console.log("Found see more button");
                    browser.waitForAngular();
                    tutorialSeeMore.TutContent().getSeeMorePageBtn().click().then(function resolve() {
                            console.log("Clicked on see more button");
                        }
                    );

                    browser.waitForAngular();
                    tutorialSeeMore.TutContent().getFirstLexTutorial().getText().then(function resolve() {
                            console.log("Lex tutorial found.");
                            tutFound = true;
                            getFirstLextutorialDetailsFromSeeMorePage();
                        },
                        function reject() {
                            findFirstLextutorialOnSeeMorePage();
                        });
                }
                else
                    console.log("See more button is not available. No Lex tutorial found.")
            },
            function reject() {
                console.log("Exception found while fetching see more button.")

            }
        )
    }

    function getFirstLextutorialDetailsFromSeeMorePage() {

        tutorialSeeMore.TutContent().getFirstLexTutorialTitle().getText().then(function (title) {
            resultTitle = title;
        });
        tutorialSeeMore.TutContent().getFirstLexTutorialDescription().getText().then(function (description) {
            resultDescription = description;
        });
        tutorialSeeMore.TutContent().getFirstLexTutorial().click();
        browser.waitForAngular();
        tutorialsResultsDetailsPage.getFirstTutorialResultTitle.then(function (detailsTitle) {
            expect(detailsTitle).toEqual(resultTitle);
        });
        tutorialsResultsDetailsPage.getFirstTutorialResultDescription.then(function (resultDescription) {
            expect(resultDescription).toEqual(resultDescription);
        });
        expect(tutorialsResultsDetailsPage.isRelatedArticlesDisplayed).toBe(true);

    };

    it('Should display the title of the tutorial on page title', function () {
        if (tutFound)
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(resultTitle + " | PTC Learning Connector");
        else
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(searchTerm + " | PTC Learning Connector");
    });

    it('Search for a term and verify the navigation of result type -Tutorial', function () {
        tutFound = false;
        landingPage.goTo(ulcURL);
        landingPage.homeSearchBar.sendKeys(searchTerm);
        landingPage.homeSearchBarButton.click();
        browser.waitForAngular();
        searchResultsPage.getTutorial.getText().then(function (title) {
            tutFound = true;
            searchResultsPage.getTutorialTitle.getText().then(function (title) {
                resultTitle = title;
            });
            searchResultsPage.getTutorialDescription.getText().then(function (description) {
                resultDescription = description;
            });
            searchResultsPage.getFirstTutorial.click();
            browser.waitForAngular();
            tutorialsResultsDetailsPage.getFirstTutorialResultTitle.then(function (detailsTitle) {
                expect(detailsTitle).toEqual(resultTitle);
            });
            tutorialsResultsDetailsPage.getFirstTutorialResultDescription.then(function (resultDescription) {
                expect(resultDescription).toEqual(resultDescription);
            });
            expect(tutorialsResultsDetailsPage.isRelatedArticlesDisplayed).toBe(true);
        }, function reject(err) {
            console.log("Check for see more link");
            browser.waitForAngular();
            searchResultsPage.tutorialsSeeMoreLink.isDisplayed().then(function resolve() {
                console.log("See more link is available.");
                searchResultsPage.tutorialsSeeMoreLink.click();
                tutorialSeeMore.TutContent().getFirstLexTutorial().getText().then(function resolve(txt) {
                    console.log("Lex tutorial found.");
                    getFirstLextutorialDetailsFromSeeMorePage();
                }, function reject() {
                    findFirstLextutorialOnSeeMorePage();
                });
            }, function reject() {
                console.log("See more link is not available. No text tutorial found.")
            });
        });

    });
    it('Should display the title of the tutorial on page title', function () {
        if (tutFound)
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(resultTitle + " | PTC Learning Connector");
        else
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(searchTerm + " | PTC Learning Connector");
    });
    it("Browse or SeeMore-Click on text tutorial should open the text tutorial in details page", function () {
        tutFound = false;
        headerFooterPage.browseContentButton.click();
        element(by.linkText("ThingWorx Manufacturing Apps")).click();
        browser.waitForAngular();
        browseResultsPage.getFirstTextTutorial.getText().then(function resolve(text) {
            tutFound = true;
            console.log("Text tutorial found.");
            getTextTutorialDetails();
        }, function reject(err) {
            console.log("Check for see more link");
            browser.waitForAngular();
            browseResultsPage.tutorialsSeeMoreLink.isDisplayed().then(function resolve() {
                    console.log("See more link is available.");

                browser.wait(function () {
                    browser.sleep(2000);
                    return browseResultsPage.tutorialsSeeMoreLink.isDisplayed()
                        .then(
                            function (isDisplayed) {
                                return isDisplayed;
                            },
                            function (error){
                                return false
                            });
                }, 20 * 1000);

                    //browser.wait(ExpectedConditions.elementToBeClickable(browseResultsPage.tutorialsSeeMoreLink), 15000);
                    browseResultsPage.tutorialsSeeMoreLink.click();
                    browseResultsPage.getFirstTextTutorial.getText().then(function resolve() {
                            tutFound = true;
                            console.log("Text tutorial found.");
                            getTextTutorialDetails();
                        }, function reject() {
                            findTextTutorialFromSeeMorePage();
                        }
                    );
                }, function reject() {
                    console.log("See more link is not available. No text tutorial found.")
                }
            );
        })

    });
    it('Should display the title of the text tutorial on page title', function () {
        browser.waitForAngular();
        if (tutFound) {
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(resultTitle + " | PTC Learning Connector");
        }
        else
            expect(tutorialsResultsDetailsPage.getPageTitle).toEqual(searchTerm + " | PTC Learning Connector");
    });

    function getTextTutorialDetails() {
        browseResultsPage.getTextTutorialTitle.getText().then(function (title) {
            resultTitle = title;
            console.log("First text tutorial title is -" + resultTitle)
        });
        browseResultsPage.getTextTutorialDescription.getText().then(function (description) {
            resultDescription = description;
            console.log("First text tutorial description is -" + resultDescription);
        });

      //  browser.manage().timeouts().implicitlyWait(0);
        browser.wait(function () {
            browser.sleep(2000);
            return browseResultsPage.getFirstTextTutorial.isDisplayed()
                .then(
                    function (isDisplayed) {
                        return isDisplayed;
                    },
                    function (error){
                        return false
                    });
        }, 20 * 1000);

        //browser.wait(ExpectedConditions.elementToBeClickable(browseResultsPage.getFirstTextTutorial), 15000);
        browseResultsPage.getFirstTextTutorial.click();
        browser.waitForAngular();
        tutorialsResultsDetailsPage.getFirstTutorialResultTitle.then(function (detailsTitle) {
            expect(detailsTitle).toEqual(resultTitle);
        });
        tutorialsResultsDetailsPage.getFirstTutorialResultDescription.then(function (titleDescription) {
            expect(titleDescription).toEqual(resultDescription);
        });
        expect(tutorialsResultsDetailsPage.isRelatedArticlesDisplayed).toBe(true);
    }

    function findTextTutorialFromSeeMorePage() {
        console.log("Check for See more button");
        browser.waitForAngular();
        tutorialSeeMorePage.getSeeMorePageBtn.isDisplayed().then(function resolve(flag) {
                if (flag) {
                    console.log("Found see more button");
                    browser.waitForAngular();
                    tutorialSeeMorePage.clickSeeMorePageBtn().then(function resolve() {
                            console.log("Clicked on see more button");
                        }
                    );
                    browser.waitForAngular();
                    browseResultsPage.getFirstTextTutorial.getText().then(function resolve() {
                            console.log("Text tutorial found.");
                            flag = true;
                            getTextTutorialDetails();
                        },
                        function reject() {
                            findTextTutorialFromSeeMorePage();
                        })

                }

                else
                    console.log("See more button is not available. No Lex tutorial found.")
            },
            function reject() {
                console.log("See more button is not available. No text tutorial found.")

            }
        )

    }

});



/**
 * Created by dghan on 18-11-2016.
 */
var locRepo = require('../resources/locatorRepository.json');
var HeaderFooter = require('./header.footer.page.js');
var LC_WINDOW = 1;
var TWX_WINDOW = 0;
var thingworxURL = browser.params.ulcOptions.thingworxURL;

var ThingworxApplication = function () {
};

ThingworxApplication.prototype = Object.create(HeaderFooter.prototype, {
    helpLinkThingworx:{
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.thingworx.helpButtonThingworx));
        }
    },
    learningConnectorLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.thingworx.lnkLearningConnector));
        }
    },
    homeLink: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.thingworx.thingworxHome));
        }
    },
    ThingTemplatesLink: {
        get: function () {
            return element.all(this.getLocator(locRepo.pageObjects.thingworx.thingTemplates)).last();
        }
    },
    clickNewButton: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.thingworx.thingworxNewButton));
        }
    },
    clickNewThing: {
        get: function () {
            return element(this.getLocator(locRepo.pageObjects.thingworx.btnNewThing));
        }
    },
    openLCFromTWX: {
        value: function () {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.elementToBeClickable(this.helpLinkThingworx), 10000);
            this.helpLinkThingworx.click();
            browser.wait(EC.elementToBeClickable(this.learningConnectorLink), 10000);
            this.learningConnectorLink.click();
            this.switchOn(browser.params.windowHandles.ULC).then(function(){
                browser.getTitle().then(function(title){
                    console.log('ULC title '+title);
                });
                browser.waitForAngular();
            });

         //   browser.manage().window().maximize();
          //  browser.wait(protractor.ExpectedConditions.presenceOf(this.browseContentButton), 15000);
        }
    },
    commandTitle: {
        value: function () {
            return element(this.getLocator(locRepo.pageObjects.searchResultsPage.pageHeaderTitle)).getAttribute("title");
        }
    },
    getCommandForHome: {
        get: function () {
            this.switchOn(browser.params.windowHandles.TWX);
            // this.goToWindow(TWX_WINDOW);
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(this.homeLink), 15000);
            return this.homeLink.getAttribute('tab-cmd').then(function (homeCmd) {
                return homeCmd;
            });
        }
    },
    clickHomeOnTWX: {
        value: function () {
            browser.driver.sleep(5000);
            this.homeLink.click();
            browser.driver.sleep(15000);
            //this.goToWindow(LC_WINDOW)
            this.switchOn(browser.params.windowHandles.ULC)
        }
    },

    clickThingTemplateOnTWX: {
        value: function () {
            this.switchOn(browser.params.windowHandles.TWX);
            browser.driver.sleep(10000);

            this.ThingTemplatesLink.getText().then(function (value) {
                console.log("getText() :" + value);
            });

            this.ThingTemplatesLink.click();
            browser.driver.sleep(15000);
            this.switchOn(browser.params.windowHandles.ULC);
        }
    },
    clickNewThingOnTWX: {
        value: function () {
            this.switchOn(browser.params.windowHandles.TWX);
            browser.driver.sleep(10000);
            this.clickNewButton.click();
            browser.driver.sleep(5000);
            //this.clickNewThing.click();
            browser.executeScript('document.getElementsByClassName(\'entity-type-THING\')[7].click();');
            browser.driver.sleep(35000);
            this.switchOn(browser.params.windowHandles.ULC).then(function(){
                browser.getTitle().then(function(title){
                    console.log("spec 2 ulc title "+title);
                })
            });
           // browser.driver.manage().window().maximize();
        }
    },

    goToWindow: {
        value: function (state) {
            browser.getAllWindowHandles().then(function (handles) {
                //     console.log(handles);
                var newWindowHandle = handles[state];

                browser.switchTo().window(newWindowHandle);
                browser.driver.manage().window().maximize();
            })
        }
    }
});

module.exports = ThingworxApplication;

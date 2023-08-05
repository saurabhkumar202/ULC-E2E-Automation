/**
 * Created by rdewangan on 22-11-2016.
 */
'use strict';

var LandingPage = require('../../pages/landing.page.js');
var WindchillApplication = require('../../pages/windchill.application.page.js');
var exec = require('../../utils/specHelper');

var windchillURL = browser.params.ulcOptions.windchillURL;
var landingPage = new LandingPage();
var windchillApplication = new WindchillApplication();
var HeaderFooter = require('../../pages/header.footer.page.js');
var headerFooter = new HeaderFooter();
var expectedcommandHome = "What's New in PTC Windchill 11.0";

describe('launch ULC from windchill application', function () {

    afterAll(function () {
        exec.cleanUp();
    });

    it('Should launch windchill application and verify connectorHome command', function () {
        windchillApplication.runOnNonAngular(function () {
            windchillApplication.goTo(windchillURL);
            browser.driver.manage().window().maximize();
            browser.sleep(10000);
            windchillApplication.openLCFromwindchill();
            browser.sleep(5000);
        });
        browser.waitForAngular();
        expect(headerFooter.isAt).toBe(true);
        windchillApplication.commandTitle().then(function (title) {
            expect(title).toMatch(expectedcommandHome);
        })
    });
    it('should send command to ulc and verify command title', function () {
        windchillApplication.runOnNonAngular(function () {
            headerFooter.switchOn(browser.params.windowHandles.WINDCHILL);
            windchillApplication.sendCommand();
        });
        browser.waitForAngular();
        windchillApplication.getURL.then(function (currentURL) {
            var expectedURL = "^https.*learningconnector.*recommendations.*command.*table.*save.*View.*";
            expect(currentURL).toMatch(expectedURL);
        })
    });

});
/**
 * Created by dghan on 6/15/2016.
 */

'use strict';

var ThingWorxApplication = require('../../pages/thingworx.application.page.js');
var HeaderFooter = require('../../pages/header.footer.page.js');
var exec = require('../../utils/specHelper');
var connectedModeSpecification = require('../../resources/connectedModeSpecification.json');

var thingworxApplication = new ThingWorxApplication();
var headerFooter = new HeaderFooter();
var ulcUrl = browser.params.ulcOptions.ulcURL;
var expectedULCURL;
var cmd = "browse/All";
var thingworxURL = browser.params.ulcOptions.thingworxURL;
var expression = ulcUrl + '/recommendations.*connectedVersion=8\.4&command=.*&connectedProduct=thingworx&recommendContext=true';

describe('Thingworx LC Integration Test', function () {

    afterAll(function () {
        exec.cleanUp();
    });


    it('Launch Learning Connector from Thingworx and verify respective commands is send to LC', function () {
        thingworxApplication.runOnNonAngular(function () {
            thingworxApplication.goTo(thingworxURL);
            browser.driver.manage().window().maximize();
              browser.sleep(15000);
            thingworxApplication.openLCFromTWX();
            browser.sleep(15000);
            // browser.waitForAngular();
            browser.manage().window().maximize()
            expect(headerFooter.isAt).toBe(true);
            expect(headerFooter.getURL).toMatch(expression);
            headerFooter.getURL.then(function (currentURL) {

                expectedULCURL = ulcUrl + "/recommendations?connectedVersion=" + connectedModeSpecification.connectedMode.URLDetails.connectedVersion + "&command=" + cmd + "&connectedProduct=thingworx&recommendContext=true";

                expect(currentURL.replace(/%2F/g, '/')).toBe(expectedULCURL);
            });
        });
    });

        it('should send command to ulc and verify command title', function () {

            var thingCommand = "create/Thing";

            thingworxApplication.runOnNonAngular(function () {
                thingworxApplication.clickNewThingOnTWX();
            });
            browser.sleep(10000);
            browser.waitForAngular();
            headerFooter.getURL.then(function (currentURL) {

                expectedULCURL = ulcUrl
                    + "/recommendations?recommendContext=true&connectedProduct=thingworx&connectedVersion=" + connectedModeSpecification.connectedMode.URLDetails.connectedVersion + "&command="
                    + thingCommand;

                expect(currentURL.replace(/%2F/g, '/')).toBe(expectedULCURL);
            });
        });
    });


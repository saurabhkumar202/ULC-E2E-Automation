/**
 * Created by pankumar on 20-06-2016.
 */

'use strict'

var apiSpec = require("../resources/apiSpecification.json");
var Proxy = require("browsermob-proxy-api");
var Q = require("q");
var nodemailer = require('nodemailer');

var Helper = function () {

};

Helper.prototype = Object.create({}, {

    apiLog: {
        value: []
    },

    getLocator: {
        value: function (locator) {

            switch (locator.method) {
                case "id":
                    return by.id(locator.value);
                case "model":
                    return by.model(locator.value);
                case "binding":
                    return by.binding(locator.value);
                case "repeater":
                    return by.repeater(locator.value);
                case "xpath":
                    return by.xpath(locator.value);
                case "css":
                    return by.css(locator.value);
                case "options":
                    return by.options(locator.value);
                case "linkText":
                    return by.linkText(locator.value);
                case "buttonText":
                    return by.buttonText(locator.value);
                case "className":
                    return by.className(locator.value);


            }
        }
    },
    getExpectedUrl: {
        value: function (productName) {
            return productName;
        }
    },
    goTo: {
        value: function (link) {
            browser.get(link);
        }
    },
    getURL: {
        get: function () {
            return browser.getCurrentUrl();
        }
    },
    goToBrowserBack: {
        get: function () {
            browser.navigate().back();
        }
    },

    isAt: {
        value: function () {
            console.log("<helper.js> : Please provide your page specific implementation .....");
        }
    },
    getBrowserErrors: {
        value: function (cb) {
            browser.manage().logs().get('browser').then(function (browserLogs) {
                cb(browserLogs.filter(function (log) {
                    return /"level":"error"/.test(log.message);
                }).map(function (log) {
                    return log.message;
                }));
            });
        }
    },
    startFreshNetworkCapture: {
        value: function () {
            return browser.controlFlow().execute(function () {
                var proxy = new Proxy(browser.params.proxy);
                return Q.ninvoke(proxy, 'createHAR', browser.params.proxyPort, {
                    'initialPageRef': 'ULC1',
                    'captureContent': 'true'
                });
            });
        }
    },
    getCurrentHARDetails: {
        value: function (apiType, getData, cb) {

            getData = getData || "both";
            var that = this;

            return browser.controlFlow().execute(function () {
                var proxy = new Proxy(browser.params.proxy);
                return Q.ninvoke(proxy, 'getHAR', browser.params.proxyPort).then(function (harData) {
                    var harJSONData = JSON.parse(harData);
                    var regex = new RegExp(apiType);
                    //console.log(apiType);
                    var data = harJSONData.log.entries.filter(function (obj) {
                        //console.log(regex.test(obj.request.url));
                        return regex.test(obj.request.url);
                    }).map(function (obj) {
                        if (getData === "both") {
                            //console.log("I am in both");
                            return {
                                "queryString": that.formatQueryString(obj.request.queryString),
                                "url": obj.request.url,
                                "status": obj.response.status,
                                "content": that.formatContent(obj.response.content.text)
                            };
                        }
                        else if (getData == "queryString") {
                            //console.log("I am in queryString");
                            return {
                                "queryString": that.formatQueryString(obj.request.queryString),
                                "url": obj.request.url
                            };
                        }
                        else if (getData == "content") {
                            //console.log("I am in content");
                            return {
                                "url": obj.request.url,
                                "content": that.formatContent(obj.response.content.text)
                            };
                        }
                        else if (getData == "status"){

                            //console.log("I am in content");
                            return {
                                "status": obj.response.status
                            };

                    }});
                    cb(data);
                }, function (err) {
                    console.log(err);
                });
            });
        }
    },

    formatQueryString: {
        value: function (queryStringArray) {
            var queryStringObj = {};
            queryStringArray.forEach(function (query) {
                queryStringObj[query.name] = query.value;
            });

            return queryStringObj;
        }
    },

    formatContent: {
        value: function (content) {
            return /\((.*)\)/.exec(content) &&
                (   /{(.*)}/.exec(/\((.*)\)/.exec(content)[1]) &&
                    JSON.parse(/\((.*)\)/.exec(content)[1]) ||
                    /\((.*)\)/.exec(content)[1]
                ) ||
                (   /{(.*)}/.exec(content) &&
                    JSON.parse(content) ||
                    content
                );
        }
    },

    verifyAPISpecification: {
        value: function (responses, apiType) {

            var APISpec = null;

            if (apiType === browser.params.apiType.PLMS_BROWSE) {
                APISpec = apiSpec["PLMS_BROWSE"];
            } else if (apiType === browser.params.apiType.PLMS_SEARCH) {
                APISpec = apiSpec["PLMS_SEARCH"];
            } else if (apiType === browser.params.apiType.FEDERATED_SEARCH) {
                APISpec = apiSpec["FEDERATED_SEARCH"];
            }else if (apiType === browser.params.apiType.FEDERATED_RECOMMENDATION) {
                    APISpec = apiSpec["FEDERATED_SEARCH"];
            } else if (apiType === browser.params.apiType.FEDERATED_HC_BROWSE) {
                APISpec = apiSpec["FEDERATED_HC_BROWSE"];
            } else if (apiType === browser.params.apiType.FEDERATED_TA_BROWSE) {
                APISpec = apiSpec["FEDERATED_TA_BROWSE"];
            } else if (apiType === browser.params.apiType.UNIFIED_TUTORIAL_TOPIC) {
                APISpec = apiSpec["UNIFIED_TUTORIAL_TOPIC"];
            } else if (apiType === browser.params.apiType.UNIFIED_TUTORIAL_TOPIC_SEARCH) {
                APISpec = apiSpec["UNIFIED_TUTORIAL_TOPIC_SEARCH"];
            } else if (apiType === browser.params.apiType.FEDERATED_LEX_USE_CASE) {
                APISpec = apiSpec["FEDERATED_LEX_USE_CASE"];
            } else if (apiType === browser.params.apiType.SYS_MSG_SAVE) {
                APISpec = apiSpec["SYS_MSG_SAVE"];
            } else if (apiType === browser.params.apiType.SYS_MSG_GET) {
                APISpec = apiSpec["SYS_MSG_GET"];
            } else if (apiType === browser.params.apiType.SYS_MSG_EDIT) {
                APISpec = apiSpec["SYS_MSG_GET"];
            } else if (apiType === browser.params.apiType.SYS_MSG_DELETE) {
                APISpec = apiSpec["SYS_MSG_GET"];
            } else if (apiType === browser.params.apiType.THINGWORX_RECOMMENDATION) {
                APISpec = apiSpec["THINGWORX_RECOMMENDATION"];
            } else if (apiType === browser.params.apiType.PLMS_FALLBACK) {
                APISpec = apiSpec["RECOMMENDATION"];
            } else if (apiType === browser.params.apiType.RECOMMENDATION) {
                APISpec = apiSpec["PLMS_RECOMMENDATION"];
            } else if (apiType === browser.params.apiType.BANNER_BROWSE) {
                APISpec = apiSpec["BANNER_BROWSE"];
            } else if (apiType === browser.params.apiType.LX_BANNER_LAUNCH) {
                APISpec = apiSpec["LX_BANNER_LAUNCH"];
            } else if (apiType === browser.params.apiType.ILE_COURSE) {
                APISpec = apiSpec["ILE_COURSE"];
            } else if (apiType === browser.params.apiType.ADS_TUTORIAL) {
                APISpec = apiSpec["ADS_TUTORIAL"];
            }



            //clean the APILog before validating the response
            while (this.apiLog.length > 0) {
                this.apiLog.pop();
            }

            for (var i = 0; i < responses.length; i++) {
                if (!this.deepTest(responses[i], APISpec)) {
                    return false;
                }
            }

            return true;
        }
    },
    deepTest: {
        value: function (resp, spec) {
            var that = this;

            if (!(resp instanceof Object) && !(RegExp(spec).test(resp))) {
                that.apiLog.unshift("text : " + resp + " is not matching the regex : " + spec);
                return false;
            }
            else if (resp instanceof Object) {
                for (var prop in resp) {
                    if (resp[prop] != null && !that.deepTest(resp[prop], resp instanceof Array ? spec : spec[prop] || spec[""])) {
                        that.apiLog.unshift(prop);
                        return false;
                    }
                }
            }
            return true;
        }
    },
    getPageTitle: {
        get: function () {
            return browser.getTitle();
        }
    },
    runOnNonAngular: {
        value: function (fn) {
            return browser.controlFlow().execute(function () {
                browser.controlFlow().execute(function () {
                    browser.ignoreSynchronization = true;
                });
                browser.controlFlow().execute(fn);
                browser.controlFlow().execute(function () {
                    browser.ignoreSynchronization = false;
                });
            });
        }
    },
    executeDBQueryUsingSSH: {
        value: function (querySQL) {
            const mysqlssh = require('mysql-ssh');
            const fs = require('fs');
            var deferred = protractor.promise.defer();
            mysqlssh.connect(
                {
                    host: '52.27.33.138',
                    user: 'devuser',
                    privateKey: fs.readFileSync('devuser-1.pem')
                },
                {
                    host: 'ulc-test-new-vpc.crwphsfyzo18.us-west-2.rds.amazonaws.com',
                    user: 'ulcuatro',
                    password: 'ulcuatro',
                    database: 'ulcprod'
                }
            ).then(function (client) {
                client.query(querySQL, function (err, results, fields) {
                    if (err) throw err;
                    console.log(results);
                    deferred.fulfill(results);
                })
            }).catch(function (err) {
                console.log(err);
                mysqlssh.close()
            });
            return deferred.promise;
        }
    },
    executeDBQuery: {
        value: function (querySQL) {
            // get the client
            const mysql = require('mysql2');
            var deferred = protractor.promise.defer();
// create the connection to database
            const connection = mysql.createConnection(browser.params.dbDetails);
// simple query
            connection.query(
                querySQL,
                function (err, results, fields) {
                    console.log(results); // results contains rows returned by server
                    console.log(fields); // fields contains extra meta data about results, if available
                    deferred.fulfill(results);
                }
            );
            return deferred.promise;
        }
    },
    sendEmail: {
        value: function () {
            console.log('This is dummy');
            var deferred = protractor.promise.defer();
            var transporter = nodemailer.createTransport({
                debug: true,
                host: "int-mail.ptc.com", // hostname
                secureConnection: false,// TLS requires secureConnection to be false
                port: 25, // port for secure SMTP
                auth: {
                    user: 'ulc-admin-test@ptc.com',
                    pass: 'Password@2424'
                }
            });

// verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log('Saurabh ' + error);
                } else {
                    console.log('Server is ready to take our messages');
                }
            });

            var mailOptions = {
                from: 'ulc-admin-test@ptc.com', // sender address (who sends)
                to: 'saukumar@ptc.com', // list of receivers (who receives)
                subject: 'Order Confirmation #PTCG-3242-4499899 ', // Subject line
                //text: 'Hello world ', // plaintext body
                html: '<b>Order# PTCG-3242- 4499899</b><br> SKU ID:<b>SKU-WBT-5340-EN</b></br> <br> EMAIL </br>saukumar@ptc.com' // html body
            };
// send mail with defined transport object
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }

                console.log('Message sent: ' + info.response);
            });

        }

    },
    sendEmail2: {
        value: function () {
            const sendmail = require('sendmail')();
            sendmail({
                from: 'saukumar@ptc.com',
                to: 'saukumar@ptc.com',
                subject: 'Order Confirmation #PTCG-3242-4499899',
                html: '<b>Order# PTCG-3242- 4499899</b><br> SKU ID:<b>SKU-WBT-5340-EN</b></br> <br> EMAIL </br>saukumar@ptc.com'
            }, function (err, reply) {
                console.log(err && err.stack)
                console.dir(reply)
            })
        }

    },
    switchOn: {
        value: function (windowHandle) {
            var that = this;
            return browser.controlFlow().execute(function () {
                return browser.getAllWindowHandles().then(function (handles) {
                    var preserveSync = browser.ignoreSynchronization;
                    var promiseArray = [];
                    browser.params.windowHandles.ULC.handle = null;
                    browser.params.windowHandles.DUMMY.handle = null;
                    browser.params.windowHandles.SUPPORT.handle = null;
                    browser.params.windowHandles.TWX.handle = null;
                    browser.params.windowHandles.TUNER.handle = null;
                    browser.params.windowHandles.WINDCHILL.handle = null;

                    handles.forEach(function (handle) {
                        promiseArray.push(that.runOnNonAngular(function () {
                            browser.switchTo().window(handle);
                            browser.getCurrentUrl().then(function (title) {
                                if (/learningconnector.ptc.com|.*recommendations.*command.*connectedProduct.*|.*recommendations.*connectedProduct.*command.*/.test(title)) {
                                    browser.params.windowHandles.ULC.handle = handle;
                                } else if (/support.ptc.com|.*community.*/.test(title)) {
                                    browser.params.windowHandles.SUPPORT.handle = handle;
                                } else if (/ulclmsqa.ptc.com|.*dummyclient.*/.test(title)) {
                                    browser.params.windowHandles.DUMMY.handle = handle;
                                } else if (/ulc-windchill.ptcnet.ptc.com/.test(title)) {
                                    browser.params.windowHandles.WINDCHILL.handle = handle;
                                } else if (/Thingworx.*Composer/.test(title)) {
                                    browser.params.windowHandles.TWX.handle = handle;
                                } else if (/app.*tuner/.test(title)) {
                                    browser.params.windowHandles.TUNER.handle = handle;
                                }
                            });
                        }));
                    });

                    return protractor.promise.all(promiseArray).then(function () {
                        browser.ignoreSynchronization = preserveSync;
                        if (windowHandle.handle) {
                            return browser.switchTo().window(windowHandle.handle);
                        }
                        else {
                            (function iife_check_null() {
                                throw new Error("You are trying to switch to the window which doesn't exist")
                            })();
                        }
                    });
                });
            });
        }
    },
    click: {
        value: function (element) {
            return element.sendKeys(protractor.Key.RETURN);
        }
    },
    scrollTo: {
        value: function (element) {
            return element.getLocation().then(function (location) {
                //y should be larger than header height ~70 px as it's position is fixed
                var y = location.y < 80 ? 0 : location.y - 70;
                return browser.executeScript('window.scrollTo(0,arguments[0]);', y);
            });
        }
    },
    clearFocus: {
        value: function () {
            return browser.actions().mouseMove({x: 9999, y: 9999}).click().perform();
        }
    },
    selectDropdownByIndex: {
        value: function (element, index) {
            return protractor.promise.all(
                element.click(),
                element.all(by.tagName('option')).get(index).click(),
                this.clearFocus());
        }
    },
    selectDropdownByText: {
        value: function (element, desiredText) {
            var desiredOption = null;
            return protractor.promise.all(
                element.click(),
                element.all(by.tagName("option")).then(function (options) {
                    options.some(function (option) {
                        option.getText().then(function (text) {
                            if (text === desiredText) {
                                desiredOption = option;
                                return true;
                            }
                        });
                    });
                }).then(function () {
                    if (desiredOption) {
                        desiredOption.click();
                    }
                }),
                this.clearFocus());
        }
    },
    selectDropdownByValue: {
        value: function (element, value) {
            return protractor.promise.all(
                element.click(),
                element.all(by.css('option[value="' + value + '"]')).first().click(),
                this.clearFocus);
        }
    },
    closeAllOtherWindows: {
        value: function () {
            var that = this;
            return browser.controlFlow().execute(function () {
                return browser.getAllWindowHandles().then(function (handles) {
                    var promiseArr = [];
                    promiseArr.push(that.runOnNonAngular(function () {
                        for (var i = 1; i < handles.length; i++) {
                            browser.switchTo().window(handles[i]);
                            browser.close();
                        }
                    }));
                    return protractor.promise.all(promiseArr).then(function () {
                        return browser.switchTo().window(handles[0]);
                    });
                });
            });
        }
    },
    regexpEscape: {
        value: function (inputString) {
            return inputString.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
    },
    move: {
        value: function move(arr, stringToBeMoved, direction) {

            var flag = 0;
            for (var i = 0; i < arr.length; i++) {

                if (direction === "up" && arr[i] === stringToBeMoved) {
                    if (i == 0)
                        return arr;
                    flag = -1;
                }

                if (direction != "up" && arr[i] === stringToBeMoved) {
                    if (i == arr.length - 1)
                        return arr;
                    flag = 1;
                }

                if (arr[i] === stringToBeMoved) {
                    arr[i] = arr[i + flag];
                    arr[i + flag] = stringToBeMoved;
                    return arr;
                }
            }
        }
    }

});

module.exports = Helper;
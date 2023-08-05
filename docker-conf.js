var Proxy = require('browsermob-proxy-api');
var Q = require('q');
var proxySetup = require('./com/ptcu/ulc/utils/proxysetup');
var childProcess = require('child_process');
var loginData=require('./com/ptcu/ulc/resources/loginData');

var proxy;
var proxyPort;
var bmpServer;

exports.config = {

    params: {

        ulcOptions: {

            //ulcURL: 'https://precisionlmstest.ptc.com/ulc',
            ulcURL: 'https://uat-learningconnector.ptc.com',
            ulcConnectedModeURL: 'https://uat-learningconnector.ptc.com/ulc.html',
            redirectToURL: 'https://precisionlmsuat.ptc.com',
            dummyClient: 'http://ec2-54-179-248-239.ap-southeast-1.compute.amazonaws.com/dummyclient/lc_host_application.html',
            thingworxURL: 'http://Administrator:admin@10.76.2.125:8080/Thingworx/Composer/index.html',
            windchillURL: 'http://wcadmin:wcadmin@ulc-windchill.ptcnet.ptc.com:8080/Windchill/app/',
            plmsURL:'https://precisionlmsuat.ptc.com/',
            ptc:'https://www.ptc.com',
            ptcsupport:'https://support.ptc.com/',
            learningExchangeURL:'https://lex-staging.ptcusys.com',
          //  redirectToULCURL:'http://10.76.2.81:8081'
            redirectToULCURL:'https://uat-learningconnector.ptc.com'
        },
        dbDetails: {
            host: loginData.dbDetails.host,
            user: loginData.dbDetails.user,
            password: loginData.dbDetails.password,
            database: loginData.dbDetails.database
        },
        apiType: {
            PLMS_BROWSE: "^https.*unifiedSearch.*learningSource=PrecisionLMS,IoTU.*",
            PLMS_SEARCH: "^https.*precision.*api.*topics.*",
            PLMS_FALLBACK: "^https.*precision.*api.*recommendations.en.*",
            PLMS_MAPPING_TAG: "^https.*precision.*api.*mapping.*mappingtag.*",
            FEDERATED_SEARCH: "^https.*support.*docsource.*HC.*TA.*CM.*",
            FEDERATED_RECOMMENDATION:"^https.*support.*docsource.*HC.*TA.*",
            FEDERATED_HC_BROWSE: "^https.*support.*docsource.*HC.*",
            FEDERATED_TA_BROWSE: "^https.*support.*docsource.*TA.*",
            UNIFIED_TUTORIAL_TOPIC: "^https.*unifiedSearch.*learningSource=LearningExchange.*",
            UNIFIED_TUTORIAL_TOPIC_SEARCH:"^https.*unifiedSearch.*learningSource=LearningExchange.*searchTerm.*",
            FEDERATED_LEX_USE_CASE: "^https.*support.*technicalarea.*Use.*Case.*",
            ORG_PREF: "^http.*org.*preferences.*recommendation.*filter.*",
            SYS_MSG_SAVE: "^https.*api.*sysmsg/save.*",
            SYS_MSG_GET: "^https.*api.*sysmsg/context.*",
            SYS_MSG_DELETE: "^https.*api.*sysmsg/delete.*",
            SYS_MSG_EDIT: "^https.*api.*sysmsg/update.*",
            RECOMMENDATION: "^https.*precision.*content.*recommendations.*",
            MAPPING_TITLE: "^https.*resourcehub.*mapping.*title.*",
            MAPPING_DELETION: "^https.*resourcehub.*mapping.*deletion.*",
            THINGWORX_RECOMMENDATION: "^https.*precision.*content.*recommendations.*thingworx.*",
            BANNER_BROWSE:"^https.*unifiedSearch.*learningSource=IoTU.*",
            LX_BANNER_LAUNCH:"^https.*unifiedSearch.*learningSource=NextGenLMS.*",
            LEARNING_EXCHANGE_BROWSE:"^https://lex-staging.ptcusys.com*",
           // LEARNING_CONNECTOR_BROWSE:"^http://10.76.2.81:8081/lexredirect.*"
            LEARNING_CONNECTOR_BROWSE:"^https://uat-learningconnector.ptc.com/lexredirect.*"
            //THINGWORX_RECOMMENDATION:"^https.*precision.*api.*recommendations.en.*"
        },
        dataType: {
            LEX_USE_CASE: 0,
            LEX_TUTORIAL: 1,
            PLMS_SEARCH: 2,
            PLMS_BROWSE: 3,
            HELP_CENTER: 4,
            ARTICLE: 6,
            COMMUNITY: 7
        },
        windowHandles: {
            ULC: {
                handle: null
            },
            DUMMY: {
                handle: null
            },
            SUPPORT: {
                handle: null
            },
            TUNER: {
                handle: null
            },
            TWX: {
                handle: null
            },
            WINDCHILL: {
                handle: null
            }
        }
    },

    // directConnect: true,
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar",
   // seleniumServerJar: "node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar",

    // Capabilities to be passed to the webdriver instance.
    // capabilities: {
    //     browserName: 'chrome',
    //     proxy : {
    //         proxyType: 'manual',
    //         httpProxy: 'localhost:8887',
    //         sslProxy: 'localhost:8887',
    //     }
    // },

    getMultiCapabilities: function () {
        var deferred = Q.defer();

        proxySetup(function (err, bmp) {

            proxy = new Proxy({'host': bmp.host, 'port': bmp.port});
            bmpServer = {
                pid: bmp.pid,
                kill: bmp.kill
            };
            proxy.startPort('', function (err, resp) {
                var respJSON = JSON.parse(resp);
                proxyPort = respJSON.port;
                Q.ninvoke(proxy, 'setTimeouts', respJSON.port, {"connectionTimeout": "0", "readTimeout": "0"});

                var multiCapability = [{
                    browserName: process.env.BROWSER || 'chrome',
                    bmp: bmpServer,
                    proxyApi: proxy,
                    proxyPort: proxyPort,
                    proxy: {
                        proxyType: 'manual',
                        httpProxy: bmp.host + ":" + proxyPort,
                        sslProxy: bmp.host + ":" + proxyPort
                    }
                }];
                console.log('Resolved capability ',multiCapability);
                deferred.resolve(multiCapability);
            });
        });

        return deferred.promise;
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['com/ptcu/ulc/tests/API/version.fallback.api.spec.js'],
    //exclude: ['com/ptcu/ulc/tests/smoke/myLearning.page.spec.js'],

    //specs: ['com/ptcu/ulc/tests/API/*.spec.js'],
   // exclude:['com/ptcu/ulc/tests/LearningExchangeRedirection/ILE.details.spec.js, com/ptcu/ulc/tests/LearningExchangeRedirection/TP.details.spec.js '],
     //specs: ['com/ptcu/ulc/tests/smoke/feature.elearning.seemore.spec.js'],
   /* suites: {
        smoke: './com/ptcu/ulc/tests/smoke/!*.spec.js',
        regression: './com/ptcu/ulc/tests/regression/!*.spec.js'
    },*/

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 550000
    },

    allScriptsTimeout: 550000,
    getPageTimeout: 550000,

    troubleshoot: true,

    onPrepare: function () {

        browser.manage().window().maximize();
        var AllureReporter = require('jasmine-allure-reporter');

        jasmine.getEnv().addReporter(new AllureReporter({
            basePath: './target'
        }));

        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });

        jasmine.getEnv().beforeEach(function () {
            jasmine.addMatchers(require('./com/ptcu/ulc/utils/jasmineCustomMatchers'));
        });

        return browser.getProcessedConfig().then(function (config) {
            // console.log(config.capabilities);
            browser.params.proxy = config.capabilities.proxyApi;
            proxy = config.capabilities.proxyApi;
            browser.params.proxyPort = config.capabilities.proxyPort;
            proxyPort = config.capabilities.proxyPort;
            bmpServer = config.capabilities.bmp;
        });
    },

    afterLaunch: function () {

        return Q.ninvoke(proxy, 'stopPort', proxyPort).then(function (resp) {

            if (/^win/.test(process.platform)) {
                childProcess.exec('taskkill /PID ' + bmpServer.pid + ' /T /F', function (err, stdout, stderr) {
                    if (!err) {
                        console.log(stdout);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                bmpServer.kill();
            }
        }, function (err) {
            console.log(err);
        });

    }
};

/**
 * Created by pankumar on 02-11-2016.
 */
'use strict';

var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

var matcher = {

    toBeSubsetofArray: function () {
        return {
            compare: function (actual, expected) {

                var result = {pass: true};

                for (var j = 0; j < actual.length; j++) {
                    if (expected.filter(function (value) {
                            var decodedVal = entities.decode(entities.decode(value.trim().replace("&nbsp;", " ")).replace("&nbsp;", " "));
                            var expectedParts = decodedVal.trim().split(/\s+/);
                            var actualParts = actual[j].trim().split(/\s+/);

                            return actualParts.join("_") === expectedParts.join("_");
                        }).length === 0) {
                        result = {pass: false};
                        result.message = actual + " is not subset of " + expected;
                        break;
                    }
                }

                return result;
            }
        }
    },
    toHavePropertiesIn: function () {
        return {
            compare: function (actual, expected) {
                var result = {pass: true};
                for (var prop in actual) {
                    if (!expected[prop]) {
                        result.pass = false;
                        result.message = expected + " - is not having property - " + prop;
                        break;
                    } else if (actual[prop] !== expected[prop]) {
                        result.pass = false;
                        result.message = actual[prop] + " - is not matching with - " + expected[prop];
                        break;
                    }
                }

                return result;
            }
        }
    }
};

module.exports = matcher;
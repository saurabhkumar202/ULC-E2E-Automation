/**
 * Created by saukumar on 05-06-2017.
 */

'use strict';

var RecommendationPage = require('../pages/recommendation.page.js');
var dummyClientData = require('../resources/dummyClientData.json');

var recommendationPage = new RecommendationPage();

module.exports = {
    productId: 0,

    getProdIdPerConnectedVersionsTable: function (prodName) {
        switch (prodName) {
            case "Thingworx Composer":
                return 1;
            case "Windchill":
                return 2;
            case "Creo Parametric":
                return 3;
            case "Creo Simulate":
                return 4;
            case "Creo Direct":
                return 5;
            case "Creo Layout":
                return 6;
            case "Creo Options Modeler":
                return 7;

        }

    },
    getProductIDofConnectedProduct: function (prodName) {
        this.productId = this.getProdIdPerConnectedVersionsTable(prodName);
    },
    getLatestVersionOfConnectedProduct: function (prodName) {
        this.getProductIDofConnectedProduct(prodName);
        var sql1 = "SELECT max(connected_version)AS result FROM " + browser.params.dbDetails.database + ".connected_versions where connected_product_id=" + this.productId;
        return recommendationPage.executeDBQuery(sql1).then(function (res) {
            return res[0].result;

        });
    },
    getOldestVersionOfConnectedProduct: function (prodName) {
        this.getProductIDofConnectedProduct(prodName);
        var sql2 = "SELECT min(connected_version)AS result FROM " + browser.params.dbDetails.database + ".connected_versions where connected_product_id=" + this.productId + ";";
        return recommendationPage.executeDBQuery(sql2).then(function (res) {
            return res[0].result;

        });
    },

    getFallbackVersionForConnectedProduct: function (latestVersion, minVersion, prodName) {
        var ToFallVersion;
        this.getProductIDofConnectedProduct(prodName);
        if (dummyClientData.VersionForFallback > minVersion && dummyClientData.VersionForFallback < latestVersion) {
            var sql3 = "SELECT max(connected_version)AS result FROM " + browser.params.dbDetails.database + ".connected_versions where connected_product_id=" + this.productId + " and connected_version<=" + dummyClientData.VersionForFallback + ";";
            return recommendationPage.executeDBQuery(sql3).then(function (res) {
                ToFallVersion = res[0].result;
                console.log("Fallback version found - " + ToFallVersion);
                return ToFallVersion;
            });
        }
        else if (dummyClientData.VersionForFallback > latestVersion) {
            var deferred = protractor.promise.defer();
            ToFallVersion = latestVersion;
            console.log("Got fallback version as of latest version- " + latestVersion);
            return deferred.resolve(ToFallVersion);

            // return ToFallVersion;

        }
        else if (dummyClientData.VersionForFallback < minVersion) {
            var deferred = protractor.promise.defer();
            ToFallVersion = minVersion;
            console.log("Got fallback version as of Minimum version- " + minVersion);
            return deferred.resolve(ToFallVersion);

        }
    },
    getSearchInfoId: function (prodName, version) {
        this.getProductIDofConnectedProduct(prodName);
        var sql1 = "SELECT search_info_id AS result FROM " + browser.params.dbDetails.database + ".connected_versions where connected_product_id=" + this.productId + " and connected_version=" + version + ";";
        return recommendationPage.executeDBQuery(sql1).then(function (res) {
            //console.log("This is - " +res[0].result)
            return res[0].result;
        });
    },
    getLMSVersionForConnectedProduct: function (sId) {
        var sql2 = "SELECT lms_name As result FROM " + browser.params.dbDetails.database + ".search_info where info_id=" + sId + ";";
        return recommendationPage.executeDBQuery(sql2).then(function (res2) {
            //console.log("This is another - " +res2[0].result)
            return res2[0].result;
        });


    }

};
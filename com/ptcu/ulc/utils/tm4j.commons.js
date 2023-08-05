var http = require('http');
var tm4jLoginData = require('../resources/tm4j.loginData');
var Common = function () {
    var post_data;
    var response;
    var result_id;
    var username = tm4jLoginData.uid[0];
    var password = tm4jLoginData.pwd[0];
    var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    this.postTestResult = function (tcid,start,end, status, result) {
        console.log('tc id is '+tcid);
        console.log('status is '+status.substring(0,status.length-2));
        var temp=status.substring(0,status.length-2);
        var fstatus=temp[0].toUpperCase()+temp.slice(1);
        var deferred = protractor.promise.defer();
        /*var username = tm4jLoginData.uid[0];
        var password = tm4jLoginData.pwd[0];
        var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');*/

        if(fstatus==='Pass'){
            post_data = JSON.stringify(
                {
                    "status": fstatus,
                    "comment": "The test has passed on ULC Automation tool procedure.",
                    "assignedTo": username,
                    "executedBy": username,
                    "executionTime": end-start,
                    "actualStartDate": start,
                    "actualEndDate": end,
                    "issueLinks": ["PT-1"],
                    "scriptResults": [{"index": 0,"status": fstatus,"comment": "This script has Passed"}]
                });
        }
        else if(fstatus=='Fail') {
            post_data = JSON.stringify(
                {
                    "status": fstatus,
                    "comment": "The test has failed on ULC Automation tool procedure.",
                    "assignedTo": tm4jLoginData.uid[0],
                    "executedBy": tm4jLoginData.uid[0],
                    "executionTime": end-start,
                    "actualStartDate": start,
                    "actualEndDate": end,
                    "issueLinks": ["PT-1"],
                    "scriptResults": [{"index": 0,"status": fstatus,"comment": "This step has failed due to "+result.failedExpectations[0].message+" Stack trace- "+result.failedExpectations[0].stack}]
                });
        }
        else{
            console.log('Test status is '+fstatus+' and hence not pushing data to TM4J');
            return;
        }

        var options = {
            hostname: 'localhost',
            port:8080,
            path: '/rest/atm/1.0/testrun/PT-C1/testcase/'+tcid+'/testresult',
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': auth
            }
        };

        var callback = function(res) {
            console.log('Posted test status data to TM4J');
            res.on('data',function(chunk){
                console.log('Response is: '+chunk);
               response= JSON.parse(chunk);
                result_id=response.id;
                console.log('Response id is: '+result_id);

            });
            deferred.fulfill();
        };

        var req = http.request(options, callback);
        req.write(post_data );
        req.end();

        return deferred.promise;
    };

this.postAttachment=function(){
    var deferred = protractor.promise.defer();
    post_data = JSON.stringify(
        {
            "file": "sample.jpg"
        });

    var options = {
        hostname: 'localhost',
        port:8080,
        path: '/rest/atm/1.0/testresult/'+result_id +'/step/0/attachments',
        method: 'POST',
        headers: {
            'Content-Type':'multipart/form-data',
            'Authorization': auth
        }
    };

    var callback = function(res) {
        console.log('Posted test status data to TM4J');
        res.on('data',function(chunk){
            console.log('Response is: '+chunk);
        });
        deferred.fulfill();
    };

    var req = http.request(options, callback);
    req.write(post_data );
    req.end();

    return deferred.promise;
}

};

module.exports = Common;
/**
 * Created by pankumar on 22-08-2016.
 */

var request = require('request');
var fs = require('fs');
var admzip = require('adm-zip');
var freeport = require('freeport');
var childProcess = require('child_process');
var spawn = require('child_process').spawn;
var path = require('path');
var q = require('q');


var version = '2.1.2';
var relPath = './';
var randomPort = null;

function killAlreadyRunningBMPInstance() {

    var deferred = q.defer();
    console.log("Kill Already running BMP instance ...");
    var command = /^win/.test(process.platform)
        ? "wmic Path win32_process Where \"CommandLine Like '%browsermob-proxy%'\" Call Terminate"
        : "ps -ef | grep [browser]mob-proxy | awk '{print $2;}' | xargs -r kill";

    childProcess.exec(command, function (err, stdout, stderr) {
        console.log(err || stdout || stderr);
        deferred.resolve();
    });

    return deferred.promise;
}

function downloadBMP(cb) {

    console.log("Downloading BMP server...");
    request('https://github.com/lightbody/browsermob-proxy/releases/download/browsermob-proxy-' + version + '/browsermob-proxy-' + version + '-bin.zip',
        function (err, resp, body) {
            if (!err) {
                if (resp.statusCode === 200) {
                    checkFileStatus(cb);
                } else {
                    console.log("Something is wrong with the URL , returned response ", resp.statusCode);
                }
            } else {
                console.log("Request error -> ", err);
            }
        }).pipe(fs.createWriteStream(relPath + 'browsermob-proxy-' + version + '.zip'));
}

function checkFileStatus(cb) {
    fs.stat(relPath + 'browsermob-proxy-' + version + '.zip', function (fserr, stats) {
        if (!fserr) {
            if (stats['size'] < 1000) {
                console.log("Zip file is corrupt");
            } else {
                extractZip(cb);
            }
        } else {
            console.log("Zip file doesn't exists -> ", fserr);
        }
    });
}

function extractZip(cb) {
    console.log("Extracting the zip file...");
    var zip = new admzip(relPath + 'browsermob-proxy-' + version + '.zip');
    zip.extractAllTo(relPath);

    getFreePort(cb);
}

function getFreePort(cb) {
    freeport(function (porterr, availRandomport) {
        if (!porterr) {
            randomPort = availRandomport;
            console.log("Found free port ", randomPort, " to run BMP server");
            spawnBMPServerProcess(cb);
        } else {
            console.log('Problem fetching freeport -> ', porterr);
        }
    });
}

function spawnBMPServerProcess(cb) {

    // console.log(path.win32.resolve(relPath + '\\browsermob-proxy-' + version + '\\bin\\browsermob-proxy'));
    var spawnOptions = /^win/.test(process.platform) ? ['/c', path.win32.resolve(relPath + '\\browsermob-proxy-' + version + '\\bin\\browsermob-proxy'), '-port', randomPort]
        : [path.resolve(relPath + '/browsermob-proxy-' + version + '/bin/browsermob-proxy'), '-port', randomPort];
    var spawnCmd = /^win/.test(process.platform) ? 'cmd' : 'sh';

    var child = spawn(spawnCmd, spawnOptions);
    var exitFn = function () {
        console.log('something caused bmp server to stop');
    };

    child.stdout.on('data', function (data) {
        var startedString = 'Started SelectChannelConnector';
        if (data.toString().indexOf(startedString) != -1) {
            child.removeListener('exit', exitFn);
            console.log(data.toString());
            child.port = randomPort;
            child.host = '127.0.0.1';
            cb(null, child);
        } else {
            console.log(data.toString());
        }
    });

    child.on('exit', exitFn);
    child.on('close', function () {
        console.log('closed');
    });
}


module.exports = function (cb) {

    var dirPath = /^win/.test(process.platform) ? path.win32.resolve(relPath + '\\browsermob-proxy-' + version + '\\lib\\browsermob-dist-' + version + '.jar') :
        path.resolve(relPath + '/browsermob-proxy-' + version + '/lib/browsermob-dist-' + version + '.jar');

    fs.stat(dirPath, function (fserr, stats) {
        killAlreadyRunningBMPInstance().then(function () {
            if (!fserr && stats['size'] > 10000) {
                getFreePort(cb);
            } else {
                downloadBMP(cb);
            }
        });
    });
};
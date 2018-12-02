var zipFolder = require('zip-folder');
var path = require('path');
var fs = require('fs');
var request = require('request');

var rootFolder = path.resolve('.');
var zipPath = path.resolve(rootFolder, '../mycheesebot.zip');
var kuduApi = 'https://mycheesebot.scm.azurewebsites.net/api/zip/site/wwwroot';
var userName = '$mycheesebot';
var password = 'R0l3a4zGnq7LxuQNPFuNYGLi3clWSJ2WqahnNl9cTRxcb08vJ5ktxvfPMXSl';

function uploadZip(callback) {
  fs.createReadStream(zipPath).pipe(request.put(kuduApi, {
    auth: {
      username: userName,
      password: password,
      sendImmediately: true
    },
    headers: {
      "Content-Type": "applicaton/zip"
    }
  }))
  .on('response', function(resp){
    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      fs.unlink(zipPath);
      callback(null);
    } else if (resp.statusCode >= 400) {
      callback(resp);
    }
  })
  .on('error', function(err) {
    callback(err)
  });
}

function publish(callback) {
  zipFolder(rootFolder, zipPath, function(err) {
    if (!err) {
      uploadZip(callback);
    } else {
      callback(err);
    }
  })
}

publish(function(err) {
  if (!err) {
    console.log('mycheesebot publish');
  } else {
    console.error('failed to publish mycheesebot', err);
  }
});
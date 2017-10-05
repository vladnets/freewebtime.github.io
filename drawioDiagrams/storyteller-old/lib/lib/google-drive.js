'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setApiToken = setApiToken;
exports.uploadFile = uploadFile;
exports.getFile = getFile;
exports.downloadFile = downloadFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactNativeGoogleSignIn = require('react-native-google-sign-in');

var _reactNativeGoogleSignIn2 = _interopRequireDefault(_reactNativeGoogleSignIn);

var url = 'https://www.googleapis.com/drive/v3';
var uploadUrl = 'https://www.googleapis.com/upload/drive/v3';

var boundaryString = 'foo_bar_baz'; // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload

var apiToken = null;

var configureGoogleSignIn = function configureGoogleSignIn() {
  return regeneratorRuntime.async(function configureGoogleSignIn$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', _reactNativeGoogleSignIn2['default'].configure({
          // https://developers.google.com/identity/protocols/googlescopes
          scopes: ['https://www.googleapis.com/auth/drive.appdata'],
          shouldFetchBasicProfile: true
        }));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

exports.configureGoogleSignIn = configureGoogleSignIn;

function setApiToken(token) {
  apiToken = token;
}

function parseAndHandleErrors(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(function (error) {
    throw new Error(JSON.stringify(error));
  });
}

function configureGetOptions() {
  var headers = new Headers();
  headers.append('Authorization', 'Bearer ' + apiToken);
  return {
    method: 'GET',
    headers: headers
  };
}

function configurePostOptions(bodyLength) {
  var isUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var headers = new Headers();
  headers.append('Authorization', 'Bearer ' + apiToken);
  headers.append('Content-Type', 'multipart/related; boundary=' + boundaryString);
  headers.append('Content-Length', bodyLength);
  return {
    method: isUpdate ? 'PATCH' : 'POST',
    headers: headers
  };
}

function createMultipartBody(body) {
  var isUpdate = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  var metaData = {
    name: 'data.json',
    description: 'Backup data for my app',
    mimeType: 'application/json'
  };
  // if it already exists, specifying parents again throws an error
  if (!isUpdate) metaData.parents = ['appDataFolder'];

  // request body
  var multipartBody = '\r\n--' + boundaryString + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + (JSON.stringify(metaData) + '\r\n') + ('--' + boundaryString + '\r\nContent-Type: application/json\r\n\r\n') + (JSON.stringify(body) + '\r\n') + ('--' + boundaryString + '--');

  return multipartBody;
}

// uploads a file with its contents and its meta data (name, description, type, location)

function uploadFile(content, existingFileId) {
  var body = createMultipartBody(content, !!existingFileId);
  var options = configurePostOptions(body.length, !!existingFileId);
  return fetch(uploadUrl + '/files' + (existingFileId ? '/' + existingFileId : '') + '?uploadType=multipart', _extends({}, options, {
    body: body
  })).then(parseAndHandleErrors);
}

// Looks for files with the specified file name in your app Data folder only (appDataFolder is a magic keyword)
function queryParams() {
  return encodeURIComponent("name = 'data.json' and 'appDataFolder' in parents");
}

// returns the files meta data only. the id can then be used to download the file

function getFile() {
  var qParams = queryParams();
  var options = configureGetOptions();
  return fetch(url + '/files?q=' + qParams + '&spaces=appDataFolder', options).then(parseAndHandleErrors).then(function (body) {
    if (body && body.files && body.files.length > 0) return body.files[0];
    return null;
  });
}

// download the file contents given the id

function downloadFile(existingFileId) {
  var options = configureGetOptions();
  if (!existingFileId) throw new Error('Didn\'t provide a valid file id.');
  return fetch(url + '/files/' + existingFileId + '?alt=media', options).then(parseAndHandleErrors);
}

//////////////////////////////////
// Downloading in a redux-thunk //
//////////////////////////////////
var dispatchGoogleDrive = function dispatchGoogleDrive(apiToken) {
  return function (dispatch) {
    dispatch({ type: ActionNames.dataRestoreStart });
    setApiToken(apiToken);
    return getWorkoutFile().then(function (file) {
      if (file) {
        return downloadFile(file.id);
      }
      throw new Error('No existing backup file found.');
    }).then(function (data) {
      dispatch({
        type: ActionNames.dataRestoreFinished,
        payload: data
      });
    })['catch'](function (err) {
      return dispatch({ type: ActionNames.dataRestoreError, payload: err });
    });
  };
};
exports.dispatchGoogleDrive = dispatchGoogleDrive;
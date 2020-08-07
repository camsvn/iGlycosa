import {PermissionsAndroid} from 'react-native';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const createFileName = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + today.getMonth()).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var hour = ('0' + today.getHours()).slice(-2);
  var minute = ('0' + today.getMinutes()).slice(-2);
  var second = ('0' + today.getSeconds()).slice(-2);
  var millisecond = ('00' + today.getMilliseconds()).slice(-3);

  return `/iG_${year}${month}${date}_${hour}${minute}${second}${millisecond}.jpg`;
};

const squareImage = (edgeLength, imgLength) => {
  return Math.round((edgeLength - imgLength) / 2);
};

const uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);

    xhr.send(null);
  });
};

export {squareImage, createFileName, uriToBlob};

import React from 'react';
import Camera from '../Presentational/Camera';
import {
  StatusBar,
  Image,
  Dimensions,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
import {colors} from '../../constants/ColorConstants';
import {icons} from '../../constants/ImageConstants';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
var path = RNFS.ExternalStorageDirectoryPath + '/iGlycosa';
// var path = '/storage/emulated/0/iGlycosa/';

const createFileName = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + today.getMonth()).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var hour = ('0' + today.getHours()).slice(-2);
  var minute = ('0' + today.getMinutes()).slice(-2);
  var second = ('0' + today.getSeconds()).slice(-2);
  var millisecond = ('00' + today.getMilliseconds()).slice(-3);

  // console.log(month);
  // console.log(date);
  // console.log(hour);
  // console.log(minute);
  // console.log(second);
  // console.log(millisecond);

  return `/iG_${year}${month}${date}_${hour}${minute}${second}${millisecond}.jpg`;
};

const P2w = P => {
  return Math.round(P * width) / 100;
};

const P2h = P => {
  return Math.round(P * height) / 100;
};

const squareImage = (edgeLength, imgLength) => {
  return Math.round((edgeLength - imgLength) / 2);
};

export default class example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oimg: null,
      img: null,
    };
  }

  async onPicture(data) {
    this.setState({oimg: data.uri});
    const finderWidth = Math.round(data.width * 0.48);
    // console.log(finderWidth);
    const cropData = {
      offset: {
        x: squareImage(data.width, finderWidth),
        y: squareImage(data.height, finderWidth),
      },
      size: {width: finderWidth, height: finderWidth},
    };
    try {
      const croppedImageURI = await ImageEditor.cropImage(data.uri, cropData);
      if (croppedImageURI) {
        this.setState({img: croppedImageURI});
      }
    } catch (cropError) {
      console.log(cropError);
    }
  }

  async onBackToCamera() {
    await RNFS.unlink(this.state.oimg);
    await RNFS.unlink(this.state.img);
    this.setState({img: null, oimg: null});
  }

  async savePicture(uri) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    // console.log(RNFS.ExternalStorageDirectoryPath + '/iGlycosa');
    RNFS.mkdir(path);
    await RNFS.copyFile(uri, path + createFileName()).then(() =>
      ToastAndroid.show(
        'Saved to "/storage/emulated/0/iGlycosa/"',
        ToastAndroid.SHORT,
      ),
    );
    this.onBackToCamera();
    // CameraRoll.save(uri, {type: 'photo', album: 'iGlycosa'});
  }

  render() {
    const {img} = this.state;
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="rgba(0,0,15,0.3)"
          translucent
          barStyle="light-content"
        />
        {img ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
            }}>
            <View
              style={{
                width: '95%',
                height: P2h(61),
                justifyContent: 'space-around',
                alignItems: 'center',
                // borderWidth: 5,
                // borderLeftWidth: 15,
                // borderRightWidth: 15,
                // borderTopWidth: 15,
                // borderColor: colors.accent,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: colors.accent,
              }}>
              <Image
                source={{uri: img}}
                style={{
                  //   flex: 1,
                  width: P2w(90.25),
                  height: P2w(85.25),
                  borderRadius: 5,
                  //   borderBottomLeftRadius: 5,
                  //   borderBottomRightRadius: 5,
                  marginTop: '2.5%',
                }}
              />
              <View
                style={{
                  width: '95%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  //   alignItems: 'flex-end',
                  //   marginVertical: '2%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.onBackToCamera();
                  }}
                  style={{
                    flex: 0.5,
                    // backgroundColor: 'coral',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginVertical: '4%',
                  }}>
                  {/* <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 28,
                  }}>
                  Cancel
                </Text> */}
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      // borderWidth: 2,
                      // borderColor: 'red',
                    }}
                    resizeMode="center"
                    source={{
                      uri: icons.cancelButton,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.savePicture(img);
                  }}
                  style={{
                    flex: 0.5,
                    // backgroundColor: 'coral',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginVertical: '10%',
                  }}>
                  {/* <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 28,
                  }}>
                  Save
                </Text> */}
                  <Image
                    style={{
                      height: 60,
                      width: 60,
                      // borderWidth: 2,
                      // borderColor: 'red',
                    }}
                    resizeMode="center"
                    source={{
                      uri: icons.acceptButton,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Camera onPicture={this.onPicture.bind(this)} />
        )}
      </View>
    );
  }
}

import React from 'react';
import Camera from '../Presentational/Camera';
import {
  StatusBar,
  Image,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constants/DimensionConstants';
import {colors} from '../../constants/ColorConstants';
import {icons} from '../../constants/ImageConstants';
///Global Constnats
var PATH = RNFS.ExternalStorageDirectoryPath + '/iGlycosa';

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
    RNFS.mkdir(PATH);
    await RNFS.copyFile(uri, PATH + createFileName()).then(() =>
      ToastAndroid.show(
        'Saved to "/storage/emulated/0/iGlycosa/"',
        ToastAndroid.SHORT,
      ),
    );
    this.onBackToCamera();
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
          <View style={styles.mainContainer}>
            <View style={styles.photoFrame}>
              <Image source={{uri: img}} style={styles.squareImage} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.onBackToCamera();
                  }}
                  style={styles.btnCancelContainer}>
                  <Image
                    style={styles.imgCancel}
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
                  style={styles.btnAcceptContainer}>
                  <Image
                    style={styles.imgAccept}
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  photoFrame: {
    width: '95%',
    height: hp(61),
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.accent,
  },
  squareImage: {
    width: wp(90.25),
    height: wp(85.25),
    borderRadius: 5,
    marginTop: '2.5%',
  },
  buttonContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnCancelContainer: {
    flex: 0.5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCancel: {
    height: 60,
    width: 60,
  },
  btnAcceptContainer: {
    flex: 0.5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgAccept: {
    height: 60,
    width: 60,
  },
});

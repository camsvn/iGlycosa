import React from 'react';
import Camera from '../Presentational/Camera';
import Picker from '../Presentational/Picker';
import {
  StatusBar,
  Image,
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
// 3rd-Party package imports
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
// local imports
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../constants/DimensionConstants';
import {colors} from '../../constants/ColorConstants';
import {icons} from '../../constants/ImageConstants';
import {
  squareImage,
  createFileName,
  uriToBlob,
} from '../../constants/functionalConstants';
import {typography} from '../../constants/TypographyConstants';
import {Toast} from '../Presentational/Utils';
import {ImgPrevActionButton} from '../Presentational';
import {isEye, getdata, add_data} from '../../constants/api';
import {SafeAreaView} from 'react-native-safe-area-context';
// Global Constants
var PATH = RNFS.ExternalStorageDirectoryPath + '/iGlycosa';
var controller;

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export default class example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // img:
      //   'https://upload.wikimedia.org/wikipedia/commons/8/8f/Human_eye_with_blood_vessels.jpg',
      img: null,
      isEye: false,
      isEyePdComplete: false,
    };
    this.g_reading;
    console.log(this.props.route.params.mode ? 'Upload Mode' : 'Analyze Mode');
    // getdata();
    // console.log(geturl('iG_20200712_030518974.jpg'));
    // add_data();
  }

  _handleChange(val) {
    this.g_reading = val;
  }

  _handleCloseClick() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  async _onPicture(data) {
    controller = new AbortController();
    const {signal} = controller;
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
      await RNFS.unlink(data.uri);

      if (croppedImageURI) {
        this.setState({img: croppedImageURI});
        uriToBlob(croppedImageURI)
          .then(blob => isEye(blob, signal))
          .then(res => {
            if (res) {
              this.setState({isEyePdComplete: true});
              res === 'eye' && this.setState({isEye: true});
              // Toast(res);
              console.log(res);
            }
          })
          .catch(err => {
            Toast(err.message);
            console.log(err);
          });
      }
    } catch (cropError) {
      console.log(cropError);
    }
  }

  async _onBackToCamera() {
    controller.abort();
    await RNFS.unlink(this.state.img);
    this.setState({
      img: null,
      isEyePdComplete: false,
      isEye: false,
    });
  }

  async _savePicture(uri) {
    // if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    //   return ToastAndroid.show('Permission Denied!', ToastAndroid.SHORT);
    // }
    // RNFS.mkdir(PATH);
    // await RNFS.copyFile(uri, PATH + createFileName()).then(() =>
    //   ToastAndroid.show(
    //     'Saved to "/storage/emulated/0/iGlycosa/"',
    //     ToastAndroid.SHORT,
    //   ),
    // );
    // uploadToFirebase(this.state.img).then(res => console.log(res));
    add_data(this.state.img, this.props.route.params.mode, this.g_reading)
      .then(msg => Toast(msg))
      .catch(err => Toast(err.message));
    this._onBackToCamera();
  }

  render() {
    const {img, isEyePdComplete, isEye} = this.state;
    return (
      // <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          backgroundColor={'#076C63'}
          // backgroundColor="rgba(0,0,15,0.3)"
          // translucent
          barStyle="light-content"
        />

        {img ? (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => this._onBackToCamera()}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop: wp(3),
                marginLeft: '3%',
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                }}
                resizeMode="center"
                source={{
                  uri: icons.close,
                }}
              />
            </TouchableOpacity>
            <View style={styles.photoFrame}>
              <Image source={{uri: img}} style={styles.squareImage} />
              <View style={styles.buttonContainer}>
                {isEyePdComplete ? (
                  isEye ? (
                    <>
                      {/* <ImgPrevActionButton
                      icon={icons.cancelButton}
                      action={() => this._onBackToCamera()}
                    /> */}
                      <ImgPrevActionButton
                        icon={icons.acceptButton}
                        action={() => this._savePicture(img)}
                      />
                    </>
                  ) : (
                    <Text style={[typography.accentBody]}>
                      Eye not found! ReTake the image
                    </Text>
                  )
                ) : (
                  <Text style={[typography.accentBody]}>Analyzing</Text>
                )}
              </View>
            </View>
            {isEye ? (
              this.props.route.params.mode ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                  }}>
                  {/* <TextIP onValueChange={this._handleChange.bind(this)} /> */}
                  <Picker onValueChange={this._handleChange.bind(this)} />
                </View>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </View>
        ) : (
          <Camera
            onPicture={this._onPicture.bind(this)}
            onClose={this._handleCloseClick.bind(this)}
          />
        )}
      </SafeAreaView>
      // </View>
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

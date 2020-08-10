import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StatusBar,
  Alert,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

import {colors} from '../../constants/ColorConstants';
import {icons} from '../../constants/ImageConstants';
import Mask from '../Presentational/ScannerMask';
import Text from '../Presentational/Text';
import {widthPercentageToDP as wp} from '../../constants/DimensionConstants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const w2P = h => {
  return Math.round(h / width);
};

const P2w = P => {
  return Math.round(P * width) / 100;
};

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 1,
        // fixOrientation: true,
        // forceUpOrientation: true,
        orientation: 'portrait',
        // doNotSave: true,
      };

      this.setState({takingPic: true});
      const ratios = await this.camera.getSupportedRatiosAsync();
      // console.log(ratios);

      try {
        const data = await this.camera.takePictureAsync(options);
        // this.setState({takingPic: false});
        // console.log(JSON.stringify(data));
        this.props.onPicture(data);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        // this.setState({takingPic: false});
      }
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
            // borderWidth: 2,
            // borderColor: 'blue',
          }}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            captureAudio={false}
            style={{flex: 1}}
            type={RNCamera.Constants.Type.back}
            // autoFocus={RNCamera.Constants.AutoFocus.off}
            // flashMode={RNCamera.Constants.FlashMode.on}
            // ratio={'16:9'}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            <Mask
              width={wp(60)}
              height={wp(60)}
              edgeHeight={50}
              edgeWidth={50}
              edgeBorderWidth={8}
              edgeRadius={20}
              edgeColor={colors.secondary}
              outerMaskOpacity={0.95}
              backgroundColor={colors.primary}
              // showAnimatedLine={false}
            />
            <View
              style={{
                flex: 1,
                // borderWidth: 3,
                // borderColor: 'white',
                zIndex: 2,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 0.25,
                  // borderWidth: 2,
                  // borderColor: 'blue',
                  // marginTop: '100%',
                  // marginTop: StatusBar.currentHeight + wp(3),
                  marginTop: wp(3),
                  marginLeft: '3%',
                }}>
                <TouchableOpacity onPress={this.props.onClose}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      // borderWidth: 2,
                      // borderColor: 'red',
                    }}
                    resizeMode="center"
                    source={{
                      uri: icons.close,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    // borderWidth: 3,
                    // borderColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text small accent style={{zIndex: 2}}>
                    Hold your phone infront of your eye
                  </Text>
                </View>
              </View>
              <View
                style={{
                  // borderWidth: 3,
                  // borderColor: 'blue',
                  flex: 0.25,
                  width: '100%',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={this.takePicture}>
                  <Image
                    style={{height: 60, width: 60}}
                    resizeMode="center"
                    source={{
                      uri: icons.cameraButton,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </RNCamera>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

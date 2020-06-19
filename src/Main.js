import React from 'react';
import {PixelRatio, Dimensions, View, ScrollView} from 'react-native';

// import Text from './components/Presentational/Text';
import {Block, Text} from './components/Presentational';

import {
  proportionedPixel,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './constants/DimensionConstants';

class Main extends React.Component {
  render() {
    return (
      <Block color="primary">
        <Block flex={0.285} color="secondary" />
        <Block flex={0.615}>
          <Block center style={{borderWidth: 2, borderColor: 'red'}}>
            <Block
              flex={false}
              row
              style={{
                height: '63.5%',
                borderWidth: 2,
                borderColor: 'blue',
                width: '100%',
                top: '-24%',
              }}>
              <View
                style={{
                  // height: '63.5%',
                  width: '80%',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginLeft: 15,
                  // top: '-24%',
                  transform: [{scale: 0.9}],
                }}
              />
              <View
                style={{
                  // height: '63.5%',
                  width: '80%',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginHorizontal: 15,
                  // top: '-24%',
                }}
              />
              <View
                style={{
                  // height: '63.5%',
                  width: '80%',
                  backgroundColor: 'white',
                  borderRadius: 15,
                  marginRight: 15,
                  // top: '-24%',
                  transform: [{scale: 0.9}],
                }}
              />
            </Block>
          </Block>
        </Block>
        <Block flex={0.1} style={{borderTopWidth: 2, borderColor: 'white'}} />
      </Block>
    );
  }
}

export default Main;

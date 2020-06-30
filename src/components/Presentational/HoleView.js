import React from 'react';

import {View} from 'react-native';

function HoleView() {
  return (
    <View
      style={{
        flex: 1,
        // borderWidth: 5,
        // borderColor: 'white',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.5,
          // borderWidth: 2,
          // borderColor: 'red',
          backgroundColor: 'rgba(0,0,0,0.8)',
          height: '100%',
          width: '100%',
        }}
      />

      <View
        style={{
          flex: 0,
          // width: 300,
          // height: 300,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            // borderWidth: 3,
            // borderColor: 'yellow',
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            height: 300,
            width: 300,
            borderWidth: 3,
            borderColor: 'white',
            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            flex: 1,
            // borderWidth: 3,
            // borderColor: 'yellow',
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View
        style={{
          flex: 0.5,
          // borderWidth: 2,
          // borderColor: 'red',
          backgroundColor: 'rgba(0,0,0,0.8)',
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
}

export default HoleView;

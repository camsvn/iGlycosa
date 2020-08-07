import React from 'react';
import {TouchableOpacity, Image, StyleSheet, ToastAndroid} from 'react-native';

import Block from './Block';
import Text from './Text';
import {colors} from '../../constants/ColorConstants';

const Divider = props => {
  const {height, width, color, radius} = props;
  return (
    <Block
      flex={false}
      style={{
        height: height,
        width: width,
        borderWidth: radius,
        borderRadius: radius,
        borderColor: color ? color : colors.black,
      }}
    />
  );
};

const DiabeticMeasure = ({value}) => {
  return (
    <Text xlarge accent center style={{top: '-15%'}}>
      {value}
    </Text>
  );
};

const Indicator = props => {
  const {children, color} = props;
  return (
    <Text
      mediumSemiBold
      black
      center
      style={{
        borderWidth: 1,
        borderColor: color ? color : colors.accent,
        backgroundColor: color ? color : colors.accent,
        borderRadius: 15,
        paddingHorizontal: 10,
      }}>
      {children}
    </Text>
  );
};

const SwitchButton = props => {
  const {S1, S2, state, text, color, margin, onPress} = props;
  return (
    <Block
      flex={false}
      button
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderRadius: 300,
        borderColor: color,
        backgroundColor: S1
          ? state
            ? null
            : color
          : S2
          ? state
            ? color
            : null
          : null,
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginLeft: margin,
        elevation: S1 ? (state ? null : 8) : S2 ? (state ? 8 : null) : null,
      }}>
      <Text small grey center middle>
        {text}
      </Text>
    </Block>
  );
};

const ImgPrevActionButton = props => {
  const {action, icon} = props;
  return (
    <TouchableOpacity onPress={action} style={styles.actionBtnContainer}>
      <Image
        style={styles.imgIcon}
        resizeMode="center"
        source={{
          uri: icon,
        }}
      />
    </TouchableOpacity>
  );
};

const Toast = msg => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};

export {
  Divider,
  DiabeticMeasure,
  Indicator,
  SwitchButton,
  ImgPrevActionButton,
  Toast,
};

const styles = StyleSheet.create({
  actionBtnContainer: {
    flex: 0.5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
    height: 60,
    width: 60,
  },
});

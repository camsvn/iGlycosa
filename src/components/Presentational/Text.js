import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
// local imports
import {typography} from '../../constants/TypographyConstants';
import {colors} from '../../constants/ColorConstants';

export default class Typography extends Component {
  render() {
    const {
      //fontSize
      size,
      //preset
      xlarge,
      large,
      mediumBold,
      mediumSemiBold,
      small,
      //color
      accent,
      primary,
      secondary,
      ternary,
      lightred,
      lightgreen,
      black,
      grey,
      //styling
      center,
      middle,
      right,
      top,
      //general
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      //default
      typography.body,
      //preset
      xlarge && typography.xlargeText,
      large && typography.largeText,
      mediumBold && typography.mediumTextBold,
      mediumSemiBold && typography.mediumTextSemiBold,
      small && typography.accentBody,
      //custom font size
      size && {fontSize: size},
      //color
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      ternary && styles.ternary,
      lightred && styles.lightred,
      lightgreen && styles.lightgreen,
      black && styles.black,
      grey && styles.grey,
      //align
      center && styles.center,
      middle && styles.middle,
      right && styles.right,
      top && {top: top},
      //overwrite styles
      style,
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  //colors
  accent: {color: colors.accent},
  primary: {color: colors.primary},
  secondary: {color: colors.secondary},
  ternary: {color: colors.ternary},
  lightred: {color: colors.lightred},
  lightgreen: {color: colors.lightgreen},
  black: {color: colors.black},
  grey: {color: colors.grey},
  //position
  center: {textAlign: 'center'},
  middle: {textAlignVertical: 'center'},
  right: {textAlign: 'right'},
});

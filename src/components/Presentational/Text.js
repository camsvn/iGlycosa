import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

import {typography} from '../../constants/TypographyConstants';
import {colors} from '../../constants/ColorConstants';
import {proportionedPixel} from '../../constants/DimensionConstants';

export default class Typography extends Component {
  render() {
    const {
      //fontSize
      size,
      //preset
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
      //styling
      center,
      right,
      //general
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      //default
      typography.body,
      //preset
      large && typography.largeText,
      mediumBold && typography.mediumTextBold,
      mediumSemiBold && typography.mediumTextSemiBold,
      small && typography.accentBody,
      //custom font size
      // size && {fontSize: proportionedPixel(size)},
      size && {fontSize: size},
      //color
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      ternary && styles.ternary,
      lightred && styles.lightred,
      lightgreen && styles.lightgreen,
      black && styles.black,
      //align
      center && styles.center,
      right && styles.right,
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
  //position
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
});

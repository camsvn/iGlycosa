import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

import {spacing, proportionedPixel} from '../../constants/DimensionConstants';
import {colors} from '../../constants/ColorConstants';

export default class Block extends Component {
  render() {
    const {
      flex,
      button,
      height,
      width,
      row,
      column,
      center,
      middle,
      left,
      right,
      card,
      shadow,
      color,
      space,
      style,
      children,
      ...props
    } = this.props;

    const blockStyles = [
      styles.block,
      flex && {flex},
      flex === false && {flex: 0},
      //   height && {height: proportionedPixel(height)},
      //   width && {width: proportionedPixel(width)},
      height && {height: height},
      width && {width: width},
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      card && styles.card,
      shadow && styles.shadow,
      space && {justifyContent: `space-${space}`},
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style, // rewrite predefined styles
    ];

    if (button) {
      return (
        <TouchableOpacity style={blockStyles} {...props}>
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: spacing.border,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  //colors
  accent: {backgroundColor: colors.accent},
  primary: {backgroundColor: colors.primary},
  secondary: {backgroundColor: colors.secondary},
  ternary: {backgroundColor: colors.ternary},
  lightred: {backgroundColor: colors.lightred},
  lightgreen: {backgroundColor: colors.lightgreen},
  black: {backgroundColor: colors.black},
});

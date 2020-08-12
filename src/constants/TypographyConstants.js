import {StyleSheet, PixelRatio} from 'react-native';

let fontScaleFactor = 0.8500000238418579;
let fontScale = PixelRatio.getFontScale();

const fontSize = {
  xh1: (65 * fontScaleFactor) / fontScale,
  h1: (55 * fontScaleFactor) / fontScale,
  h2: (48 * fontScaleFactor) / fontScale,
  h3: (42 * fontScaleFactor) / fontScale,
  h4: (34 * fontScaleFactor) / fontScale,
  h5: (28 * fontScaleFactor) / fontScale,
  h6: (22 * fontScaleFactor) / fontScale,
  body: (15 * fontScaleFactor) / fontScale,
};

const font = {
  montserratSemiBold: 'Montserrat-SemiBold',
  montserrat: 'Montserrat-Regular',
  montserratBold: 'Montserrat-Bold',
  proximaNovaExtraBold: 'Proxima Nova Extrabold',
  proximaNova: 'ProximaNova-Regular',
};

const typography = StyleSheet.create({
  xlargeText: {
    fontFamily: font.proximaNovaExtraBold,
    fontSize: fontSize.xh1,
  },
  largeText: {
    fontFamily: font.proximaNovaExtraBold,
    fontSize: fontSize.h1,
  },
  medlargeText: {
    fontFamily: font.montserrat,
    fontSize: fontSize.h3,
  },
  mediumTextSemiBold: {
    fontFamily: font.montserratSemiBold,
    fontSize: fontSize.h6,
  },
  mediumTextBold: {
    fontFamily: font.montserratBold,
    fontSize: fontSize.h6,
  },
  body: {
    fontFamily: font.proximaNova,
    fontSize: fontSize.body,
  },
  accentBody: {
    fontFamily: font.montserrat,
    fontSize: fontSize.body,
  },
});

export {fontSize, font, typography};

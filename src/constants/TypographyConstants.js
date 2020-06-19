import {
  proportionedPixel,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './DimensionConstants';
import {StyleSheet} from 'react-native';

const fontSize = {
  h1: proportionedPixel(55),
  h2: proportionedPixel(48),
  h3: proportionedPixel(42),
  h4: proportionedPixel(34),
  h5: proportionedPixel(28),
  h6: proportionedPixel(22),
  body: proportionedPixel(15),
};

const font = {
  montserratSemiBold: 'Montserrat-SemiBold',
  montserrat: 'Montserrat-Regular',
  montserratBold: 'Montserrat-Bold',
  proximaNovaExtraBold: 'Proxima Nova Extrabold',
  proximaNova: 'ProximaNova-Regular',
};

const typography = StyleSheet.create({
  largeText: {
    fontFamily: font.proximaNovaExtraBold,
    fontSize: fontSize.h1,
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

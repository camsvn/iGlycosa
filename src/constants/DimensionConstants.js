import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const proportionedPixel = designPixels => {
  /** STANDARD CONVERSION **
   * const screenProportion = Dimensions.get('window').width / 180;
   * return PixelRatio.roundToNearestPixel(designPixels * screenProportion);
   */
  /**
  |--------------------------------------------------
  | Why:
  |     169.09 -> 'baseline device' dpi
  |     420 -> screenWidth of DesignScreen(XD)
  | PS:
  |     baseline -> Moto G5
  |--------------------------------------------------
  */
  const designScreenProportion = 420 / 166.09;
  return PixelRatio.roundToNearestPixel(
    (designPixels * pixelRatio) / designScreenProportion,
  );
};

const viewportWidth = Dimensions.get('window').width;
const pixelRatio = PixelRatio.get();

const spacing = {
  base: proportionedPixel(12),
  border: proportionedPixel(15),
  margin: proportionedPixel(15),
};

export {
  widthPercentageToDP,
  heightPercentageToDP,
  proportionedPixel,
  spacing,
  viewportWidth,
  pixelRatio,
};

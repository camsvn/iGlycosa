import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);

  // console.log(PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100));
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  console.log(heightPercent);
  console.log(
    PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100),
  );
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const proportionedPixel = designPixels => {
  // const screenProportion = Dimensions.get('window').width / 180;
  // return PixelRatio.roundToNearestPixel(designPixels * screenProportion);

  //designScreenProportion Definition: 169.09 -> 'baseline' dpi | 420 -> screenWidth of DesignScreen(XD)
  const designScreenProportion = 420 / 166.09;
  return PixelRatio.roundToNearestPixel(
    (designPixels * PixelRatio.get()) / designScreenProportion,
  );
};

const spacing = {
  base: proportionedPixel(12),
  border: proportionedPixel(15),
  margin: proportionedPixel(15),
};

export {widthPercentageToDP, heightPercentageToDP, proportionedPixel, spacing};

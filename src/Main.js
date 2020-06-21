import React from 'react';
import {
  PixelRatio,
  Dimensions,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

// import Text from './components/Presentational/Text';
import {Block, Text} from './components/Presentational';
import {colors} from './constants/ColorConstants';

import {
  proportionedPixel,
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from './constants/DimensionConstants';

const SLIDER_1_FIRST_ITEM = 1;

const icon = {
  redArrow: `https://ik.imagekit.io/spczdrnbec/tr:w-${proportionedPixel(
    80,
  )}/Red_Arrow_QC7kAQGl4.png`,
  greenArrow: `https://ik.imagekit.io/spczdrnbec/tr:w-${proportionedPixel(
    80,
  )}/Green_Arrow_BjkEZJ6Xk.png`,
};
const graph = [
  {
    title: 'Graph 1',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Main Graph',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'Graph 2',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
];

const logData = [
  {
    id: '1',
    gcount: 105,
    time: '11:00 PM',
  },
  {
    id: '2',
    gcount: 90,
    time: '07:00 PM',
  },
  {
    id: '3',
    gcount: 125,
    time: '05:00 PM',
  },
  {
    id: '4',
    gcount: 85,
    time: '03:00 PM',
  },
  {
    id: '5',
    gcount: 99,
    time: '1:00 PM',
  },
  {
    id: '6',
    gcount: 105,
    time: '11:00 AM',
  },
  {
    id: '7',
    gcount: 130,
    time: '08:00 AM',
  },
];

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const viewportWidth = Dimensions.get('window').width;
const slideWidth = wp(88);
const itemHorizontalMargin = wp(0);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      uploadMode: true,
    };
  }

  _handleUploadModePress() {
    this.setState({uploadMode: true});
  }

  _handleAnalyzeModePress() {
    this.setState({uploadMode: false});
  }

  _renderItem({item, index}) {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: '85%',
            width: itemWidth,
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 20,
          }}>
          {/* <Image
            source={{uri: item.illustration}}
            style={{height: '100%', width: '100%', borderRadius: 15}}
          /> */}
          <Text large primary center>
            {item.title}
          </Text>
        </View>
        <Block
          flex={false}
          color="secondary"
          style={{
            height: '15%',
            width: '88%',
            // top: -1,
            zIndex: -1,
            justifyContent: 'center',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}>
          <Text small accent style={{marginHorizontal: 10}}>
            {item.title}
          </Text>
        </Block>
      </View>
    );
  }

  render() {
    const {uploadMode} = this.state;
    return (
      <Block color="primary">
        <StatusBar
          // translucent={true}
          backgroundColor={'#076C63'}
          barStyle="light-content"
        />
        {/**
        |--------------------------------------------------
        | Header Container
        |--------------------------------------------------
        */}
        <Block flex={0.285} center color="secondary">
          <Block flex={false} row center style={{height: '45%'}}>
            <Block
              flex={0.5}
              style={
                {
                  // borderWidth: 2,
                  // borderColor: 'coral',
                }
              }
            />
            {/* <Block style={{width: '1%', height: '80%', borderWidth: 2}}> */}
            <Block
              flex={false}
              // color="primary"
              style={{
                height: '90%',
                // width: '0.5%',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: colors.primary,
              }}
            />
            {/* </Block> */}
            <Block
              flex={0.5}
              style={
                {
                  // borderWidth: 2,
                  // borderColor: 'blue',
                }
              }
            />
          </Block>
          <Block
            flex={false}
            // color="primary"
            style={{
              // height: '1.25%',
              width: '95%',
              borderRadius: 5,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          />
        </Block>

        {/**
          |--------------------------------------------------
          | Body Container
          |--------------------------------------------------
        */}
        <Block flex={0.615} style={{}}>
          {/**
           * Chart + Pagination Container
           */}
          <Block flex={0.68} center style={{}}>
            {/**
             * Chart View
             */}
            <Block
              flex={false}
              style={{
                height: '115%',
                // borderWidth: 2,
                // borderColor: 'blue',
                width: '100%',
                top: '-33%',
              }}>
              <Carousel
                data={graph}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.92}
                inactiveSlideOpacity={1}
                onSnapToItem={index =>
                  this.setState({slider1ActiveSlide: index})
                }
              />
            </Block>
            {/**
             * ChartPagination View
             */}
            {/* <Block flex={false} style={{top: '-39%'}}>
              <Pagination
                dotsLength={graph.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                // containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 8,
                }}
                inactiveDotColor={'rgba(255, 255, 255, 0.6)'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
              />
            </Block> */}
          </Block>
          <Block flex={0.04} center style={{}}>
            <Block style={{position: 'absolute', top: '-410%'}}>
              <Pagination
                dotsLength={graph.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                // containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginHorizontal: 8,
                }}
                inactiveDotColor={'rgba(255, 255, 255, 0.6)'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
              />
            </Block>
          </Block>
          {/**
           * Log Container
           */}
          <Block
            flex={0.3}
            style={{
              // borderWidth: 3,
              // borderColor: 'white',
              // position: 'absolute',
              // height: hd(18),
              width: viewportWidth,
              // top: '61%',
              justifyContent: 'space-around',
            }}>
            <FlatList
              data={logData}
              horizontal={true}
              style={{top: '-30%', position: 'absolute', height: '100%'}}
              renderItem={({item}) => (
                <Block
                  // flex={false}
                  color={item.gcount > 100 ? 'ternary' : 'secondary'}
                  card
                  middle
                  height={'100%'}
                  width={wd(26)}
                  style={{
                    marginHorizontal: 4,
                    justifyContent: 'flex-end',
                  }}>
                  <Block
                    flex={false}
                    style={{
                      borderBottomWidth: 2,
                      borderColor:
                        item.gcount > 100
                          ? 'rgba(224,189,189,0.3)'
                          : 'rgba(169,217,215,0.3)',
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: '-69%',
                      // left: '-22%',
                    }}>
                    <Image
                      resizeMode="center"
                      source={{
                        uri:
                          item.gcount > 100 ? icon.redArrow : icon.greenArrow,
                      }}
                      style={{
                        height: '100%',
                        top: '35%',
                      }}
                    />
                  </Block>
                  <Block flex={false} style={{top: '-3%'}}>
                    <Text center large black style={{top: '8%'}}>
                      {item.gcount}
                    </Text>
                    <Text center mediumBold black style={{top: '-5%'}}>
                      mg/dL
                    </Text>
                    <Text
                      small
                      accent
                      style={{marginLeft: '12%', bottom: '3%'}}>
                      {item.time}
                    </Text>
                  </Block>
                </Block>
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </Block>
        </Block>

        {/**
        |--------------------------------------------------
        | Footer Container
        |--------------------------------------------------
        */}
        <Block
          flex={0.1}
          style={{borderTopWidth: 1, borderColor: colors.accent}}>
          {/**
           * Eye Scanner Icon
           */}
          <Block
            flex={false}
            card
            // middle
            // button
            color="accent"
            style={{
              height: proportionedPixel(60),
              width: proportionedPixel(60),
              zIndex: 2,
              position: 'absolute',
              top: -proportionedPixel(30),
              left: wd(50) - proportionedPixel(29),
            }}>
            <TouchableOpacity>
              {/* <Image
                resizeMode="center"
                source={{
                  uri: `https://ik.imagekit.io/spczdrnbec/tr:w-${proportionedPixel(
                    60,
                  ) * PixelRatio.get()}/eyeScanerGreen_eYQ5fQ51N.png`,
                }}
                style={{
                  height: '100%',
                  marginHorizontal: wd(1),
                  // top: -wd(0.5),
                }}
              /> */}
              <Image
                resizeMode="center"
                source={{
                  uri: `https://ik.imagekit.io/spczdrnbec/tr:w-${proportionedPixel(
                    60,
                  ) * PixelRatio.get()}/eyeScannerGreen_fX8TsdJxQ.gif`,
                }}
                style={{
                  height: '100%',
                  marginHorizontal: wd(1),
                  // top: -wd(0.5),
                }}
              />
            </TouchableOpacity>
          </Block>
          {/**
           * Footer Mode Switch Container
           */}
          <Block row center space="around">
            <Block
              flex={false}
              button
              onPress={this._handleAnalyzeModePress.bind(this)}
              style={{
                borderWidth: 1,
                borderRadius: 300,
                borderColor: 'white',
                backgroundColor: uploadMode ? null : 'white',
                paddingHorizontal: 15,
                paddingVertical: 4,
                elevation: uploadMode ? null : 8,
                // marginHorizontal: wp(2),
              }}>
              <Text small grey center middle>
                Analyze mode
              </Text>
            </Block>
            <Block
              flex={false}
              // color="accent"
              button
              onPress={this._handleUploadModePress.bind(this)}
              style={{
                borderWidth: 1,
                borderRadius: 300,
                borderColor: 'white',
                backgroundColor: uploadMode ? 'white' : null,
                paddingHorizontal: 15,
                paddingVertical: 4,
                marginLeft: wd(10),
                elevation: uploadMode ? 8 : null,
              }}>
              <Text small grey center middle>
                Upload mode
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default Main;

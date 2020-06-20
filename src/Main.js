import React from 'react';
import {PixelRatio, Dimensions, View, ScrollView, Image} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

// import Text from './components/Presentational/Text';
import {Block, Text} from './components/Presentational';

import {
  proportionedPixel,
  widthPercentageToDP as wd,
  heightPercentageToDP as hd,
} from './constants/DimensionConstants';

const SLIDER_1_FIRST_ITEM = 1;
const graph = [
  {
    title: 'Graph 1',
    color: 'white',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Main Graph',
    color: 'white',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'Graph 2',
    color: 'white',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
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
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: '85%',
            width: itemWidth,
            backgroundColor: item.color,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 30,
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
    return (
      <Block color="primary">
        {/**
        |--------------------------------------------------
        | Header Container
        |--------------------------------------------------
        */}
        <Block flex={0.285} color="secondary" />

        {/**
          |--------------------------------------------------
          | Body Container
          |--------------------------------------------------
        */}
        <Block flex={0.615}>
          <Block center>
            <Block
              flex={false}
              style={{
                height: '76%',
                // borderWidth: 2,
                // borderColor: 'blue',
                width: '100%',
                top: '-23%',
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
            <Block flex={false} style={{top: '-27%'}}>
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
        </Block>

        {/**
        |--------------------------------------------------
        | Footer Container
        |--------------------------------------------------
        */}
        <Block flex={0.1} style={{borderTopWidth: 2, borderColor: 'white'}}>
          <Block
            flex={false}
            card
            color="accent"
            style={{
              height: proportionedPixel(60),
              width: proportionedPixel(60),
              zIndex: 2,
              position: 'absolute',
              top: -proportionedPixel(30),
              left: wd(50) - proportionedPixel(29),
            }}
          />
          {/**
           * Footer Mode Switch Container
           */}
          <Block row center space="around">
            <Block
              flex={false}
              style={{
                borderWidth: 1,
                borderRadius: 300,
                borderColor: 'white',
                paddingHorizontal: 15,
                paddingVertical: 4,
                // marginHorizontal: wp(2),
              }}>
              <Text small grey center middle>
                Analyze mode
              </Text>
            </Block>
            <Block
              flex={false}
              color="accent"
              style={{
                borderWidth: 1,
                borderRadius: 300,
                borderColor: 'white',
                paddingHorizontal: 15,
                paddingVertical: 4,
                marginLeft: wp(10),
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

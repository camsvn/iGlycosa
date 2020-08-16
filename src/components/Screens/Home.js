import React from 'react';
import {
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
// 3rd-Party package imports
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
// local imports
import {
  Block,
  Text,
  Divider,
  DiabeticMeasure,
  Indicator,
  SwitchButton,
} from './../Presentational';
import {
  viewportWidth,
  proportionedPixel as pp,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './../../constants/DimensionConstants';
import {colors} from './../../constants/ColorConstants';
import {icons} from './../../constants/ImageConstants';
import * as mocks from './../../constants/MockData';
import Chart from '../Screens/svgChart';
import {getdata, toDate} from '../../constants/api';

// Global Constants
const SLIDER_FIRST_ITEM = 1;
const SLIDE_WIDTH = wp(95); // 88 for multiple side items
const SLIDE_HEIGHT = hp(85);
// let read;
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_FIRST_ITEM,
      uploadMode: true,
      data: null,
    };
  }

  _fetchLatestData() {
    firestore()
      .collection('Datas')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(QuerySnapshot => {
        // console.log('Got Users collection result.', QuerySnapshot.size);
        QuerySnapshot.forEach(documentSnapshot => {
          // console.log('Fetched', documentSnapshot.data().createdAt.toDate());
          let data = documentSnapshot.data();
          this.setState({
            read: data.g_reading,
            createdAt: toDate(data.createdAt),
          });
        });
      });
  }

  _fetchData() {
    firestore()
      .collection('Datas')
      .where('isUpload', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .onSnapshot(QuerySnapshot => {
        const CUdata = [];
        // this.setState({data: QuerySnapshot});
        QuerySnapshot.forEach(documentSnapshot => {
          const id = documentSnapshot.id;
          const time = toDate(documentSnapshot.data().createdAt);
          const newDoc = {id, time, ...documentSnapshot.data()};
          CUdata.push(newDoc);
        });
        this.setState({data: CUdata.length > 0 ? CUdata : null});
      });
  }

  _handleOnSnapToItem(index) {
    this.setState({slider1ActiveSlide: index});
  }

  _handleScannerClick() {
    const {navigation} = this.props;
    navigation.navigate('Scanner', {mode: this.state.uploadMode});
  }

  _handleUploadModePress() {
    this.setState({uploadMode: true});
  }

  _handleAnalyzeModePress() {
    this.setState({uploadMode: false});
  }

  _renderGraphCard({item}) {
    return (
      <Block center>
        <Block flex={false} card center middle style={styles.graphContainer}>
          {/* <Chart data={this.state.data ? this.state.data : null} /> */}
          <Chart fetch={11} />
          {/* <Text
            large
            primary
            center
            style={{
              borderWidth: 2,
              borderColor: colors.red,
              flex: 1,
              borderRadius: 15,
            }}>
            {item.title}
          </Text> */}
        </Block>
        {/* </View> */}
        <Block flex={false} color="secondary" style={styles.graphDefContainer}>
          <Text small accent center style={{marginHorizontal: 10}}>
            {item.title}
          </Text>
        </Block>
      </Block>
    );
  }

  _renderLogCards({item}) {
    return (
      <Block
        card
        center
        color={item.g_reading > 100 ? 'ternary' : 'secondary'}
        style={styles.logCardContainer}>
        <Block flex={false} style={styles.logCardIconContainer}>
          <Image
            style={styles.logCardIcon}
            resizeMode="center"
            source={{
              uri: item.g_reading > 100 ? icons.redArrow : icons.greenArrow,
            }}
          />
        </Block>
        <Block flex={false} top={'-3%'}>
          <Text center large black top={'8%'}>
            {item.g_reading}
          </Text>
          <Text center mediumBold black top={'-5%'}>
            mg/dL
          </Text>
          <Text small accent center>
            {item.time ? item.time : '--'}
          </Text>
        </Block>
      </Block>
    );
  }

  async componentDidMount() {
    // getdata().then(res => this.setState({read: res}));
    // this._fetchLatestData();
    this._fetchData();
  }

  render() {
    const {uploadMode, data} = this.state;
    // console.log(data && data[0]);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
        <StatusBar backgroundColor={'#076C63'} barStyle="light-content" />
        {/**
        |--------------------------------------------------
        | Header Container
        |--------------------------------------------------
        */}
        <Block flex={0.285} center color="secondary">
          <Block flex={false} row center height={'45%'}>
            <Block flex={0.5}>
              <Block flex={0.4} row middle center space="evenly">
                <Text mediumSemiBold black>
                  {/* 11:00 PM */}
                  {/* {createdAt ? createdAt : '--'} */}
                  {data ? (data[0].time ? data[0].time : '--') : '--'}
                </Text>
                <Divider radius={3} />
                <Indicator
                  color={
                    data
                      ? data[0].g_reading > 100
                        ? colors.warningRed
                        : data[0].g_reading >= 80
                        ? colors.safeGreen
                        : colors.safeYellow
                      : colors.secondary
                  }>
                  {data
                    ? data[0].g_reading > 100
                      ? 'HIGH'
                      : data[0].g_reading >= 80
                      ? 'NORM'
                      : 'LOW'
                    : '--'}
                </Indicator>
              </Block>
              <Block flex={0.6}>
                <DiabeticMeasure value={data ? data[0].g_reading : '--'} />
              </Block>
            </Block>
            <Divider height={'90%'} radius={2} color={'rgba(0,0,15,0.6)'} />
            <Block flex={0.5}>
              <Block flex={0.4} row middle center space="evenly">
                <Indicator color={colors.safeGreen}>E-A1C</Indicator>
                <Divider radius={3} />
                <Text mediumSemiBold black>
                  90 DAYS
                </Text>
              </Block>
              <Block flex={0.6}>
                <DiabeticMeasure value={5.8} />
              </Block>
            </Block>
          </Block>
          <Divider width={'95%'} radius={2} color={'rgba(0,0,15,0.6)'} />
        </Block>
        {/**
          |--------------------------------------------------
          | Body Container
          |     Carousal + Pagination + Flatist(Log)
          |--------------------------------------------------
        */}
        <Block flex={0.615}>
          <Block flex={0.68} center>
            <Block flex={false} style={styles.carousalContainer}>
              <Carousel
                data={mocks.graph}
                renderItem={this._renderGraphCard.bind(this)}
                sliderWidth={viewportWidth}
                itemWidth={SLIDE_WIDTH}
                firstItem={SLIDER_FIRST_ITEM}
                inactiveSlideScale={0.92}
                inactiveSlideOpacity={1}
                onSnapToItem={this._handleOnSnapToItem.bind(this)}
              />
            </Block>
          </Block>
          <Block flex={0.04} center>
            <Block style={styles.paginationContainer}>
              <Pagination
                dotsLength={mocks.graph.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                dotStyle={styles.paginationDotStyle}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                inactiveDotColor={'rgba(255, 255, 255, 0.6)'}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
              />
            </Block>
          </Block>
          <Block flex={0.3} width={'100%'}>
            <FlatList
              data={data ? data : []}
              horizontal={true}
              style={styles.logContainer}
              renderItem={this._renderLogCards.bind(this)}
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
        <Block flex={0.1} style={styles.footerContainer}>
          <Block card color="accent" style={styles.scannerButtonContainer}>
            <TouchableOpacity onPress={this._handleScannerClick.bind(this)}>
              <Image
                style={styles.scannerIcon}
                resizeMode="center"
                source={{
                  uri: icons.eye,
                }}
              />
            </TouchableOpacity>
          </Block>
          <Block row center space="around">
            <SwitchButton
              S1
              state={uploadMode}
              text={'Analyze mode'}
              color={'white'}
              onPress={this._handleAnalyzeModePress.bind(this)}
            />
            <SwitchButton
              S2
              state={uploadMode}
              text={'Upload mode'}
              color={'white'}
              margin={wp(10)}
              onPress={this._handleUploadModePress.bind(this)}
            />
          </Block>
        </Block>
      </SafeAreaView>
    );
  }
}

export default Main;

const styles = StyleSheet.create({
  carousalContainer: {
    height: '115%',
    width: '100%',
    top: '-33%',
  },
  graphContainer: {
    height: '85%',
    width: SLIDE_WIDTH,
    backgroundColor: 'white',
    elevation: 20,
  },
  graphDefContainer: {
    height: '15%',
    width: '88%',
    zIndex: -1,
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  paginationContainer: {
    position: 'absolute',
    top: '-410%',
  },
  paginationDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  logContainer: {
    top: '-30%',
    position: 'absolute',
    height: '100%',
  },
  logCardContainer: {
    height: '100%',
    width: wp(26),
    marginHorizontal: 6,
    justifyContent: 'flex-end',
  },
  logCardIconContainer: {
    borderBottomWidth: 2,
    borderColor: 'rgba(68,69,85,0.8)',
    height: '100%',
    width: '80%',
    position: 'absolute',
    top: '-69%',
  },
  logCardIcon: {
    height: '100%',
    top: '35%',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderColor: colors.accent,
  },
  scannerButtonContainer: {
    height: pp(56),
    width: pp(56),
    zIndex: 2,
    position: 'absolute',
    top: -pp(28),
    left: wp(50) - pp(27),
    borderWidth: 1,
    transform: [{rotate: '45deg'}],
  },
  scannerIcon: {
    height: '100%',
    marginHorizontal: wp(1),
    transform: [{rotate: '-45deg'}],
  },
});

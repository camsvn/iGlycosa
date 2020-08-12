import * as React from 'react';
import {Animated, TextInput, View, Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');
import {colors} from '../../constants/ColorConstants';
import {typography} from '../../constants/TypographyConstants';

const minValue = 60;
const segmentsLength = 171;
const segmentWidth = 2;
const segmentSpacing = 20;
const spacerWidth = (width - segmentWidth) / 2;
const snapTo = segmentWidth + segmentSpacing;
const rulerWidth = width + (segmentsLength - 1) * snapTo;
const indicatorWrapperWidth = 100;
const data = [...Array(segmentsLength).keys()].map(i => i + minValue);

const Ruler = () => {
  return (
    <View style={styles.ruler}>
      <View style={styles.spacer} />
      {data.map(i => {
        const tenth = i % 10 === 0;
        const fifth = i % 5 === 0;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                backgroundColor: tenth ? colors.lightred : colors.secondary,
                height: tenth ? 50 : fifth ? 35 : 20,
                // marginRight: i === data.length - 1 ? 0 : segmentSpacing,
                marginRight: segmentSpacing,
              },
            ]}
          />
        );
      })}
      <View style={styles.spacer} />
    </View>
  );
};

export default class Picker extends React.Component {
  textRef = React.createRef();
  scrollRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      scrolledX: new Animated.Value(0),
      initialAge: 90,
    };
    this.state.scrolledX.addListener(({value}) => {
      const sliderValue = Math.round(value / snapTo);
      if (this.textRef && this.textRef.current) {
        this.textRef.current.setNativeProps({
          text: `${sliderValue + minValue} mg/dL`,
        });
      }
      this.props.onValueChange(sliderValue + minValue);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.scrollRef && this.scrollRef.current) {
        this.scrollRef.current.scrollTo({
          x: this._calculateOffset(),
          y: 0,
          animated: true,
        });
      }
    }, 500);
  }

  _calculateOffset = () => {
    return snapTo * (this.state.initialAge - minValue);
  };

  render() {
    return (
      <View>
        <Animated.ScrollView
          //   style={[StyleSheet.absoluteFillObject, {alignItems: 'flex-end'}]}
          horizontal
          ref={this.scrollRef}
          onLayout={event => {
            this.frameWidth = event.nativeEvent.layout.width;
            const maxOffset = this.contentWidth - this.frameWidth;
            if (maxOffset < this.xOffset) {
              this.xOffset = maxOffset;
            }
          }}
          onContentSizeChange={contentWidth => {
            this.contentWidth = contentWidth;
            const maxOffset = this.contentWidth - this.frameWidth;
            if (maxOffset < this.xOffset) {
              this.xOffset = maxOffset;
            }
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: this.state.scrolledX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          snapToInterval={snapTo}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          <Ruler />
        </Animated.ScrollView>
        <View style={styles.indicatorWrapper}>
          <TextInput
            ref={this.textRef}
            style={[styles.text, typography.medlargeText]}
            editable={false}
          />
          <View
            style={[
              styles.segment,
              styles.indicator,
              {width: segmentWidth * 2, borderRadius: 50},
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: 'absolute',
    // borderWidth: 2,
    // borderColor: '#fff',
    // backgroundColor: '#aaa',
  },
  spacer: {
    width: spacerWidth,
    height: 100,
    // backgroundColor: '#aaa',
  },
  ruler: {
    width: rulerWidth,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  segment: {
    width: segmentWidth,
  },
  text: {
    fontSize: 42,
    fontFamily: 'Menlo',
    // marginBottom: 10,
    color: colors.accent,
    position: 'relative',
    top: 8,
    // backgroundColor: '#666',
    textAlign: 'center',
    width: '200%',
  },
  indicator: {
    height: 70,
    // backgroundColor: '#f5afaf',
    backgroundColor: colors.warningRed,
  },
  indicatorWrapper: {
    position: 'absolute',
    left: (width - indicatorWrapperWidth) / 2,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: indicatorWrapperWidth,
  },
});

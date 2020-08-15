import React from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {View, Text, Dimensions} from 'react-native';
import {AreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  viewportWidth,
  proportionedPixel as pp,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './../../constants/DimensionConstants';

export default class AreaChartExample extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Text>Bezier Line Chart</Text> */}
        <LineChart
          data={{
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'Novemeber',
              'December',
            ],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 200,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 200,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 200,
                  Math.random() * 100,
                  Math.random() * 200,
                  Math.random() * 100,
                  Math.random() * 200,
                ],
              },
            ],
          }}
          width={wp(88.3)} // from react-native
          height={hp(38.8)}
          //   yAxisLabel="$"
          yAxisSuffix=" mg/dL"
          yAxisInterval={2} // optional, defaults to 1
          yLabelsOffset={3}
          xLabelsOffset={5}
          formatXLabel={label => `${label.slice(0, 3)}`}
          verticalLabelRotation={45}
          segments={3}
          chartConfig={{
            // backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 0.5) => `rgba(255, 225, 225, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(68, 69, 85, ${opacity})`,
            style: {
              borderRadius: 16,
              paddingLeft: 50,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            borderRadius: 15,
            height: '100%',
            width: '100%',
            // marginVertical: 8,
            // marginHorizontal: 8,
            // flex: 1,
            // paddingLeft: 5,
            // borderRadius: 16,
          }}
        />
      </View>
    );
  }
}

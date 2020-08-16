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
import firestore from '@react-native-firebase/firestore';
import {toDate} from '../../constants/api';

export default class AreaChartExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {data: null, graphData: null};
  }

  _updateState() {
    setInterval(
      () =>
        this.props.data &&
        this.setState({graphData: this.props.data.slice(0, 11).reverse()}),
      3000,
    );
  }

  _fetchData() {
    var query = firestore()
      .collection('Datas')
      .where('isUpload', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(this.props.fetch)
      // .get();
      .onSnapshot(QuerySnapshot => {
        // console.log('SIZE', QuerySnapshot && QuerySnapshot.size);
        const CUdata = [];
        // this.setState({data: QuerySnapshot});
        QuerySnapshot &&
          QuerySnapshot.forEach(documentSnapshot => {
            const id = documentSnapshot.id;
            const time = toDate(documentSnapshot.data().createdAt);
            const newDoc = {id, time, ...documentSnapshot.data()};
            CUdata.push(newDoc);
          });
        this.setState({graphData: CUdata.length > 0 ? CUdata.reverse() : null});
      });
  }
  componentDidMount() {
    // setInterval(() => (this.data = this.props.data), 3000);
    // this._updateState();
    this._fetchData();
    // setInterval(
    //   () => this.props.data && this.setState({data: this.props.data}),
    //   3000,
    // );
    // console.log(this.props.data && this.props.data.length);
    // this.setState({data: this.props.data});
  }

  acquireData = () => {
    const {graphData} = this.state;
    let labels = [];
    let data = [];
    if (graphData) {
      graphData.forEach(element => {
        labels.push(element.time);
        data.push(element.g_reading);
      });
    }
    return {labels, data};
  };

  render() {
    const {graphData} = this.state;
    const {labels, data} = this.acquireData();
    // console.log(labels, data);
    // graphData && console.log(graphData[0].g_reading);
    // const extractData = data ? data.slice(0, 11).reverse() : null;
    // extractData && this.setState({graphData: extractData});
    // console.log(extractData && extractData[0]);
    // extractData
    //   ? this.setState({graphData: extractData.reverse()})
    //   : console.log('No GRAPH');
    return (
      <View style={{flex: 1}}>
        {/* <Text>Bezier Line Chart</Text> */}
        <LineChart
          data={{
            labels,
            // labels: [
            //   'January',
            //   'February',
            //   'March',
            //   'April',
            //   'May',
            //   'June',
            //   'July',
            //   'August',
            //   'September',
            //   'October',
            //   'Novemeber',
            //   'December',
            // ],
            datasets: [
              {
                data: data.length > 0 ? data : [0],
                // data: [
                //   Math.random() * 100,
                //   Math.random() * 200,
                //   Math.random() * 100,
                //   Math.random() * 100,
                //   Math.random() * 200,
                //   Math.random() * 100,
                //   Math.random() * 100,
                //   Math.random() * 200,
                //   Math.random() * 100,
                //   Math.random() * 200,
                //   Math.random() * 100,
                //   Math.random() * 200,
                // ],
              },
            ],
          }}
          width={wp(95.3)} // from react-native
          height={hp(38.8)}
          //   yAxisLabel="$"
          yAxisSuffix=" mg/dL"
          yAxisInterval={2} // optional, defaults to 1
          yLabelsOffset={5}
          xLabelsOffset={-15}
          // formatXLabel={label => `${label.slice(0, 3)}`}
          verticalLabelRotation={75}
          segments={3}
          chartConfig={{
            // backgroundColor: '#F0F0D8',
            backgroundGradientFrom: '#F0F0D8',
            backgroundGradientTo: '#F0F0D8',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(10,155,142, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(68, 69, 85, ${opacity})`,
            propsForDots: {
              r: '3',
              strokeWidth: '1',
              // stroke: '#ffa726',
              stroke: '#707070',
            },
          }}
          bezier
          style={{
            borderRadius: 15,
            // marginVertical: 10,
          }}
        />
      </View>
    );
  }
}

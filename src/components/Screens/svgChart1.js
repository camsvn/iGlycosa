import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

const chartData1 = [
  {label: 'Venezuela', value: '290'},
  {label: 'Saudi', value: '260'},
  {label: 'Canada', value: '180'},
  {label: 'Iran', value: '140'},
  {label: 'Russia', value: '115'},
  {label: 'UAE', value: '100'},
  {label: 'US', value: '30'},
  {label: 'China', value: '30'},
  ,
];

const dataSource2 = {
  chart: {
    caption: 'Average Fastball Velocity',
    yaxisname: 'Velocity (in mph)',
    subcaption: '[2005-2016]',
    numbersuffix: ' mph',
    rotatelabels: '1',
    setadaptiveymin: '1',
    theme: 'fusion',
  },
  data: [
    {
      label: '2005',
      value: '89.45',
    },
    {
      label: '2006',
      value: '89.87',
    },
    {
      label: '2007',
      value: '89.64',
    },
    {
      label: '2008',
      value: '90.13',
    },
    {
      label: '2009',
      value: '90.67',
    },
    {
      label: '2010',
      value: '90.54',
    },
    {
      label: '2011',
      value: '90.75',
    },
    {
      label: '2012',
      value: '90.8',
    },
    {
      label: '2013',
      value: '91.16',
    },
    {
      label: '2014',
      value: '91.37',
    },
    {
      label: '2015',
      value: '91.66',
    },
    {
      label: '2016',
      value: '91.8',
    },
  ],
};

const dataSource1 = {
  chart: {
    caption: 'Countries With Most Oil Reserves [2017-18]',
    subCaption: 'In MMbbl = One Million barrels',
    xAxisName: 'Country',
    yAxisName: 'Reserves (MMbbl)',
    numberSuffix: 'K',
    theme: 'fusion',
  },
  data: chartData1,
};

const dataSource3 = {
  chart: {
    // caption: 'Twitter Mentions',
    // subcaption: '(iPhone Vs Samsung)',
    // bgColor: 'BBBBBB,CCCCCC',
    // bgratio: '0,50',
    // bgAlpha: '270',
    // labelDisplay: 'rotate',
    // yaxisname: 'Number of mentions',
    yAxisPosition: 'right',
    labelStep: '3',
    canvasPadding: '0',
    numbersuffix: 'M',
    // yaxismaxvalue: '2',
    plottooltext:
      '$seriesName was mentioned <b>$dataValue</b> times on Twitter in $label',
    theme: 'fusion',
  },
  categories: [
    {
      category: [
        {
          label: '2007',
        },
        {
          label: '2008',
        },
        {
          label: '2009',
        },
        {
          label: '2010',
        },
        {
          label: '2011',
        },
        {
          label: '2012',
        },
        {
          label: '2013',
        },
        {
          label: '2014',
        },
        {
          label: '2015',
        },
      ],
    },
  ],
  dataset: [
    {
      //   seriesname: 'iPhone',
      //   renderAs: 'area',
      data: [
        {
          value: '1.90',
        },
        {
          value: '1.94',
        },
        {
          value: '1.69',
        },
        {
          value: '1.66',
        },
        {
          value: '1.43',
        },
        {
          value: '1.97',
        },
        {
          value: '1.78',
        },
        {
          value: '1.58',
        },
        {
          value: '1.55',
        },
      ],
    },
    {
      //   seriesname: 'Samsung',
      //   renderAs: 'spline',
      data: [
        {
          value: '0.68',
        },
        {
          value: '0.74',
        },
        {
          value: '0.25',
        },
        {
          value: '0.64',
        },
        {
          value: '0.22',
        },
        {
          value: '0.74',
        },
        {
          value: '0.58',
        },
        {
          value: '0.15',
        },
        {
          value: '0.26',
        },
      ],
    },
  ],
};

export default class PlainColumn2D extends Component {
  constructor(props) {
    super(props);

    const chartConfig = {
      type: 'mssplinearea',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: dataSource3,
    };
    this.state = chartConfig;
    this.libraryPath = {
      uri: 'file:///android_asset/fusioncharts.html',
    };
  }
  render() {
    return (
      <View style={styles.chartContainer}>
        <FusionCharts
          type={this.state.type}
          width={this.state.width}
          height={this.state.height}
          dataFormat={this.state.dataFormat}
          dataSource={this.state.dataSource}
          libraryPath={this.libraryPath} // set the libraryPath property
        />
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.header}>A Column 2D Chart</Text>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },

  header: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },

  chartContainer: {
    height: '97%',
    width: '97%',
    // flex: 1,
    // borderWidth: 2,
    // borderColor: 'rgb(225,0,0)',
    // borderRadius: 15,
    // borderRadius: 15,
    // backgroundColor: '#888',
    // borderColor: '#000',
    // borderWidth: 1,
  },
});

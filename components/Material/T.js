import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';
const data = [
  {year: '2011', earnings: 13000},
  {year: '2012', earnings: 16500},
  {year: '2013', earnings: 14250},
  {year: '2014', earnings: 19000},
];

const T = () => {
  return (
    <View>
      <Text>T</Text>
      <VictoryChart
        width={350}
        domainPadding={10}
        theme={VictoryTheme.material}>
        <VictoryBar data={data} x="year" y="earnings" />
      </VictoryChart>
    </View>
  );
};

export default T;

const styles = StyleSheet.create({});

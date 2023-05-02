import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {VictoryPie, VictoryChart, VictoryTheme} from 'victory-native';

const ChartOverview = ({dataSummary}) => {
  const [dataChart, setdataChart] = useState(dataSummary.slice(0, -1));
  console.log(dataChart);
  return (
    <View>
      {/* <VictoryChart theme={VictoryTheme.material}> */}
      <VictoryPie
        data={dataChart}
        x="x"
        y={data => data.y}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
        animate={{
          duration: 1000,
        }}
        labelRadius={({innerRadius}) => innerRadius + 5}
        innerRadius={10}
        style={{labels: {fill: 'white', fontSize: 20, fontWeight: 'bold'}}}
      />
      {/* </VictoryChart> */}
    </View>
  );
};

export default ChartOverview;

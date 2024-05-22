import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { useTheme } from "@react-navigation/native";
  
  function SpiderChart(props) {
    const characterData = [
      {
        "Chauffage": 2,
        "Cloisonnement/Plâtrage": 2,
        "Démolition": 2,
        "Électricité": 2,
        "Étanchéité": 2,
        "Façade": 2,
        "Fondations": 2,
        "Installation cuisine/SDB": 2,
        "Isolation": 2,
        "Maçonnerie": 2,
        "Menuiserie": 2,
        "Montage de meuble": 2,
        "Peinture": 2,
        "Plomberie": 2,
        "Revêtements muraux": 2,
        "Revêtements sol": 2,
        "Revêtements extérieurs": 2,
        "Toiture": 2,
        "Ventilation": 2,
    },
    props.skills
    ];

    const { colors } = useTheme();
    console.log('typeofcharaData[1]', typeof characterData[1])
    console.log('characterData !!!!!!!!!',characterData)
    const [state, setState] = React.useState({
      data: processData(characterData),
      maxima: getMaxima(characterData)
    });
  
    
    return (
      <>
      {characterData.length === 2 ?
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
      >
        <VictoryGroup colorScale={["transparent", "red"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 1 } }}
        >
          {state.data.map((data, i) => {
            return <VictoryArea key={i} data={data}/>;
          })}
        </VictoryGroup>
      {
        Object.keys(state.maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
              }}

                labelPlacement="perpendicular"
                axisValue={i + 1} label={key}
                tickFormat={(t) => Math.ceil(t * state.maxima[key])}
                tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
        <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ""}
            style={{
                axis: { stroke: "none" },
                grid: { stroke: "grey", opacity: 0.5 }
            }}
        />

    </VictoryChart>
  : <View></View>}
  </>
    );
}
  
  function getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }
  
  function processData(data) {
    const maxByGroup = getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  export default SpiderChart;
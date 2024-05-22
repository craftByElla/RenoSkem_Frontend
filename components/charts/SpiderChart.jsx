import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { useTheme } from "@react-navigation/native";

const characterData = [
    { menuiserie: 1, Electricité: 2, Plomberie: 1, Cloisonnement: 3, revêtement_muraux: 3, Montage_dees_meubles: 3, Installation_cuisine: 2, Maçonnerie: 1, Reevêtement_de_sol: 3, Peinture: 1 },
    { menuiserie: 4, Electricité: 4, Plomberie: 4, Cloisonnement: 4, revêtement_muraux: 4, Montage_dees_meubles: 4, Installation_cuisine: 4, Maçonnerie: 4, Reevêtement_de_sol: 4, Peinture: 4 },
  ];
  
  function SpiderChart() {
    const { colors } = useTheme();
    const [state, setState] = React.useState({
      data: processData(characterData),
      maxima: getMaxima(characterData)
    });
  
    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
      >
        <VictoryGroup colorScale={["gold", "transparent"]}
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
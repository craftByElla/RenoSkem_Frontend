import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis } from "victory-native";
import { useTheme } from "@react-navigation/native";

function SpiderChart(props) {
  const allKeys = React.useMemo(() => Object.keys(props.skills), [props.skills]);

  const { colors } = useTheme();

  const [state, setState] = React.useState({
    data: processData([props.skills], allKeys),
    maxima: getMaxima([props.skills], allKeys)
  });

  React.useEffect(() => {
    const keys = Object.keys(props.skills);
    const data = processData([props.skills], keys);
    const maxima = getMaxima([props.skills], keys);
    setState({ data, maxima });
  }, [props.skills]);

  return (
    <VictoryChart polar
      theme={VictoryTheme.material}
      domain={{ y: [0, 1] }}
    >
      <VictoryGroup colorScale={[`${colors.lightGreen}`]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 1 } }}
      >
        {state.data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {
        allKeys.map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 15, color: colors.deepGreen },
                axis: { stroke: "none" },
                grid: { stroke: "none" },
              }}
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickValues={[1, 2, 3]}
              tickFormat={() => ""} 
              
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: colors.orange, opacity: 0.5 }
        }}
      />
    </VictoryChart>
  );
}

function getMaxima(data, keys) {
  // Fix the maxima for all keys to 3
  return keys.reduce((memo, key) => {
    memo[key] = 3;
    return memo;
  }, {});
}

function processData(data, keys) {
  const maxByGroup = getMaxima(data, keys);
  const makeDataArray = (d) => {
    return keys.map((key) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum) => makeDataArray(datum));
}

export default SpiderChart;

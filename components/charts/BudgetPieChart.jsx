import React from "react";
import { StyleSheet, View } from "react-native";
import { Slice, VictoryPie, VictoryChart, VictoryTheme, VictoryGroup, VictoryArea, VictoryPolarAxis, VictoryLabel } from "victory-native";
import { useTheme } from "@react-navigation/native";


function BudgetPieChart() {
    return (
    <VictoryPie
        name = "Budget"
        data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 }
        ]}

        events={[
            {
                target: "data",
                eventHandlers: {
                    onPress: () => {
                        return [
                            {
                                target: "data",
                                mutation: () => {
                                    console.log('test');
                                }
                            }
                        ];
                    }
                }
            }
        ]}
        />
    )
}

export default BudgetPieChart


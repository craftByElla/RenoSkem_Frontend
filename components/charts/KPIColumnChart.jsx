// components/charts/KPIColumnChart.js
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const KPIColumnChart = ({ data, title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>{title}</Text>
            <BarChart
                data={{
                    labels: data.labels,
                    datasets: [
                        {
                            data: data.values
                        }
                    ]
                }}
                width={screenWidth * 0.9 - 32} // Adjust width to 90% of the screen width
                height={220}
                yAxisLabel=""
                yAxisSuffix="" // Ensure there is no suffix for Y axis
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(25, 72, 82, ${opacity})`, // Color of bars
                    labelColor: (opacity = 1) => `rgba(25, 72, 82, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        paddingRight: 20,
                        paddingLeft: 20,
                    },
                    propsForBackgroundLines: {
                        strokeDasharray: '', // solid background lines with no dashes
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    paddingRight: 20,
                    paddingLeft: 20,
                }}
                showValuesOnTopOfBars
                fromZero
                withVerticalLabels={true} // Show vertical labels
                withHorizontalLabels={false} // Hide horizontal labels (Y-axis)
                animate={true}
                animationDuration={1000}
                barPercentage={0.8} // Adjust the bar width to occupy more space
            />
        </View>
    );
};

const styles = {
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        marginVertical: 8,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 16,
        color: '#194852',
        marginBottom: 8,
    },
};

export default KPIColumnChart;

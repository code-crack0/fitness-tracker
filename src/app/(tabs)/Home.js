import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Surface, ProgressBar, MD3Colors } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { useEffect } from "react";
import {Pedometer} from 'expo-sensors';
const screenWidth = Dimensions.get("window").width;

export default function Home() {

  const chartData = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  };
  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2,
  };
  useEffect(() => {
    const subscription = Pedometer.watchStepCount(result => {
      console.log(result);
    });
    return () => {
      subscription.remove();
    };
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Progress </Text>
        {/* Add the step counts */}
        
      </View>

      {/* Metric Cards */}
      <View style={styles.metricsContainer}>
        <Surface style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="flame" size={20} color="#FF5733" />
            <Text style={styles.metricValue}>1,024</Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
        </Surface>

        <Surface style={styles.metricCard}>
          <View style={styles.metricContent}>
            <Ionicons name="time" size={20} color="#4CAF50" />
            <Text style={styles.metricValue}>75.2</Text>
            <Text style={styles.metricLabel}>Time (min)</Text>
          </View>
        </Surface>
      </View>

      {/* Workout Chart */}
      <Surface style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Workout</Text>
          <Text style={styles.chartPeriod}>Weekly</Text>
        </View>
        <BarChart
          data={chartData}
          width={screenWidth - 48}
          height={180}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: "#1E1E1E",
            backgroundGradientFrom: "#1E1E1E",
            backgroundGradientTo: "#1E1E1E",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5,
          }}
          style={styles.chart}
          showValuesOnTopOfBars={false}
          withInnerLines={false}
          fromZero
        />
      </Surface>

      {/* Progress Circles */}
      <View style={styles.progressContainer}>
        <Surface style={styles.progressCard}>
          <CircularProgress
            value={60}
            radius={60}
            duration={2000}
            progressValueColor={"#ecf0f1"}
            maxValue={200}
            title={"STEPS"}
            titleColor={"white"}
            titleStyle={{ fontWeight: "bold" }}
          />
        </Surface>

        <Surface style={styles.progressCard}>
          <View style={styles.progressContent}>
            <CircularProgress
              value={90}
              inActiveStrokeColor={"#2ecc71"}
              inActiveStrokeOpacity={0.2}
              progressValueColor={"#fff"}
              title="Daily Target"
              titleStyle={{ color: "#fff"  , fontSize: 12}}
              valueSuffix={"%"}
            />
          </View>
        </Surface>
      </View>

      {/* Labels Below All Progress Circles */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    elevation: 4,
  },
  metricContent: {
    alignItems: "flex-start",
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  chartCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  chartPeriod: {
    fontSize: 14,
    color: "#666",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  progressCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    elevation: 4,
  },
  progressContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 8,
  },
  labelText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
});

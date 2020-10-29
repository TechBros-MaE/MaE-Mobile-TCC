import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressGraph from '../components/ProgressGraph';

export default function DetailFrequencyScreen({route}){

    return(
    <View style={styles.container}>
      {
        <ProgressGraph
          percentage={route.params.percentage}
          radius={80}
          delay={1000}
          strokeWidth={8}
        >
        </ProgressGraph>
      }
    </View>
  );

}
export const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
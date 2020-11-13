import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  return(
    <View style={styles.container}>
        <Text>Tela de Saída</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
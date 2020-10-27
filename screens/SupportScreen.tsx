import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function SupportScreen() {
    return(
        <View style={styles.container}>
            <Text>Tela de Suporte</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
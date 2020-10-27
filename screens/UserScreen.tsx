import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function UserScreen() {
    return(
        <View style={styles.container}>
            <Text>Tela de Usúário</Text>
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
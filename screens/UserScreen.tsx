import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function UserScreen() {

    const { colors } = useTheme();

    return(
        <View style={styles.container}>
            <Text style={{color: colors.text2}}>Tela de Usúário</Text>
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
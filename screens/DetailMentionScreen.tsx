import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function DetailMentionScreen({route}){

    const { colors } = useTheme()

    return(
    <View style={styles.container}>
        <Text style={{color: colors.text}}>Detalhes das menções</Text>
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
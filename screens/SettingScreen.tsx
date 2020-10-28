import React, { useContext } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Switch, TouchableRipple } from 'react-native-paper';

import { AuthContext } from '../components/Context';

export default function SettingScreen() {

    const paperTheme = useTheme();
    const { colors } = useTheme();
  
    const { toggleTheme } = useContext(AuthContext)

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={[styles.title, {color: colors.text}]}>Preferencias</Text>
                <TouchableRipple onPress={() => {toggleTheme()}}>
                    <View style={styles.item}>
                    <Text style={[styles.options, {color: colors.text}]}>Modo noturno</Text>
                    <View pointerEvents='none'>
                        <Switch value={paperTheme.dark}/>
                    </View>
                    </View>
                </TouchableRipple>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 12,
        marginLeft: 15,
        fontSize: 16,
        },
    options: {
        fontSize: 18,
        marginRight: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 35,
    },
})
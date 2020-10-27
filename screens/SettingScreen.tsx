import React, { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { Switch, TouchableRipple } from 'react-native-paper';
import { Text, View } from '../components/Themed';

export default function SettingScreen() {
    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Preferencias</Text>
                <TouchableRipple onPress={() => {}}>
                    <View style={styles.item}>
                    <Text style={styles.options}>Modo noturno</Text>
                    <View pointerEvents='none'>
                        <Switch value={() => {}}/>
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
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { 
    Avatar,
    Title,
    Caption,
    Drawer,
 } from 'react-native-paper'; 
 import { View } from '../components/Themed';

import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

export function DrawerContent(props) {

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Text 
                                label={'EC'}
                                backgroundColor={'#D83333'}
                                size={50}
                            />
                            <View style={{marginLeft: 15, flexDirection:'column'}}>
                                <Title style={styles.title}>Endrew Cavalcante</Title>
                                <Caption style={styles.caption}>Aluno</Caption>
                            </View>
                         </View>

                         <Drawer.Section style={styles.drawerSection}>
                             <DrawerItem
                                icon={() =>(
                                    <MaterialCommunityIcons name='home'
                                    color={'#A1A1A1'}
                                    size={22}
                                    />
                                )}
                                label="Principal"
                                onPress={() => {props.navigation.navigate('Main')}}
                             />
                            <DrawerItem
                                icon={() =>(
                                    <MaterialCommunityIcons name='account'
                                    color={'#A1A1A1'}
                                    size={22}
                                    />
                                )}
                                label="Conta"
                                onPress={() => {props.navigation.navigate('Account')}}
                             />
                            <DrawerItem
                                icon={() =>(
                                    <Ionicons name='md-settings' 
                                    color={'#A1A1A1'}
                                    size={22}
                                    />
                                )}
                                label="Configurações"
                                onPress={() => {props.navigation.navigate('Settings')}}
                             />
                             <DrawerItem
                                icon={() =>(
                                    <FontAwesome name='question' 
                                    color={'#A1A1A1'}
                                    size={22}
                                    />
                                )}
                                label="Suporte"
                                onPress={() => {props.navigation.navigate('Support')}}
                             />
                             <DrawerItem
                                icon={() =>(
                                    <MaterialCommunityIcons name='exit-to-app'
                                    color={'#A1A1A1'}
                                    size={22}
                                    />
                                )}
                                label="Sair"
                                onPress={() => {}}
                            />
                         </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

export const styles = StyleSheet.create ({
    drawerContent:{
        flex:1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#C1C2C3',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
});
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { 
    DrawerParamList,
    DrawerTwoParamList,
    DrawerThreeParamList,
    DrawerFourParamList 
} from '../types';
import { DrawerContent } from '../components/DrawerContent';

import BottomTabNavigator from './BottomTabNavigator';
import UserScreen from '../screens/UserScreen';
import SettingScreen from '../screens/SettingScreen';
import SupportScreen from '../screens/SupportScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Drawers() {
    return(
        <Drawer.Navigator
        initialRouteName='Main'
        drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name='Main' component={BottomTabNavigator}/>
            <Drawer.Screen name='Account' component={UserNavigator}/>
            <Drawer.Screen name='Settings' component={SettingNavigator}/>
            <Drawer.Screen name='Support' component={SupportNavigator}/>
        </Drawer.Navigator>
    );
}

const UserStack = createStackNavigator<DrawerTwoParamList>();

function UserNavigator() {
    return(
        <UserStack.Navigator>
            <UserStack.Screen name="Conta" component={UserScreen}/>
        </UserStack.Navigator>
    );
}

const SettingStack = createStackNavigator<DrawerThreeParamList>();

function SettingNavigator() {
    return(
        <SettingStack.Navigator>
            <SettingStack.Screen name="Configurações" component={SettingScreen}/>
        </SettingStack.Navigator>
    );
}

const SupportStack = createStackNavigator<DrawerFourParamList>();

function SupportNavigator() {
    return(
        <SupportStack.Navigator>
            <SupportStack.Screen name="Suporte" component={SupportScreen}/>
        </SupportStack.Navigator>
    );
}
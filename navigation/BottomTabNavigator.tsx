import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import MentionTopTab from '../screens/MentionScreen';
import FrequencyTopTab from '../screens/FrequencyScreen';

import { MaterialBottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createMaterialBottomTabNavigator<MaterialBottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Mention"
      barStyle={{
        backgroundColor: '#FFF',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        elevation: 0,
      }}
      activeColor='#D80000'
      inactiveColor={'gray'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mention') {
            iconName = 'star';
          } else if (route.name === 'Frequency'){
            iconName = 'circle-outline';
          } else if (route.name === 'Inicio'){
            iconName = 'home';
          } else if (route.name === 'Calendário'){
            iconName = 'calendar-month';
          } else if (route.name === 'Horários'){
            iconName = 'clock';
          }
          return <TabBarIcon name={iconName} color={color} />;
        },
      })}>

      <BottomTab.Screen name="Mention" component={MentionNavigation}/>
      <BottomTab.Screen name="Frequency" component={FrequencyNavigator}/>
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialCommunityIcons size={25} style={{ marginBottom: -3 }} {...props} />;
}

const MentionStack = createStackNavigator<TabOneParamList>();

function MentionNavigation() {
  return (
    <MentionStack.Navigator>
      <MentionStack.Screen
        name="Menções"
        component={MentionTopTab}
        options={headerOptions}
      />
    </MentionStack.Navigator>
  );
}

const FrequencyStack = createStackNavigator<TabTwoParamList>();

function FrequencyNavigator() {
  return (
    <FrequencyStack.Navigator>
      <FrequencyStack.Screen
        name="Frequências"
        component={FrequencyTopTab}
        options={headerOptions}
      />
    </FrequencyStack.Navigator>
  );
}

const headerOptions = {
  headerStatusBarHeight: 10,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    textTransform:"uppercase"
  },
  headerStyle: {
    elevation: 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: 20
  }
}

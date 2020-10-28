import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons} from '@expo/vector-icons';

import { useTheme } from '@react-navigation/native';

import MentionTopTab from '../screens/MentionScreen';
import FrequencyTopTab from '../screens/FrequencyScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimetableScreen from '../screens/TimetableScreen'

import { 
  MaterialBottomTabParamList, 
  TabOneParamList, 
  TabTwoParamList, 
  TabThreeParamList,
  TabFourParamList,
  TabFiveParamList 
} from '../types';

const BottomTab = createMaterialBottomTabNavigator<MaterialBottomTabParamList>();

export default function BottomTabNavigator() {
  
  const { colors } = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: colors.card,
        elevation: 0,
      }}
      activeColor='#D80000'
      inactiveColor={colors.tab}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Mention') {
            iconName = 'star';
          } else if (route.name === 'Frequency'){
            iconName = 'circle-outline';
          } else if (route.name === 'Home'){
            iconName = 'home';
          } else if (route.name === 'Calendar'){
            iconName = 'calendar-month';
          } else if (route.name === 'Timetable'){
            iconName = 'clock';
          }
          return <TabBarIcon name={iconName} color={color} />;
        },
      })}>

      <BottomTab.Screen name="Mention" component={MentionNavigation}/>
      <BottomTab.Screen name="Frequency" component={FrequencyNavigator}/>
      <BottomTab.Screen name="Home" component={HomeNavigation}/>
      <BottomTab.Screen name="Calendar" component={CalendarNavigation}/>
      <BottomTab.Screen name="Timetable" component={TimetableNavigation}/>
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

const HomeStack = createStackNavigator<TabThreeParamList>();

function HomeNavigation({navigation}) {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Início" 
        component={HomeScreen}
        options={headerHome}/>
    </HomeStack.Navigator>
  );
}

const CalendarStack = createStackNavigator<TabFourParamList>();

function CalendarNavigation({navigation}){
  return(
    <CalendarStack.Navigator>
      <CalendarStack.Screen 
        name="Calendário" 
        component={CalendarScreen}
        options={headerOptions}/>
    </CalendarStack.Navigator>
  );
}

const TimetableStack = createStackNavigator<TabFiveParamList>();

function TimetableNavigation({navigation}){
  return(
    <TimetableStack.Navigator>
      <TimetableStack.Screen 
        name="Horários" 
        component={TimetableScreen}
        options={headerOptions}/>
    </TimetableStack.Navigator>
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

const headerHome = {
  headerStatusBarHeight: 10,
  headerTransparent: true,
  headerTitle: false,
  headerStyle: {
    elevation: 0
  },
  headerLeftContainerStyle: {
    paddingLeft: 20
  }
}
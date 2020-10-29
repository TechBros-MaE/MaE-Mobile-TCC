import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, ColorSchemeName } from 'react-native';
import { 
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, 
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { 
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme, 
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import RootStackScreen from '../screens/RootStackScreen';
import DrawerNavigator from './DrawerNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { AuthContext } from '../components/Context';
import AsyncStorage from '@react-native-community/async-storage';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      card: '#FFF',
      background: '#F8F9FA',
      border: '#C1C2C3',
      tab: '#C1C2C3',
      text: '#222',
      text2: '#717273',
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      card: '#111213',
      background: '#202020',
      border: '#F1F2F3',
      tab: '#F1F2F3',
      text: '#FFF',
      text2: '#C1C2C3',
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };

    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async(foundUser) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;

      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      //console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      //setUserToken(null);
      //setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      //setIsLoading(false);
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e) {
        console.log(e);
      }
      //console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000)
  }, []);

  if(loginState.isLoading) {
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator color='#D80000' size='large'/>
      </View>
    );
  }
  
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer
          linking={LinkingConfiguration} theme={theme}>
          { loginState.userToken != null ? (
            <RootNavigator/>
          )
          :
            <RootStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={DrawerNavigator}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

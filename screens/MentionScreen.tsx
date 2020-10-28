import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { state } from '../model/state';
import Star from '../components/Stars';

import { useTheme } from 'react-native-paper';

const topTab = createMaterialTopTabNavigator();

export default function MentionTopTab() {
  return(
    <topTab.Navigator
      initialRouteName='Intermediária'
      tabBarOptions={{
        activeTintColor: '#D80000',
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: '#D80000'}
    }}>
      <topTab.Screen name='Intermediária' component={MentionIntermediateScreen}/>
      <topTab.Screen name='Final' component={MentionFinalScreen}/>
    </topTab.Navigator>
  );
}

function MentionIntermediateScreen({navigation}) {

  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.sub_container}>
          {state.Discipline.map((item, index) => ( 
              <TouchableOpacity
                  key = {item.id}
                  style = {styles.box}
                  onPress = {() => navigation.push("Detalhes", {name: item.nome})}>
                  <View style = {styles.mention}>
                    <Star value={item.nota[0]} size={25}/>
                    <Text style = {[styles.name, {color: colors.text}]}>{item.sigla}</Text>
                  </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

function MentionFinalScreen({navigation}) {

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.sub_container}>
          {state.Discipline.map((item, index) => ( 
              <TouchableOpacity
                  key = {item.id}
                  style = {styles.box}
                  onPress = {() => navigation.push("Detalhes", {name: item.nome})}>
                  <View style = {styles.mention}>
                    <Star value={item.nota[0]} size={25}/>
                    <Text style = {[styles.name, {color: colors.text}]}>{item.sigla}</Text>
                  </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub_container: {
    width: '100%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scroll:{
    paddingTop: 25,
    paddingBottom: 25,
  },
  box: {
    width: '50%',
    padding: 5,
  },
  mention: {
    alignItems: 'center',
    flex: 1,
    padding: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

});

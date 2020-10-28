import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { state } from '../model/state';
import ProgressGraph from '../components/ProgressGraph';

import { useTheme } from 'react-native-paper';

const topTab = createMaterialTopTabNavigator();

export default function FrequencyTopTab() {
  return(
    <topTab.Navigator
      initialRouteName='Intermediária'
      tabBarOptions={{
        activeTintColor: '#D80000',
        inactiveTintColor: 'gray',
        indicatorStyle: {backgroundColor: '#D80000'}
    }}>
      <topTab.Screen name='Intermediária' component={FrequencyIntermediateScreen}/>
      <topTab.Screen name='Final' component={FrequencyFinalScreen}/>
    </topTab.Navigator>
  );
}

function FrequencyIntermediateScreen({navigation}) {

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} >
        <View style={styles.sub_container}>
            {state.Discipline.map((item, index) => (
                  <View 
                    style = {styles.box}
                    key = {item.id}>
                    <TouchableOpacity
                      style = {styles.progress}
                      onPress = {() => navigation.push("Detalhes", {name: item.nome, percentage: item.frequencia})}>
                      <ProgressGraph
                        percentage={item.frequencia}
                        delay={2000}
                        radius={35}
                        strokeWidth={4}/>
                    </TouchableOpacity>
                    <Text style={[styles.name, {color: colors.text}]}>{item.sigla}</Text>
                  </View>
              ))}
        </View>
      </ScrollView>
    </View>
  );
}

function FrequencyFinalScreen({navigation}) {

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} >
        <View style={styles.sub_container}>
            {state.Discipline.map((item, index) => (
                  <View 
                    style = {styles.box}
                    key = {item.id}>
                    <TouchableOpacity
                      style = {styles.progress}
                      onPress = {() => navigation.push("Detalhes", {name: item.nome, percentage: item.frequencia})}>
                      <ProgressGraph
                        percentage={item.frequencia}
                        delay={2000}
                        radius={35}
                        strokeWidth={4}/>
                    </TouchableOpacity>
                    <Text style={[styles.name, {color: colors.text}]}>{item.sigla}</Text>
                  </View>
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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  scroll:{
    paddingBottom: 25,
  },
  box: {
    width: '20%',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
  },
  progress: {
    alignItems: 'center',
    padding: 10,
  },
  name: {
    color: '#000',
    textAlign: 'center',
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

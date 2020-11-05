import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProgressGraph from '../components/ProgressGraph';
import { ListItem } from 'react-native-elements';

import * as firebase from 'firebase';
import { database } from '../configs/firebase';

import { useTheme } from '@react-navigation/native';
import {  } from 'react-native-gesture-handler';

export default function DetailFrequencyScreen({route}){
  const [data, setData] = useState([])
  const table = 'frequencia';
  useEffect(() => {
      database
      .collection(table)
      .onSnapshot((query) => {
          const items = [];
          query.forEach((doc) => {
              items.push({...doc.data(), id: doc.id});
          });

          setData(items);
      });
  }, []);

  const renderItem = () => {

    const getDate = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString("pt-br")
    
    const toDate = (date) => {
      const [day, month, year] = date.split("/");
      return String(day) + "/" + (String(month - 1).length == 2 ? String(month - 1) : "0"+String(month - 1))  + "/" + String(year)
    }
    
    const date = toDate(getDate)
    console.log(route.params.call.data)

    return(
        <ListItem  bottomDivider>
          <ListItem.Content>
            <View style={styles.list_container}>
              <ListItem.Title style={styles.list_text}>Data: {date}</ListItem.Title>
              <ListItem.Title>Situação: {route.params.call.presente ? 'Presente' : 'Ausente'}</ListItem.Title>
            </View>
            <View style={styles.list_container}>
              <ListItem.Subtitle>Hora: {}</ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      )
    }
  const { colors } = useTheme();

  return(
    <View style={styles.container}>
      <View style={styles.box}>
        {
          <ProgressGraph
            percentage={route.params.percentage}
            radius={80}
            delay={1000}
            strokeWidth={8}
          >
          </ProgressGraph>
        }
      </View>
      <View style={styles.list}>
        <FlatList data={data} renderItem={renderItem}/>
      </View>
    </View>
  );

}
export const styles = StyleSheet.create ({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      flex: 1,
      justifyContent: "center",
    },
    list: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FFF',
    },
    list_container: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    list_text: {
     flex: 1,
    },
    name: {
      color: '#000',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
});
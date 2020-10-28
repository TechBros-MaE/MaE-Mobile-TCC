import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { state } from '../model/state';

export default function TimetableScreen({navigation}) {

  const { colors } = useTheme();

  return(
    <ScrollView style={styles.scroll}>
        <View style={styles.container}>
            {state.Timetable.map((item, index) => (
              <View 
                style = {styles.box}
                key = {item.id}>
                <View style={styles.item}>
                  <Text style={[styles.title, {color: colors.text}]}>{item.dia}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={[styles.subTitle, {color: colors.text2}]}>Primeiro Horário:</Text>
                  <Text style={[styles.text, {color: colors.text2}]}>Matéria: {item.aula1}</Text>
                  <Text style={[styles.text, {color: colors.text2}]}>Professor(a): {item.prof1}</Text>
                </View>
                <View style={styles.item}>
                <Text style={[styles.subTitle, {color: colors.text2}]}>Segundo Horário:</Text>
                  <Text style={[styles.text, {color: colors.text2}]}>Matéria: {item.aula2}</Text>
                  <Text style={[styles.text, {color: colors.text2}]}>Professor(a): {item.prof2}</Text>
                </View>
              </View>
            ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 5,
      paddingBottom: 10,
      flexDirection: 'column',
    },
    scroll:{
      paddingBottom: 25,
    },
    box: {
      width: '100%',
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderColor: '#D80000',
    },
    item: {
      paddingTop: 10,
      paddingLeft: 10,
    },
    title: {
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 20,
    },
    subTitle: {
      textAlign: 'left',
      fontWeight: '500',
      fontSize: 18,
      marginBottom: 5
    },
    text: {
      textAlign: 'left',
      fontSize: 16,
      paddingLeft: 15,
    },
    itemContainer: {
        alignItems: 'flex-start',
        padding: 10,
        paddingTop: 0,
    },
  });
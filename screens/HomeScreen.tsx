import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, Image,  Animated, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';
import { database } from '../configs/firebase';

import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');
const SPACING = 10;
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH;
const OVERFLOW_HEIGHT = 70;
const VISIBLE_ITEMS = 3;


export default function HomeScreen({navigation}) {
    const [data, setData] = useState([])
    const table = 'evento';

    useEffect(() => {
        database
        .collection(table)
        .onSnapshot((query) => {
            const items = [];
            query.forEach((doc) => {
                items.push({...doc.data(), id: doc.id});
            });

            setData(items);
            console.log(items);
        });
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <OverflowItems item={data}/>
            <View>
                <Text>Teste</Text>
            </View>
        </SafeAreaView>
    );
}

function OverflowItems({item}){

    const { colors } = useTheme();

    return(
        <View style={[styles.overFlowContainer, {backgroundColor: colors.card}]}>
            <Animated.View>
                <View style={styles.itemContainer}>
                    <Text style={[styles.title, {color: colors.text}]}>
                        {item.titulo}
                    </Text>
                    <View style={styles.itemContainerRow}>
                        <Text style={[styles.location, {color: colors.text}]}>
                                <EvilIcons 
                                name='location'
                                size={16}
                                color={colors.text}
                                style={{marginRight: 5}}
                                />
                                {item.local}
                        </Text>
                        <Text style={[styles.data, {color: colors.text}]}>{item.data}</Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overFlowContainer: {
      width: '100%',
      justifyContent: 'center',
      height: OVERFLOW_HEIGHT,
      overflow: 'hidden',
      flexDirection: 'row',
    },
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: OVERFLOW_HEIGHT,
      padding: SPACING,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: -1,
    },
    itemContainerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    location: {
      fontSize: 12,
    },
    data: {
      fontSize: 12,
      marginLeft: 10,
    },
    imageContainer: {
      backgroundColor: '#000',
      elevation: 5,
    },
  });
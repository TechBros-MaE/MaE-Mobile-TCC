import React, { useRef, useState, useEffect, useCallback } from 'react'
import { View, Text, SafeAreaView, FlatList, Image,  Animated, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';
import moment from 'moment';

import { useTheme } from '@react-navigation/native';

const { width } = Dimensions.get('screen');
const SPACING = 10;
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH;
const OVERFLOW_HEIGHT = 70;
const VISIBLE_ITEMS = 3;


export default function HomeScreen() {
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback((activeIndex) => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  })

  const [data, setData] = useState([])

  useEffect(()=> {
    fetchData();
  },[])

  async function fetchData(){
    const response = await fetch('http://192.168.42.247:1384/eventos');
    const eventos = await response.json();
    setData(eventos);
    console.log(eventos);
  }

  useEffect(() => {
    if(index === data.length - VISIBLE_ITEMS){
      const newData = [...data, ...data];
      setData(newData);
    }
  })

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return(
    <FlingGestureHandler
      key='left'
      direction={Directions.LEFT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.ACTIVE){
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
    <FlingGestureHandler
      key='right'
      direction={Directions.RIGHT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.ACTIVE){
          if (index === 0) {
            return;
          }
          setActiveIndex(index - 1);
        }
      }}>
    <SafeAreaView style={styles.container}>
      <OverflowItems data={data} scrollXAnimated={scrollXAnimated}/>
      <FlatList
      data={data}
      keyExtractor={(_, index) => String(index)}
      horizontal
      inverted
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        padding: SPACING,
      }}
      scrollEnabled={false}
      removeClippedSubviews={false}
      CellRendererComponent={({item, index, children, style, ...props}) => {
        const newStyle = [style, { zIndex: data.length - index }];
        return(
          <View style={newStyle} index={index} {...props}>
            {children}
          </View>
        ) 
      }}
      renderItem={({item, index}) =>{
        const inputRange = [index - 1, index, index + 1]
        const translateX = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [265, 0, -600],
        })
        const scale = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [.8, 1, .5],
        })
        const opacity = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
        })
        
        return (
        <Animated.View style={{ 
          position: 'absolute',
          top: ITEM_WIDTH / 5, 
          left: -ITEM_WIDTH / 2,
          opacity,
          transform: [
            {
              translateX,
            },
            { scale },
        ],
        }}>
          <View style={styles.imageContainer}>
            <Image 
              source={{uri: item.posterEvento}} 
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
            }}/>
          </View>
        </Animated.View>
        );
      }}
    />
    </SafeAreaView>
    </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

function OverflowItems({data, scrollXAnimated}){
  const inputRange = [-1, 0, 1]
  const translateY = scrollXAnimated.interpolate({
      inputRange,
      outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
  })

  const { colors } = useTheme();

  return(
    <View style={[styles.overFlowContainer, {backgroundColor: colors.card}]}>
      <Animated.View style={{transform: [{translateY}] }}>
        {data.map((item, index) => {
          return(
            <View key = {index} style={styles.itemContainer}>
              <Text style={[styles.title, {color: colors.text}]} numberOfLines={1}>
                {item.tituloEvento}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location, {color: colors.text}]}>
                  <EvilIcons 
                  name='location'
                  size={16}
                  color={colors.text}
                  style={{marginRight: 5}}
                  />
                  {item.localEvento}
                </Text>
              <Text style={[styles.data, {color: colors.text}]}>{moment(new Date(item.dataEvento)).format('DD/MM/YYYY')}</Text>
              </View>
            </View>
          );
      })}
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
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Star({
  value = 0,
  size = 20,
}){
  const numStars = 4
  const color = ['#000','#ff0000','#ffd700','#32cd32','#32cd32'];
  const starNumber = parseInt(value);
  let starElement = [];
  for (let x = 1; x <= numStars; x++) {
    starElement.push(
      <View key={x}>
        <FontAwesome 
          name={starNumber >= x ? 'star' : 'star-o'}
          color={color[starNumber]} 
          size={size} 
          style={styles.star}/>
      </View>
    );
  }

  return(
    <View style={styles.stars}>
      {starElement}
    </View>
  );
}

export const styles = StyleSheet.create({
    stars:{
      flexDirection: 'row',
      padding: 10,
    },
    star: {
      marginHorizontal: 6,
    },
  })
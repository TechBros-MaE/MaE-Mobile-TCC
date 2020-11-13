import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { useTheme } from 'react-native-paper';

const {width, height} = Dimensions.get('screen');
const width_logo = width * 0.5;
const height_logo = height * 0.25;


export default function SplashScreen({navigation}){

  const { colors } = useTheme();

  return(
    <View style={[styles.container, {
        backgroundColor: colors.background
      }]}>
      <View style={styles.header}>
        <Animatable.Image
            animation='pulse'
            duration={1500}
          source={require('../assets/images/logo/logo.png')}
          style={styles.logo}
          resizeMode='stretch'
        />
      </View>
      <Animatable.View 
        style={styles.footer}
        animation='fadeInUpBig'>
        <Text style={styles.title}>Um novo jeito de administrar o seu conhecimento</Text>
        <Text style={styles.text}>Entre com sua conta</Text>

        <View style={styles.button}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignInScreen')}
            style={styles.signIn}>
              <Text style={styles.textSign}>Aluno</Text>
              <MaterialIcons
                name='navigate-next'
                color='gray'
                size={16}
              />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => alert('Clicou')}
            style={styles.signIn}>
              <Text style={styles.textSign}>Professor</Text>
              <MaterialIcons
                name='navigate-next'
                color='gray'
                size={16}
              />
          </TouchableOpacity>
        </View>
        
      </Animatable.View>
    </View>
  )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#D80000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: width_logo,
        height: height_logo,
    },
    title: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    text: {
        color: '#FFF',
        marginTop: 5,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        backgroundColor: '#FFF',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 10,
    },
    textSign: {
        color: '#D80000',
        fontWeight: 'bold',
    },
});
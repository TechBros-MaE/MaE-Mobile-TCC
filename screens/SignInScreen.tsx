import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, Platform, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import Users from '../model/users';

import { AuthContext } from '../components/Context';

const { height } = Dimensions.get('screen');
const height_logo = height * 0.18;

export default function SignInScreen({navigation}){

    const [data, setData] = useState({
        userName: '',
        password: '',
        check_textImputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length == 11){
        setData({
            ...data,
            userName: val,
            check_textImputChange: true,
            isValidUser: true
        });
        } else {
        setData({
            ...data,
            userName: val,
            check_textImputChange: false,
            isValidUser: false
        });
        }
    } 

    const handlePasswordChange = (val) => {
        setData({
        ...data,
        password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if(val.trim().length == 11) {
        setData({
            ...data,
            isValidUser: true,
        });
        } else {
        setData({
            ...data,
            isValidUser: false,
        });
        }
    }

    const loginHandle = (userName, password) => {

        const foundUser = Users.filter(item => {
        return userName == item.username && password == item.password;
        });

        if (foundUser.length == 0) {
        Alert.alert('Usuário inválido', 'Matrícula ou senha incorretos.', [
            { text: 'OK' }
        ]);
        return;
        }
        signIn(foundUser);
    }

    return(
        <View style={{flex: 1}}>
            <View style={[styles.container,{
                backgroundColor: '#FFF',
                }]}>

                <View style={styles.header}>
                <Animatable.Text
                    animation='fadeIn'
                    delay={800}
                    style={styles.text_header}>Bem Vindo!</Animatable.Text>
                </View>
                <Animatable.View 
                animation='fadeInUpBig' 
                style={styles.footer}>
                <Text style={styles.text_footer}>Matrícula</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons
                        name='account'
                        color='#F2F2F2'
                        style={{marginBottom:10}}
                        size={20}/>
                    <TextInput
                        placeholder='Sua Matrícula'
                        placeholderTextColor='#F2F2F2'
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}/>
                    {data.check_textImputChange ?
                    <Animatable.View animation='bounceIn'>
                        <Ionicons
                        name='md-checkmark'
                        color='#F2F2F2'
                        size={20}/>
                    </Animatable.View>
                    : null}
                </View>
                { data.isValidUser ? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>
                    <Text style={styles.errorMsg}>Matricula deve conter 11 números.</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {marginTop: 35}]}>Senha</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons
                    name='lock'
                    color='#F2F2F2'
                    style={{marginBottom:10}}
                    size={20}/>
                    <TextInput
                    placeholder='Sua Senha'
                    placeholderTextColor='#F2F2F2'
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(val) => handlePasswordChange(val)}/>
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                    {data.secureTextEntry ?
                        <MaterialCommunityIcons
                        name='eye-off'
                        color='#F2F2F2'
                        size={20}/>
                        :
                        <MaterialCommunityIcons
                        name='eye'
                        color='#F2F2F2'
                        size={20}/>
                    }
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity 
                    style={styles.signIn}
                    onPress={() => loginHandle( data.userName, data.password )}>
                    <Text style={styles.textSign}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => alert('Clicou')}>
                    <Text style={styles.forgotPassword} >Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>

                </Animatable.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFF'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 3,
        backgroundColor: '#D80000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    text_header: {
        color: '#D80000',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#FFF',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : -12,
        paddingLeft: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D80000',
    },
    forgotPassword: {
        marginTop: 10,
        color: '#FFF',
        fontWeight: 'bold',
    },
    errorMsg: {
        color: '#FFA',
    }
})
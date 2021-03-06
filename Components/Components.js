import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const NameInput = (args) => {
    return (
        <>
            <Text style={styles.label}>{args.label}</Text>
            <TextInput
                style={styles.inputBox}
                placeholder= {args.placeholder}
                onChangeText={args.onChange} 
            /> 
        </>
    );
} 

const PasswordInput = (args) => {
    return (
        <>
            <Text style={styles.label}> {args.label} </Text>
            <TextInput 
                style={styles.inputBox}
                placeholder= {args.placeholder} 
                onChangeText= {args.onChange}
                secureTextEntry={true}
            />
        </>
    );
} 

const styles = StyleSheet.create({
    inputBox: {
        height: 40,
        fontSize:16,
        borderWidth:1,
        padding:10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,

    },
    label: {
        margin:10,
        fontSize: 20,
        color: 'black',
    },
    
});

export {NameInput, PasswordInput} ;


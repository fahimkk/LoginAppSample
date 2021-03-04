import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onChangeUsername = (value)=>{
       setUsername(value); 
    }
    const onChangePassword = (value)=>{
       setPassword(value); 
    }
    const sendData = (username, password) =>{
        console.log(username,password);
        fetch('http://10.0.2.2:5000/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(response => console.log(response));
    }

    return(
        <View style={styles.container}>
           <Text style={styles.label}>User Name</Text>
           <TextInput
            style={styles.inputBox}
            placeholder="email/username"
            onChangeText={onChangeUsername} 
           /> 

           <Text style={styles.label}>Password</Text>
           <TextInput 
            style={styles.inputBox}
            placeholder="Password" 
            onChangeText= {onChangePassword}
            secureTextEntry={true}
            /> 

           <TouchableOpacity
            style={styles.btn}
            onPress={()=>sendData(username,password)}
            >
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderRadius: 25,
        width: windowWidth,
        padding:10,
    },
    inputBox: {
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,

        fontSize:16,
        borderWidth:1,
        borderRadius: 10,
        padding:10,

    },
    label: {
        margin:10,
        fontSize: 20,
        color: 'black',
    },
    btn: {
        margin:15,
        backgroundColor:"#018786",
        padding:8,
        borderRadius:10,
    },
    btnText: {
        fontSize:25,
        color: "#f8f8f8",
        textAlign: "center",
    }
});

export default LoginForm;
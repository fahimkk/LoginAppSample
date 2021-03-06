import React, { useState } from 'react';
import {NameInput, PasswordInput} from './Components'; 
import Home from './Home'; 
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {AuthContext} from './Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({navigation}) => {

    const [userToken, setUserToken] = React.useState()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChangeUsername = (value)=>{
       setUsername(value); 
    }
    const onChangeEmail = (value)=>{
       setEmail(value); 
    }
    const onChangePassword = (value)=>{
       setPassword(value); 
    }
    const sendData = (username, email, password) =>{
        if (username == "" || email=="" || password==""){
            console.log('Null value')
        } else{
            console.log(username, email, password);
            fetch('http://10.0.2.2:5000/signUp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                })
            }).then(response => console.log(response));
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <NameInput label="Username" placeholder="Username" onChange={onChangeUsername}/>

                <NameInput label="Email" placeholder="Email" onChange={onChangeEmail}/>

                <PasswordInput label="Password" placeholder="Password" onChange={onChangePassword}/>

            <TouchableOpacity
                style={styles.btnIn}
                onPress={()=> navigation.navigate("Account",{screen:"Home", params:{username:username, email:email, password:password}})}
                >
                    <Text style={styles.btnTextIn}>Sign Up</Text>
                </TouchableOpacity>
        </View>
       </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#018786",
        flexDirection: 'column',
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    container:{
        backgroundColor: 'white',
        borderRadius: 25,
        width: windowWidth,
        padding:10,
    },
    btnIn: {
        margin:10,
        marginTop:20,
        backgroundColor:"#018786",
        padding:8,
        borderRadius:10,
    },
    btnTextIn: {
        fontSize:25,
        color: "#f8f8f8",
        textAlign: "center",
    },
    btnUp: {
        margin:10,
        marginTop:20,
        backgroundColor:"#f8f8f8",
        padding:8,
        borderRadius:10,
        borderColor: "#018786",
        borderWidth:1,
    },
    btnTextUp: {
        fontSize:25,
        color: "#018786",
        textAlign: "center",
    }
});

export default SignUp;

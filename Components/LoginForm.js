import React, { useState } from 'react';
import {NameInput, PasswordInput} from './Components'; 
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
// import Card from 'react-native-material-design';
import {AuthContext, UserContext} from './Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ErrorText = (errMsg)=>{
    if (errMsg.status == "incorrect"){
        return(
            <Text style={styles.errorText}> Incorrect Password !!</Text>
        );
    } else return (
            <Text> </Text>
    );
}

const SignUpText = (singUpMsg)=>{
    if (singUpMsg.status == "nil"){
        return(
            <Text style={styles.singUpMsg}> Please Sign UP </Text>
        );
    } else return (
            <Text> </Text>
    );
}

const LoginForm = ({navigation}) => {
    const [userData, setUserData] = useState('');

    const [status, setStatus] = useState('');
    // AuthContext from app will return any of signIn Up or Out function
    const {signIn} = React.useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onChangeEmail = (value)=>{
       setEmail(value); 
    }
    const onChangePassword = (value)=>{
       setPassword(value); 
    }
    const sendData = (email, password) =>{
        console.log(email,password);
        fetch('http://10.0.2.2:5000/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(response => response.json()
        ).then(data => {
            setStatus(data.status);
            return status;
        });
    }

    return(
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <NameInput label="Email" placeholder="Email" onChange={onChangeEmail}/>
                <PasswordInput label="Password" placeholder="Password" onChange={onChangePassword}/>

                <ErrorText status={status}/>
            <TouchableOpacity
                style={styles.btnIn}
                onPress={()=>{
                    sendData(email,password);
                    console.log(status);
                    if (status == "nil"){
                        navigation.navigate('SignUp')
                    }else if (status == "incorrect"){
                    navigation.navigate("Account",{screen:"Home", params:{email:email, password:password}})
                        signIn();
                    }
                }}
                >
                    <Text style={styles.btnTextIn}>Sign In</Text>
                </TouchableOpacity>

            <SignUpText status={status}/>
            <TouchableOpacity
                style={styles.btnUp}
                onPress={()=>navigation.navigate('SignUp')}
                >
                    <Text style={styles.btnTextUp}>Sign Up</Text>
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
    errorText: {
        color: "red",
        fontSize: 20,
        textAlign: "center",
    },
    singUpMsg:{
        color:"grey",
        fontSize:20,
        textAlign: "center",
    },
    btnIn: {
        margin:10,
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

export default LoginForm;

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
import {AuthContext} from './Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Home = ({route}) => {
    // AuthContext will return three function from home page
    const {signOut} = React.useContext(AuthContext);
    const data = route.params
    return (
        <View style={styles.container}>
            <Text> Welcome </Text>
            <Button
            title="SignOut"
            onPress={()=>signOut()}
            />
        </View>
    );
} 



const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        fontSize: 80,
        color: 'black',
    },
    
});

export default Home ;


import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
// import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import {AuthContext} from './Components/Context';

const AuthStack = createStackNavigator();
const AccountStack = createStackNavigator();


const App = () =>{
  const [userToken, setUserToken] = React.useState()
  const authContext = React.useMemo(()=>{
    return {
      signIn: () => {
        setUserToken('asdf');
      },
      signUp: () => {
        setUserToken('asdf');
      },
      signOut: () => {
        setUserToken();
      },
    };
  },[]);
  return(
//      <View style={styles.container}
 //       <SignUp/>
  //    </View>

  <AuthContext.Provider  value={authContext}>
    <NavigationContainer>
      {userToken ? (
          // if user token is true show home page
      <AccountStack.Navigator>
        <AccountStack.Screen
          name="Home"
          component={Home}
          options={{
            title:'Home',
            headerRight: ()=> (
              <Button
                onPress={()=>alert('This is a button!')}
                title = "info"
              />
            ),
            headerStyle:{
              backgroundColor:"#018786",
            },
          }}
        />
      </AccountStack.Navigator>
      ) : (       
      <AuthStack.Navigator initialRouteName="SignIn"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#005e5d",
            },
            headerTitleStyle: {
              color: "#e0f2f1",
            },
            headerTintColor: "#fff"
          }}
        >
        <AuthStack.Screen
          name="SignIn"
          component={LoginForm}
          options={{title: 'Sign In'}}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Sign Up'}}
        />
      </AuthStack.Navigator>
      )}
    </NavigationContainer>
  </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#018786",
    flexDirection: 'column',
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
  },
}); 

export default App;

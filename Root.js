import { StyleSheet, Text, View, Image, Alert, Button, TouchableOpacity, Touchable, Linking } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Home from './src/screens/Home'
import Search from './src/screens/Search';
import Reels from './src/screens/Reels';
import Activity from './src/screens/Activity'
import Profile from './src/screens/Profile'
import Status from './src/component/Status'
import AddPost from './src/screens/AddPost';
import EditProfile from './src/screens/EditProfile'
import SearchProfile from './src/screens/SearchProfile';
import auth from '@react-native-firebase/auth';
import { useSelector,useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import Chat from './src/screens/Chat';
import MenuDrawer from './src/component/DrawerMenu'
import Navbar from './src/component/Navbar';


const HEADER_BACKGROUND = "#3498db";

  const Stack = createStackNavigator();

  const Tab = createBottomTabNavigator();

  const BottomTabScreen = () =>{
    
     return(

      <Tab.Navigator 
      screenOptions = {({route}) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle:{
          height : 50
        },

        tabBarIcon:({focused, size}) => {
          let iconName;
          
            if(route.name=="Home"){
            iconName=focused? "home" : "home-outline";
            siez=focused? size + 8 : size + 2;
             }
             else if (route.name=="Search"){
            iconName=focused? "search" : "search-outline";
            }else if (route.name=="Reels"){
            iconName=focused? "motion-play" : "motion-play-outline";
            }else if (route.name=="Activity"){
            iconName=focused? "heart" : "heart-outline";
            }else if (route.name=="Drawer"){
             iconName=focused? "person" : "person-outline";
            }


           return (route.name != "Reels" ? <Ionicons name={iconName} size={size} color='black'/>:
             <MaterialCommunityIcons name={iconName} size={size} color='black'/>)
          }
       })}>

        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Search" component={Search}/>
        <Tab.Screen name="Reels" component={Reels}/>
        <Tab.Screen name="Activity" component={Activity}/>
        <Tab.Screen name="Drawer" component={MenuDrawer}/>
        {/* <Tab.Screen name="Profile" component={Profile}/>
         */}
      </Tab.Navigator>
     )
  }
  export const MainStack= () => {

    // const User = useSelector((state => state.user))
    const dispatch = useDispatch();
    
    const [authState, setAuthState] = useState(false)
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
      }, [])
      
      const onAuthStateChanged = (user) =>  {
        
        if(user)
        {
            dispatch({
                type:'IS_AUTHENTICATED',
                payload:true
            })
            console.log(user);
           
            firestore()
            .collection('Users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
              console.log('DD===========>',documentSnapshot.data());
                dispatch({
                    type:'SET_USER',
                    payload:documentSnapshot.data()
                })
              })
              setAuthState(true)
        }
        else{
            setAuthState(false)
            dispatch({
                type:'IS_AUTHENTICATED',
                payload:false
            })
        }
      }

      
      

    return(
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>

      {
        authState
          ?
          <>
            
            <Stack.Screen name="Instagram" component={BottomTabScreen}/> 
            <Stack.Screen name="Chat" component={Chat} />  
            <Stack.Screen name="Status" component={Status} /> 
            <Stack.Screen name="AddPost" component={AddPost} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="SearchProfile" component={SearchProfile} />
            <Stack.Screen name="Navbar" component={Navbar} /> 
            
          </>
          :
          <>
            
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
         

          </>
      }
    </Stack.Navigator>
    )
  }


const styles = StyleSheet.create({
  topSafeArea: {
    backgroundColor: HEADER_BACKGROUND,
  }

})

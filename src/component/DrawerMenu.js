import React, { useEffect, useState } from 'react'
import { Image,StyleSheet,View,Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogOut from '../MenuItems/LogOut';
import Profile from '../screens/Profile';
import { useSelector } from 'react-redux';


const Drawer = createDrawerNavigator();



const MenuDrawer = () => {
  const User = useSelector((state) => state.user)
 
  return (

    <Drawer.Navigator 
    screenOptions={{
      drawerActiveBackgroundColor:'#F4CFE0',
      drawerLabelStyle:{color:'#000000',fontWeight:'500',fontSize:17,left:-13},
      drawerStyle:{borderTopRightRadius:20}
    }
    }
    >
   
    <Drawer.Screen 
    options={{
    headerShown:false,
    drawerLabelStyle:{color:'#000000',fontWeight:'600',fontSize:18,left:-13},
    drawerPosition: "right",
    drawerItemStyle:{
      height:177,
      justifyContent:'flex-end',
      bottom:10,
      right:10,
      width:'100%',
      borderTopRightRadius:20,
    },
    drawerIcon:() => { 
      return <Image source={require('../../src/images/Avatar.png')} style={styles.profileImage} />}
  }}
    name= {User.user.name} 
    component={Profile}/>
    
    
    <Drawer.Screen
    options={{
      drawerIcon:() => { 
        return <Image source={require('../../src/images/Logout.png')} style={styles.icons} />}
    }}
    name="Log out" component={LogOut}/>
  </Drawer.Navigator>
  )
}

export default MenuDrawer

const styles =StyleSheet.create({
  profileImage:{
    width:'20%',
    height:64 ,
    resizeMode:'contain',
    marginBottom:'5%'
  },
  icons:{
    width:'10%',
    height:'70%',
    resizeMode:'contain',
  }
})



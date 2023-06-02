import { View, Text,TouchableOpacity } from 'react-native'
import React , { useEffect } from 'react'
import auth from '@react-native-firebase/auth';


const LogOut = () => {
  useEffect(()=>{
    auth().signOut()
  },[])
  return (
    <View>
       <TouchableOpacity
       onPress={() => handleSubmitPress()}>
      <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogOut
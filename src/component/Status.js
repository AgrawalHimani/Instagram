import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Image ,StatusBar,TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
const HEADER_BACKGROUND = "#3498db";

const Status = ({route, navigation}) => {

    
    const {name}=route.params;
    const {image}=route.params; 
    const {id}=route.params;

    useEffect(() => {
        let timer = setTimeout(() => {
            navigation.navigate('Home');
        },3000);

    },[])

    // const[progress,setprogress] = useState(new Animated.Value(0))

    // const progreeAnimation = progress.interpolate({
    //     inputRange:[0,5],
    //     outputRange:['0%','100%']
    // })
    
    
    return (
        <SafeAreaView styles={styles.topSafeArea}>
        <View 
        style={{
            backgroundColor:'black',
            height:'100%',
            position:'relative',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <StatusBar backgroundColor="black" barStyle='light-content'/>
            <View style={{
                height:3,
                width:'95%',
                borderWidth:1,
                backgroundColor:'gray',
                position:'absolute',
                top:18
                }}>
            </View>
                <View style={{
                    padding:15,
                    flexDirection:'row',
                    alignItems:'center',
                    position:'absolute',
                    top:12,
                    left:0,
                    width:'90%'
                }}>
                    <View style={{
                    borderRadius:100,
                    width:30,
                    height:30,
                    justifyContent:"center",
                    alignItems:'center'
                    }}>
                    
                         <Image source={image} 
                    style={{
                        borderRadius:100,
                        backgroundColor:'orange',
                        resizeMode:'cover',
                        width:'92%',
                        height:'92%'
                        }}/>
                    
                </View>
                <View style={{
                    justifyContent:'space-between',
                    flexDirection:'row',
                    width:'100%'
                    }}>
                    <Text style={{
                    color:'white',
                    fontSize:15,
                    paddingLeft:10
                    }}>
                        {name}
                        </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>

                        <Ionicons name="close-outline" 
                        style={{
                            fontSize:20,
                            color:'white',
                            opacity:0.6
                            }}/>
                    </TouchableOpacity>
                </View>

            </View>
            <TouchableOpacity style={{position:'absolute',width:'100%',height:600}} onPress={() => navigation.navigate('Home')}>
            <Image source={image} style={{position:'absolute',width:'100%',height:600}}/>
            </TouchableOpacity>
            <View style={{
                position:'absolute',
                bottom:0,
                left:0,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around',
                marginVertical:10,
                width:'100%'
            }}>
            <TextInput
                placeholder="Send messages"
                placeholderTextColor="white"
                style={{
                    borderColor:'white',
                    borderRadius:25,
                    width:'85%',
                    height:50,
                    paddingLeft:20,
                    borderWidth:1,
                    fontSize:20,
                    color:'white'
                }}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="navigation" style={{fontSize:30,color:'white',}}/>
            </TouchableOpacity>
            
            </View>
        </View>
        </SafeAreaView>
    )
}
export default Status
const styles = StyleSheet.create({
    topSafeArea: {
      backgroundColor: HEADER_BACKGROUND,
    }
  
})

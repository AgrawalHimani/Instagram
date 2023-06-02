import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Ionic from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'

const SearchTabView = ({Data}) => {
const Tab = createMaterialTopTabNavigator();
let Squares = [];
let numberOfSqures = Data.length;

for(let index=0; index<Data.length; index++){
    Squares.push(
        <View key={index} style={{margin:5}} >
            <View style={{
                width:120,
                height:200,
                marginVertical:0.5,
                // backgroundColor:'black',
                // opacity:0.1,
            }}>
                <TouchableOpacity>
                <Image source={{uri:Data[index].postImg}} 
                style
                ={{
                    width:'100%',
                    height:'100%'
                }}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const Posts = () => {
    return(
        <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={{
            // backgroundColor:'red',
            flexWrap:'wrap',
            flexDirection:'row',
            flex:1
        }}>

            {Squares}
        </View>
        </ScrollView>
    )
}
const Vedio = () => {
    return(
        <View>
            <Text>
                vedios
            </Text>
        </View>
    )
}
const Tags = () => {
    return(
        <View>
            <Text>
                tags
            </Text>
        </View>
    )
}

  return (
    
    <Tab.Navigator 
    screenOptions={({route}) => ({
        tabBarShowLabel:false,
        tabBarIndicatorStyle:{
            backgroundColor:'black',
            height:1.5 
        },
        tabBarIcon:({focused,colour}) => {
            let iconName;
            if(route.name=='Posts'){
                iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp";
                colour = focused ? "black" : "gray"
            }else if(route.name=='Vedios'){
                iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
                colour = focused ? "black" : "gray"
            }else if(route.name=='Tags'){
                iconName = focused ? "ios-person" : "ios-person-outline";
                colour = focused ? "black" : "gray"
            }

            return <Ionic name={iconName} color={colour} size={22}/>;
        }
    })}>
        <Tab.Screen name='Posts' component={Posts}/>
        <Tab.Screen name='Vedios' component={Vedio}/>
        <Tab.Screen name='Tags' component={Tags}/>
    </Tab.Navigator>
   
  )
}

export default SearchTabView
import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet,ScrollView,StatusBar,Dimensions,Image } from 'react-native'
import SearchBox from "../component/SearchBox";
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchContent from "./SearchContent";
import { useRoute } from '@react-navigation/native';
import SearchPost from "./SearchPost";
import firestore from '@react-native-firebase/firestore';
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

const HEADER_BACKGROUND = "#3498db";

const Search = () => {
    const [image,setImage] = useState(null);
  
   

    const getData = (data) => {
        setImage(data)
        // setName(data)
        // console.log(data)
        
    };

    const windowWidth = Dimensions.get('window').width
    const windowHeight = Dimensions.get('window').height
    
    
    return (
        
        <View style={{
            width:'100%',
            height:'100%',
            position:'relative',
            backgroundColor:'white'
            
        }}>
            <ScrollView>
               
                <SearchContent data={getData}/>
            </ScrollView>
            {
                image ? 
                (
                    
                    <View style={{
                        position:'absolute',
                        zIndex:1,
                        width:'100%',
                        height:'100%',
                        
                    }}>
                        <StatusBar backgroundColor='#525252' barStyle='dark-content'/>
                        <View style={{
                            position:'absolute',
                            top:windowHeight/6,
                            left:windowWidth/18,
                            backgroundColor:'white',
                            width:350,
                            height:465,
                            borderRadius:15,
                            zIndex:1,
                            elevation:50
                        }}>
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingVertical:10,
                            paddingHorizontal:15
                        }}>
                            <Image source={{uri:image}} style={{
                                width:30,
                                height:30,
                                borderRadius:100
                            }}/>
                        <View style={{
                            paddingLeft:8
                        }}>
                            
                            <Text style={{
                                fontSize:12,
                                fontWeight:'600'
                            }}>
                               
                                Himani Agrawal
                            </Text>
                        </View>

                        </View>
                            <Image source={{uri:image}} style={{
                                width:'100%',
                                height:'80%'
                            }}/>
                            <View style={{
                                justifyContent:"space-around",
                                width:'100%',
                                flexDirection:'row',
                                alignItems:'center',
                                padding:8
                            }}>
                                <Ionic name='ios-heart-outline' style={{
                                    fontSize:26
                                }}/>
                                <Ionic name='ios-person-circle-outline' style={{
                                    fontSize:26
                                }}/>
                                <Feather name='navigation' style={{
                                    fontSize:26
                                }}/>
                            </View>
                        </View>
                    </View>
                ) : null
            }
        </View>
       
    )
}
export default Search

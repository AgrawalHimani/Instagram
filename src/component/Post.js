import React from "react";
import { View, Text,TouchableOpacity,Image,TextInput  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const HEADER_BACKGROUND = "#3498db";

const Post = ({Data}) => {

    const postInfo = Data
    // console.log(props);
    return (
       
        <View>
            {
                postInfo.map((data,index) => {
                    const [like,setlike] = useState(data.islike)
                    const [save,setSave] = useState('')
                    return(
                        
                        <View key={index} style={{
                            paddingBottom:10,
                            borderBottomColor:'gray',
                            borderBottomWidth:0.1
                        }}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                padding:15
                                }}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={{uri:data.postImg}}
                                    style={{width:40,height:40,borderRadius:100}}
                                    />
                                    <View style={{paddingLeft:5}}>
                                        <Text style={{fontSize:15,fontWeight:'bold',color:'black'}}>
                                            {data.userName}

                                        </Text>
                                    </View>
                                </View>
                                    <Feather name='more-vertical' size={20} color='black'/>
                            </View>
                            <View
                            style={{
                                position:'relative',
                                justifyContent:'center',
                                alignItems:'center',
                            }}
                            >
                                <Image 
                                source={{uri:data.postImg}} 
                                style={{width:'100%',height:400}}/>
                            </View>
                            <View
                            style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                paddingHorizontal:12,
                                paddingVertical:15
                            }}
                            >
                                <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}
                                >
                                    <TouchableOpacity onPress={() => setlike(!like )}>
                                        <AntDesign name={like ? 'heart' : 'hearto'}
                                        style={{
                                            paddingRight:10,
                                            fontSize:20,
                                            color: like ? 'red' : 'black'
                                        }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <FontAwesome name="comment-o" size={20} color='black' paddingLeft={10}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Feather name="navigation" size={20} color='black' paddingLeft={20}/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => setSave(!save)}>
                                <FontAwesome name={save ? 'bookmark' : 'bookmark-o'} size={20} color='black'/>
                                </TouchableOpacity>
                                
                            </View>
                            <View
                            style={{paddingHorizontal:15}}
                            >
                                <Text style={{
                                    color:'black'
                                }}>
                                    Liked by {like ? "you and" : ''}{' '}
                                    {like ? data.likes+1 : data.likes}others

                                </Text>
                                {/* <Text style={{fontWeight:'700',fontSize:14,paddingVertical:2}}>
                                    
                                        If  the vedio please like :)
                                </Text> */}
                                <Text style={{opacity:0.4,paddingVertical:2,color:'black'}}>
                                    View all comments 
                                </Text>
                                <View
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between'
                                }}
                                >
                                    <View
                                    style={{flexDirection:'row',alignItems:'center'}}
                                    >
                                        <Image source={{uri:data.postImg}} 
                                        style={{
                                            width:25,
                                            height:25,
                                            borderRadius:100,
                                            backgroundColor:'orange',
                                            marginRight:10
                                            }}/>
                                            <TextInput 
                                            placeholder="Add a comment" 
                                            placeholderTextColor="black"
                                            style={{
                                                opacity:0.5,
                                            }}
                                            />
                                    </View>
                                    <View>
                                        <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center'
                                        }}
                                        >
                                            <Entypo name="emoji-happy" style={{fontSize:15,color:"black",marginRight:10}}/>
                                            <Entypo name="emoji-neutral" style={{fontSize:15,color:"black",marginRight:10}}/>
                                            <Entypo name="emoji-sad" style={{fontSize:15,color:"black"}}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
       
    )
}
export default Post 
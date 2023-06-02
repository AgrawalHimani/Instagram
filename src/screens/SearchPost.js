import React from "react";
import { View, Text,TouchableOpacity,Image,TextInput  } from 'react-native'


const SearchPost = ({Data,modalData}) => {

    const postInfo = Data
    // console.log(Data);
    return (
       
        <View style={{
            flexWrap:'wrap',
            flexDirection:'row',
            flex:1
        }}>
            {
                postInfo.map((data,index) => {
                    // console.log(data);
                   
                    return(
                        
                        <View key={index} style={{
                        margin:5
                        }}>
                            <View
                            style={{
                                width:120,
                                height:200,
                                marginVertical:0.5,
                            }}
                            >
                                <TouchableOpacity 
                                onPressIn={()=> modalData(data.postImg)}
                                onPressOut={()=> modalData(null)}
                                >
                                <Image 
                                source={{uri:data.postImg}} 
                                style={{ width:'100%',
                                height:'100%'}}/>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                    )
                })
            }
        </View>
       
    )
}
export default SearchPost 
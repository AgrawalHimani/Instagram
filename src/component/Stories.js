import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,ScrollView,Image  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const HEADER_BACKGROUND = "#3498db";
import { useSelector } from 'react-redux';

  const Stories = () => {
    // const User = useSelector((state => state.user))
    const navigation = useNavigation()
    // console.log(User)

    const storyInfo = [
    {
        id:1,
        name: 'Himani Agrawal',
        image: `${require('../images/profile1.jpeg')}`
        
    },{
        id:2,
        name: 'Devarshi patel',
        image: `${require('../images/profile1.jpeg')}`
    },{
        id:3,
        name: 'Raj patel',
        image: `${require('../images/profile2.jpeg')}`
    },{
        id:4,
        name: 'Jay patel',
        image: `${require('../images/profile3.jpeg')}`
    },{
        id:5,
        name: 'Kevin',
        image: `${require('../images/profile4.jpeg')}`
    },{
        id:6,
        name: 'Himani Agrawal',
        image: `${require('../images/profile5.jpeg')}`
    },
];


    return (
        
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingVertical:10}}>
        {
           storyInfo.map((data,index) => {
            
            return (
                
                <TouchableOpacity 
                
                key={index}
                 onPress={() => data.id != 1 ? navigation.push("Status",{
                    name: data.name,
                    image: data.image
                 }):null}
                 >
                
                    <View style={{
                        flexDirection:'column',
                        paddingHorizontal: 8,
                        position:'relative'
                    }}>
                       {
                        data.id == 1 ?
                        (
                            <View style={{position:'absolute',bottom:15,right:10,zIndex:1}}>
                                <Entypo 
                                name="circle-with-plus" 
                                style={{
                                    fontSize: 20,
                                    color:"#405de6",
                                    backgroundColor:'white',
                                    borderRadius:100
                                    
                                    }}/>

                            </View>
                        ) : null
                       }
                       {
                        data.id !=1 ? 
                        (
                            <View
                        style={{
                            width:68,
                            height:68,
                            backgroundColor:'white',
                             borderWidth:1,
                             borderRadius:100,
                             borderColor:'#c13584',
                            justifyContent:'center',
                            alignItems: 'center'
                            }}>
                           <Image 
                            source={data.image}
                            style={{
                                resizeMode:'cover',
                                width:'92%',
                                height:'92%',
                                borderRadius:100,
                                backgroundColor:'orange'
                                }}/>
                       </View>
                        ):null
                       }
                       {
                        data.id ==1 ? 
                        (
                            <View
                        style={{
                            width:68,
                            height:68,
                            backgroundColor:'white',
                            //  borderWidth:1,
                             borderRadius:100,
                            //  borderColor:'#c13584',
                            justifyContent:'center',
                            alignItems: 'center'
                            }}>
                           <Image 
                            source={data.image}
                            style={{
                                resizeMode:'cover',
                                width:'92%',
                                height:'92%',
                                borderRadius:100,
                                backgroundColor:'orange'
                                }}/>
                       </View>
                        ):null
                       }
                       <Text 
                       style={{color: 'black',textAlign: 'center',fontSize:10,opacity:data.id==0?1:0.5}}>
                        {data.name}
                       </Text>
                    </View>

                </TouchableOpacity>
            )
           })
        }
        </ScrollView>  
        
    )
}

export default Stories
const styles = StyleSheet.create({
    topSafeArea: {
      backgroundColor: HEADER_BACKGROUND,
      
    }
  
})

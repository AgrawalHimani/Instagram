import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import Stories from '../component/Stories';
import Post from '../component/Post';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';


const HEADER_BACKGROUND = "#3498db";
const Home = ({ navigation }) => {
    const [Data, setData] = useState('')
    useEffect(() => {

        firestore()
          ?.collection('posts')
           ?.get()
            ?.then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                var data = []
                querySnapshot?.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                });
                setData(data)
            });

    }, [])
    
    
   

    const INSTAGRAM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png";



    return (
        <SafeAreaView styles={styles.topSafeArea}>
            <View style={{
                backgroundColor: 'white', height: '100%'
            }}>
                <StatusBar backgroundColor='white' barStyle='dark-content' animated={true} />
                <View style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    justifyContent: 'space-evenly',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('AddPost')
                        }
                    >
                        <FontAwesome name='plus-square-o' size={30} color='black' />
                    </TouchableOpacity>
                    <Image source={{ uri: INSTAGRAM_LOGO }} style={styles.logo} />
                    <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Chat')
                    }
                    >
                    <Feather name="navigation" size={30} color='black' />
                    </TouchableOpacity>
                </View>
                <ScrollView>

                    <Stories />
                    {Data.length > 0 && Data ? <Post Data={Data}  /> : null}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20
                    }}>
                        <Ionicons name="refresh-circle-outline"
                            size={30} color='black' />
                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>

    )
}
export default Home
const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: HEADER_BACKGROUND,
    },
    logo: {
        flex: 1,
        height: 40,
        resizeMode: "contain",
    }

})

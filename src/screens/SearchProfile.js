import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import SearchTabView from './SearchTabView'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { SearchBody } from './SearchBody';
import { useRoute } from '@react-navigation/native';

const SearchProfile = () => {
    const User = useSelector((state => state.user))
    const route =useRoute()
    const Data =route.params?.accountDetails
    const [post,setPost] =useState([])
    useEffect(() => {

        firestore()
            .collection('posts')
            .where('userId' ,'==',Data.uid)
            .get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                var data = []
                querySnapshot.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                });
                // console.log(data);
                setPost(data)
            });

    }, [])

  return (
    <View style={{
        flex: 1,
        width:'100%',
        height:'100%',
        backgroundColor: 'white',

    }}>
        
        <View style={{
            width:'100%',padding:10
        }}>
            <SearchBody 
            name={Data.name}
            accountName={Data.accountname}
            profileImage={Data.UploadProfileImage}
            post={post.length}
            followers='300'
            following='35'
            />
            
            
        </View>
        {post.length > 0 && post ?<SearchTabView Data={post}/>: null}
        {/* <View style={{
            margin: 20,
            padding: 10,
            backgroundColor: 'red',
            marginLeft: 10
        }}>
            <View
                style={{
                    width: 70,
                    height: 70,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    borderColor: '#c13584',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <Image
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-1802d.appspot.com/o/userprofile.jpeg?alt=media&token=5fcf932d-98ec-4328-b629-234ea7bb28ef' }}
                    style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: '100%',
                        borderRadius: 100,
                        backgroundColor: 'orange'
                    }} />
            </View>
        </View> */}
        {/* <View> 
        <Text
            style={{ padding:20,color: 'black', fontSize: 20,backgroundColor:'green'}}>
            {User.user.name}
        </Text>
        </View> */}
        
           
        
    </View>
  )
}

export default SearchProfile
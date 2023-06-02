import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { ProfileBody, ProfileButtons } from './ProfileBody';
import BotttomTabView from './BotttomTabView';
import auth from '@react-native-firebase/auth';
 


const Profile = () => {
    const User = useSelector((state) => state.user)
    console.log('DATA =====>',User);
    const [Data, setData] = useState('')

    useEffect(() => {

        firestore()
            ?.collection('posts')
            ?.where('userId' ,'==',User.user.uid)
            ?.get()
            ?.then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                var data = []
                querySnapshot?.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                });
                // console.log(data);
                setData(data)
            });

    }, [])

  

    //const [userData, setUserData] = useState('');
    // console.log(User)
    // console.log(Data);
    // useEffect(() => {
    //     readData();
    // }, [])

    // const readData = async () => {
    //     await firestore()
    //         .collection('Users')
    //         // Filter results
    //         .doc(auth().currentUser.uid)
    //         .get()
    //         .then(documentSnapshot => {
    //             setUserData(documentSnapshot.data());
    //         }
    //         )
    // }


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
                <ProfileBody 
                name={User.user.name}
                accountName={User.user.accountname}
                profileImage={{uri:User.user.UploadProfileImage}}
                post={Data.length}
                followers='300'
                following='35'
                />
                
                <ProfileButtons id={0}/>
            </View>
            {Data.length > 0 && Data ?<BotttomTabView Data={Data}/>: null}
            {/* <BotttomTabView Data={Data}/> */}
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
export default Profile

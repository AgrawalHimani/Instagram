import { View, Text, TouchableOpacity, ToastAndroid, Image, TextInput,Alert, StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';




const EditProfile = ({ route, navigation }) => {
    const [Name, setName] = useState('')
    const [accontName, setAccountName] = useState('')
    const [image, setImage] = useState(null);
    const [Uploaduri,setUploaduri] = useState(null);
    const [transferred, setTransferred] = useState(0);
    const [uploading, setUploading] = useState(false);
    var ProfileImg =''
    const User = useSelector((state => state.user))
    const { name, accountName, profileImage } = route.params
    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log('========>',image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };
    const uploadUserProfile = async () => {
        if (image == null) {
            return null;
        }

        const uploaduri = image;
        let filename = image.substring(image.lastIndexOf('/') + 1);

        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');
        filename = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);

        const task = storage().ref(filename)
        const storageref = task.putFile(uploaduri);
        //set transferd state
        storageref.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
            )
        });

        try {
            await storageref;

            await task.getDownloadURL().then((url)=>ProfileImg =url);
            // console.log(url);
            setUploading(false);
            setImage(null)
            Alert.alert(
                'Image uploaded',
                'Your Image has been uploaded to the Firebase Cloud Storage Successfully!'
            )
           
            return true
        } catch (e) {
            console.log('====>',e);
            return null;
        }

    }
    const submitPost = async () => {

        await uploadUserProfile();
        console.log('Image Url DEEdsgvsdgvsdv: ', ProfileImg);
        

        firestore()
            .collection('Users')
            .doc(User.user.uid)
            .update({
                UploadProfileImage: ProfileImg
            })
            .then(() => {
                setUploaduri(ProfileImg)
                console.log('Profile Added!');
                Alert.alert(
                    'Profile published!',
                    'Your profile has been published Successfully!',
                );
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
            });
    }

  
    const ToastMessage = () => {
        ToastAndroid.show('Edited Successfully !', ToastAndroid.SHORT)
        firestore()
            .collection('Users')
            .doc(User.user.uid)
            .update({
                name: Name,
                accountname: accontName
            })
    }
    // const handleSubmitPress = () => {
    //     auth()
    //         .signOut()
    //         .then(() => console.log('User signed out!'));


    // }


    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white'
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionic name='close-outline'
                        style={{
                            fontSize: 35
                        }} />
                </TouchableOpacity >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>
                    Edit Profile
                </Text>
                <TouchableOpacity onPress={() => {
                    ToastMessage();
                    navigation.goBack()
                    
                }}>
                    <Ionic name='checkmark'
                        style={{
                            fontSize: 35,
                            color: '#3493D9'
                        }} />
                </TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'center'
            }}>

                {/* {image != null ? <Image style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100
                }} source={{ uri: image }} /> : null} */}

                {uploading ? (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>{transferred} % Completed!</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (

                    <TouchableOpacity style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        // backgroundColor:'#2e64e515',
                        width:80,
                        height:80,
                        borderRadius: 100,
                        padding: 15,
                        margin: 10,
                        // backgroundColor: 'red',
                    }}
                    onPress={submitPost}>
                        {Uploaduri != null ? <Image style={{
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                            justifyContent:'center',
                            marginBottom:10,
                            // backgroundColor:'red'
                        }} source={{ uri: Uploaduri }} /> : null}
                    </TouchableOpacity>

                )}
                {/* <TouchableOpacity onPress={submitPost()}>
                    {image != null ? <Image style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100
                    }} source={{ uri: image }} /> : null}
                </TouchableOpacity> */}
                {/* <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-1802d.appspot.com/o/userprofile.jpeg?alt=media&token=5fcf932d-98ec-4328-b629-234ea7bb28ef' }}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 100
                    }}
                /> */}
                <TouchableOpacity  onPress={takePhotoFromCamera}>
                <Text style={{
                    color: '#3493D9',
                    marginTop:10
                }}>
                    Change Profile Photo
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{
                padding: 10
            }}>
                <View>
                    <Text style={{
                        opacity: 0.5
                    }}>
                        Name
                    </Text>
                    <TextInput placeholder='name'
                        defaultValue={User.user.name}
                        onChangeText={setName}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD'
                        }} />
                </View>
                <View style={{
                    paddingVertical: 10
                }}>
                    <Text style={{
                        opacity: 0.5
                    }}>
                        UserName
                    </Text>
                    <TextInput placeholder='accountName'
                        defaultValue={User.user.accontname}
                        onChangeText={setAccountName}
                        style={{
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: '#CDCDCD'
                        }} />
                </View>
                <View style={{
                    paddingVertical: 10
                }}>
                    <TextInput placeholder='Website' style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD'
                    }} />
                </View>
                <View style={{
                    paddingVertical: 10
                }}>
                    <TextInput placeholder='Bio' style={{
                        fontSize: 16,
                        borderBottomWidth: 1,
                        borderColor: '#CDCDCD'
                    }} />
                </View>

            </View>
            <View>
                <Text style={{
                    marginVertical: 10,
                    padding: 10,
                    color: '#3493D9',
                    borderBottomWidth: 1,
                    borderColor: '#EFEFEF'
                }}>
                    Swich to Proffesional account
                </Text>
                <Text style={{
                    marginVertical: 10,
                    padding: 10,
                    color: '#3493D9',
                    borderBottomWidth: 1,
                    borderColor: '#EFEFEF'
                }}>
                    Personal Information setting
                </Text>

            </View>
            {/* <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => handleSubmitPress()}>
                <Text style={styles.buttonTextStyle}>Logout</Text> */}
                {/* <ActionButton buttonColor="#2e64e5" style={{
                    width: '100%',
                    height: '90%',

                }}>
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="Take Photo"
                        onPress={takePhotoFromCamera}>
                        <Ionic name="camera-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton> */}
                {/* <Text style={{
                color:'black',
                marginTop:10,
                paddingLeft: 15,
                paddingRight: 15,
               }}>
                 {userData.name}
                 {userData.email}
                 {userData.password}            
               </Text> */}
            {/* </TouchableOpacity> */}

        </View>
    )
}

export default EditProfile
const styles = StyleSheet.create({

    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: 'black',
        paddingVertical: 10,
        fontSize: 16,
    },
    // actionButtonIcon: {
    //     fontSize: 20,
    //     height: 22,
    //     color: 'white',
    // },
});
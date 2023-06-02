import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { AsyncStorage } from 'react-native';

import Loader from '../component/Loader';

const Login = ({ navigation }) => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        // firestore()
        //     .collection('Users')
        //     .add({
        //      email: userEmail,
        //      password: userPassword,
        //     })
        //     .then(() => {
        //     console.log('User added!');
        //     }).catch((error) =>{
        //         console.error("check",error)
        //     })

        // firestore()
        //     .collection('Users')
        //     // Filter results
        //     .where('email', '==', userEmail)
        //     .get()
        //     .then(querySnapshot => {
        //         console.log(querySnapshot.docs)

        //         if (querySnapshot.docs.length > 0) {
        //             console.log(querySnapshot.docs[0]._data.email) + " "
        //                 + console.log(querySnapshot.docs[0]._data.password)
        //         }
        //         else {
        //             console.log("Account not found")
        //         }

        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
            auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
            //   if (error.code === 'auth/email-already-in-use') {
            //     console.log('That email address is already in use!');
            //   }
          
              if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
              }
              if (error.code === 'auth/user-not-found') {
                alert('Please create New Account');
              }
          
              console.error(error.code);
            });
    }

    return (
        <View style={styles.mainBody}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                    ,
                }}>
                <LinearGradient colors={['#4f5bd5', '#962fbf', '#d62976','#fa7e1e','#feda75']} style={{flex:1,justifyContent:'center'}} >
                
                <View>
                    <KeyboardAvoidingView enabled>

                        {/* <View style={{alignItems: 'center'}}>
                  <Image
                    source={require('../Image/aboutreact.png')}
                    style={{
                      width: '50%',
                      height: 100,
                      resizeMode: 'contain',
                      margin: 30,
                    }}
                  />
                </View> */}
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={()=>handleSubmitPress()}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => {
                                navigation.navigate('Signup')
                            }}
                        >
                            Creat New Account
                        </Text>

                    </KeyboardAvoidingView>
                </View>
                </LinearGradient>

            </ScrollView>
        </View>
    );
}
export default Login;
const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
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
    inputStyle: {
        flex: 1,
        width: '90%',
        height: 50,
        borderRadius: 10,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
    registerTextStyle: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
        textDecorationLine: 'underline'
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

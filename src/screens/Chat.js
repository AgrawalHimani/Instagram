import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, StatusBar } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { useState, useEffect } from 'react';
import React from 'react'


const Chat = ({ navigation }) => {

    const [Msg, setMsg] = useState('')
    const [storearr, setStoreArr] = useState([])
    const [currentDate, setCurrentDate] = useState('');

    const StoreData = () => {
        setStoreArr((oldmessage) => {
            return [...oldmessage, Msg]
        })
        setMsg('')
    }
    useEffect(() => {

        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
            ' ' + hours + ':' + min 
        );
    }, []);

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1}}>
                <View style={{ flex: 1 }}>
                    {
                        storearr.map((item) => {
                            return (
                                <View style={{ margin: 10, }}>
                                    <Text style={{

                                        fontSize: 20,
                                    }}>
                                        {item}
                                    </Text>
                                    {storearr!==''? <Text>{currentDate}</Text>:null}
                                    
                                </View>
                            )
                        })
                    }

                </View>
            </ScrollView>
            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fAF9FF',
                width: '100%',
                bottom: 0,
                height: '10%'
            }}>

                <View style={{
                    position: 'absolute',
                    // bottom: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginVertical: 10,
                    width: '100%'
                }}>
                    <TextInput
                        placeholder="Send messages"
                        // placeholderTextColor="white"
                        value={Msg}
                        onChangeText={(text) => setMsg(text)}
                        style={{
                            fontFamily: 'Inter',
                            height: 48,
                            width: 320,
                            borderRadius: 10,
                            backgroundColor: "#B0CFF4",  //#D8DCDC
                            justifyContent: "center",
                            alignItems: 'center',
                        }}
                    />
                    <TouchableOpacity onPress={() => StoreData()}>
                        <Feather name="navigation" style={{ fontSize: 30 }} />
                    </TouchableOpacity>

                </View>
            </View>

        </KeyboardAvoidingView>

    )
}

export default Chat
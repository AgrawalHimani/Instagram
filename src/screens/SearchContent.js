import { View, Text, Image, FlatList,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBox from '../component/SearchBox'
import firestore from '@react-native-firebase/firestore';
import SearchPost from "./SearchPost";
import { useNavigation } from '@react-navigation/native';


const SearchContent = ({data}) => {

    const [show, setShow] = useState(false)
    const [Data, setData] = useState([])
    const [postData, setpostData] = useState([])
    const [searchtext, setSearchText] = useState(null)
    const navigation = useNavigation()

    const SearchContents = (text) => {
        setShow(text.length > 0)
        setSearchText(text)
    }

    useEffect(() => {

        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                var data = []
                querySnapshot.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                });
                setData(data)
                // console.log('data==>',data);
            });

    }, [])

    useEffect(() => {

        firestore()
            .collection('posts')
            .get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                var data = []
                querySnapshot.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data())
                });
                setpostData(data)
                // console.log('data==>',data);
            });


    }, [])
    

    return (

        <View>
            <SearchBox updateState={SearchContents} />
            {
                show ?
                    <>
                        <FlatList 
                            data={Data.filter((item) => item.name.toLowerCase().includes(searchtext.toLowerCase()))}

                            renderItem={({ item }) => {
                                // console.log(item);
                                return (
                                    <View style={{
                                        justifyContent: 'flex-start',
                                        flexDirection: 'row',
                                        padding: 10,

                                    }}>
                                        <View style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1
                                        }}>

                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 18,
                                            }}>
                                                {item.name[0]}
                                            </Text>
                                        </View>

                                        <View style={{
                                            margin: 10
                                        }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                navigation.navigate('SearchProfile',{accountDetails:item})
                                                }
                                            >
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    width: '100%',
                                                    fontSize: 18,
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </>
                    :
                    <View> 
                    {
                    postData.length > 0 ? 
                        <SearchPost Data={postData} modalData={data}/>
                        :null
                        }
            </View>
            }
        </View>
    )
}

export default SearchContent
import { View, Text } from 'react-native'
import React from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { videoData } from './Database'
import SinglerReel from './SinglerReel'
import { useState } from 'react'

const ReelsComponent = () => {
const [currentIndex,setCurrentIndex] = useState(0);

const changeIndedValue = ({index}) => {
    setCurrentIndex(index);
}

  return (
    <SwiperFlatList
    data={videoData}
    vertical={true}
    onChangeIndex={changeIndedValue}
    renderItem={({item,index}) =>  (
    <SinglerReel item={item} index={index} currentIndex={currentIndex}/>
    )}
    keyExtractor={(item,index) => index}
    />
    
    
  )
}

export default ReelsComponent
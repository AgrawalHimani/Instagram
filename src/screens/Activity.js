import React from "react";
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
const HEADER_BACKGROUND = "#3498db";

const Activity = () => {
    return (
        
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor:'pink',
            alignContent: 'center',
            
        }}>
            <Text style={{
                color:'black',
                alignSelf:'center'
            }}>
                Activity Screen 
            </Text>
        </View>
        
    )
}
export default Activity 

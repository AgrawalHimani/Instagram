import { StyleSheet, 
    Text, 
    View,
    StatusBar, 
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
  
import React from 'react'



const Drawer =createDrawerNavigator();
// const search = () => {
//   <TextInput
//   onChangeText={(text)=>search(text)}
//   placeholder="Search Contact"
//   style={styles.searchBar}
//   mode="outlined"
//   activeOutlineColor='#26324070'
//   left={<TextInput.Icon icon='magnify' color='#26324070' size={25}/>}
//   theme={{ roundness: 30 }} 
// />
// }

const Navbar = (props) => {
  const navigation = useNavigation()
//   const handleClick = () => {
//     props.updateState()
//   }


  return (
    <ScrollView style={styles.mainContainer} scrollEnabled={false} showsVerticalScrollIndicator={false}>
    <StatusBar hidden = {false} backgroundColor = "#F4CFE0" />
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>      
        {
          props.left == 'name'
         
        }
        <Text style={styles.headerText}>{props.name}</Text>
        <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: 'black',
                paddingHorizontal: 5,
                marginTop:5,
                opacity: 0.5,
              }}
            />
          </View>  
        { 
          props.right == 'Menu'
        ?
        <TouchableOpacity
        style={{right:10,flexDirection: 'row'}}
        onPress={()=> navigation.openDrawer()}
          >
             <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: 'black',
                paddingHorizontal: 15,
              }}
            />
            <Image source={require('../../src/images/DrawerMenuIcon.png')} style={{width:23,height:23,resizeMode:'contain'}}/>
      
          </TouchableOpacity>
          :<TouchableOpacity>
          <Text style={styles.navbarText}>{props.right}</Text>
          </TouchableOpacity>
        }
        </View>
    </ScrollView>
  )
}



export default Navbar

const styles = StyleSheet.create({
    mainContainer:{
        maxHeight:50
    },
    container:{
        flex:1, 
        flexDirection:'row' ,
        justifyContent:'space-between',
        alignItems:'center',
        
        height:50,
        padding:10 
    },
    headerText:{  
    fontWeight:'500', 
    fontSize:23,
    marginLeft:17,
    color:'#263240'
  },
  navbarText:{
    fontWeight:'400',
    fontSize:15,
    color:'#263240',
    // marginRight:'2%'
  } 
})
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector,useDispatch } from 'react-redux'





const AddPostScreen = () => {
  
  const User = useSelector((state => state.user))
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [caption, setCaption] = useState(null);
  // console.log(User);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {

    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);

    firestore()
    .collection('posts')
    .add({
      userId: User.user.uid,
      userName:User.user.name,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
      caption:caption
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setCaption(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }

    const uploadImage = async () => {
      if( image == null ) {
        return null;
      }

    const uploaduri = image;
    let filename = uploaduri.substring(uploaduri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0,-1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(filename)
    const storageref = task.putFile(uploaduri);

    //set transferd state
    storageref.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100
      )
    });
    

    try{
      await storageref;

      const url = await task.getDownloadURL();
      console.log(url);
      setUploading(false);
      setImage(null)
      Alert.alert(
        'Image uploaded',
        'Your Image has been uploaded to the Firebase Cloud Storage Successfully!'
      );
      return url;
    } catch(e) {
      console.log('huiiiiiiiiiii',e);
      return null;
    }
    
  }



  return (
    
    < KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={styles.container}>
      <View style={{
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        height:300,
        borderRadius:15,
        borderWidth:1,
        borderColor:'#000',
        margin:10,
        alignSelf:'center'
      }}>
        {image != null ? <Image style={{
          width:'90%',
          height:250,
        }}source={{uri: image}} /> : null}

      </View>
      {/* <View
      // style={{
      //   height:'20%',
      // }}
      > */}
      <TextInput
        style={{
          height:60,
          width:'90%',
          alignSelf:'center',
          padding:10,
          margin:10,
          borderRadius:10,
          borderColor:'#000',
          borderWidth:1,
          backgroundColor:'#ffff'
        }}
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={caption}
          onChangeText={(content) => setCaption(content)}
        />
        
        
      {/* </View> */}
      {uploading ? (
          <View style={{
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={{
            height:'20%',
           
          }}>
          <TouchableOpacity style={{
            flexDirection:"row",
            justifyContent:'center',
            // backgroundColor:'#2e64e515',
            borderRadius:5,
            padding:15,
            margin:10,
            backgroundColor:'red',
          }} onPress={submitPost}>
            <Text style={{
              fontSize:18,
              fontWeight:'bold',
              fontFamily:'Lato-Bold',
              color:'#2e64e5',
         
            }}>Post</Text>
          </TouchableOpacity>
          </View>
        )}
  
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      
    </KeyboardAvoidingView>
    
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'pink',

  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';


import Colors from '../constants/Colors';

const ImageCapture = props => {
  const [pickedImage, setPickedImage] = useState();
  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();




  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };
  


  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const titleChangeHandler = text => {
    // you could add validation
    setTitleValue(text);
  };


  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.5
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  const dispatch = useDispatch();


  dispatch(placesActions.addPlace(titleValue, selectedImage, selectedLocation));
  props.navigation.goBack();



  const savePlaceHandler2 = () => {
    console.log("hello", selectedLocation);

//fetch test 

fetch('http://c5efce558c68.ngrok.io/blockchain', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    CONTRACT:"eWitnessContract",
  IMAGE_HASH:"821f4411665ac89bc7e364d2131b84ea9321d04400544fa33fd858b5a04c012e", 
  IMAGE_LOCATION:"01.505:-0.09" ,
  IMAGE_TIME:"00:40:00", 
  USER_ID:"6" ,
  DEVICE_ID:"90"
  })
}).then((response) => console.log(response.json()))

.catch((error) => console.error(error));

    props.navigation.goBack();
  };


  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Caption Me</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        </View>
        <View style={styles.buttonGroup}>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />

<Button
        title="Save Image"
        color={Colors.primary}
        onPress={savePlaceHandler2}
      />

</View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  buttonGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imagePreview: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  },
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }


});

export default ImageCapture;

import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import MapScreen from '../screens/MapScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlacesListScreen from  '../screens/PlacesListScreen'
import PlaceDetailScreen from  '../screens/PlaceDetailScreen'
import ImageCaptureScreen from  '../screens/ImageCaptureScreen'

import CustomHeaderButton from '../components/HeaderButton'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';


const PlacesNavigator = createStackNavigator();



function PlaceNavigator() {
    return (
        <NavigationContainer >
        <PlacesNavigator.Navigator>
            <PlacesNavigator.Screen name="Places List Screen" component={PlacesListScreen} 
              options={({ navigation }) => ({title: 'Capture', headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='Add Place' iconName={Platform.OS==='android'? 'md-add':'ios-add'}
            onPress={ ()=> {navigation.navigate('ImageCaptureScreen') }}>

            </Item>
   </HeaderButtons>
        ),
      })}
      />

      
        <PlacesNavigator.Screen name="MapScreen" component={MapScreen} />
        <PlacesNavigator.Screen name="NewPlaceScreen" component={NewPlaceScreen}
          options={({ navigation }) => ({
            title: 'New Place App'
          })} />
      
        <PlacesNavigator.Screen name="PlacesDetailsScreen" component={PlaceDetailScreen} />
        <PlacesNavigator.Screen name="ImageCaptureScreen" component={ImageCaptureScreen} />
      </PlacesNavigator.Navigator>
      </NavigationContainer >

    );
  }


  export default PlaceNavigator;


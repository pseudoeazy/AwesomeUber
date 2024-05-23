import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_API_KEY } from '@env';

import NavOptions from '../components/NavOptions';
import { setDestination, setOrigin } from '../../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handlePlaceSelect = (data, details = null) => {
    if (details && details.geometry && details.geometry.location) {
      dispatch(
        setOrigin({
          location: details.geometry.location,
          description: data.description,
        })
      );
      dispatch(setDestination(null));
    } else {
      console.error('Details or geometry not available');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        placeholder="Where From?"
        onPress={handlePlaceSelect}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        styles={autoCompleteStyles}
      />
      <NavOptions />
      <NavFavourites />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  logoContainer: {
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

const autoCompleteStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    fontSize: 18,
  },
});

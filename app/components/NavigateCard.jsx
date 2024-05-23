import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  selectDestination,
  selectOrigin,
  setDestination,
} from '../../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  //   console.log({ origin, destination });
  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <Text style={tailwind`text-center py-5 text-xl`}>Good Morning, Eazy</Text>
      <View style={tailwind`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={styles}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            placeholder="Where to?"
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate('RideOptionsCard');
              // console.log(data, details);
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tailwind`flex flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tailwind`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Ionicons name="car" type="font-awesome" color="white" size={16} />

          <Text style={tailwind`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex flex-row  justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Ionicons
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tailwind` text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

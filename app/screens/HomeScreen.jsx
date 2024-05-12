import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';

import { GOOGLE_MAPS_API_KEY } from '@env';
import NavOptions from '../components/NavOptions';
import { setDestination, setOrigin } from '../../slices/navSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={[styles.container, tw`bg-white  p-5`]}>
      <View style={tw`p-5`}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        minLength={2}
        placeholder="Where From?"
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
          // console.log(data, details);
        }}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
      />
      <NavOptions />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : '',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

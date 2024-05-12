import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import tailwind from 'twrnc';
import { useSelector } from 'react-redux';

import { GOOGLE_MAPS_API_KEY } from '@env';
import { selectOrigin } from '../../slices/navSlice';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const apiKey = GOOGLE_MAPS_API_KEY; // Access the API key from environment variable

  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    setRegion({
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, []);
  return (
    <View>
      <MapView
        style={{ width: '100%', height: '100%' }}
        mapType="standard"
        region={region}
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        // googleMapsApiKey={apiKey}
      >
        {origin?.location && (
          <Marker
            coordinate={region}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});

import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';

import { GOOGLE_MAPS_API_KEY } from '@env';
import { selectDestination, selectOrigin } from '../../slices/navSlice';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    if (origin?.location) {
      setRegion({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, []);

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    // const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${GOOGLE_MAPS_API_KEY}`;

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // Access distance and duration information
    //     const distance = data.rows[0].elements[0].distance.text;
    //     const duration = data.rows[0].elements[0].duration.text;
    //     console.log(`Distance: ${distance}, Duration: ${duration}`);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching distance matrix:', error);
    //   });
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);
  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
        mapType="standard"
        region={region}
      >
        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin?.location?.lat,
              longitude: origin?.location?.lng,
            }}
            destination={{
              latitude: destination?.location?.lat,
              longitude: destination?.location?.lng,
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeColor="green"
            strokeWidth={3}
          />
        )}

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}
        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});

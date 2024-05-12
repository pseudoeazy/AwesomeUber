import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import Map from '../components/Map';

const MapScreen = () => {
  return (
    <View>
      <View style={tailwind`h-1/2  border border-red-500`}>
        <Map />
      </View>
      <View style={tailwind`h-1/2  border border-blue-500`}></View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});

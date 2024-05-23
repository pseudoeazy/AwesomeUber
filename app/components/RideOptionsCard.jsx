import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tailwind from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: 'User-X-123',
    title: 'UberX',
    multiplier: 1,
    image: require('../assets/car_2.png'),
  },
  {
    id: 'User-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: require('../assets/jawa.png'),
  },
  {
    id: 'User-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: require('../assets/cybertruck_tesla.png'),
  },
];

const RideList = () => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={tailwind`flex-1`}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={[
                tailwind`flex flex-row items-center justify-between px-10 py-4`,
                item.id === selected?.id && tailwind`bg-gray-200`,
              ]}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
                source={item.image}
              />
              <View style={tailwind`-ml-6`}>
                <Text style={tailwind`text-xl font-semibold`}>
                  {item.title}
                </Text>
                <Text>Travel time ...</Text>
                <Text style={tailwind`text-xl`}>$99</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => (
          <View>
            <TouchableOpacity
              disabled={!selected}
              style={tailwind`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
            >
              <Text style={tailwind`text-center text-white text-xl`}>
                Choose {selected?.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const RideOptionsCard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <View style={tailwind`relative`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full border`}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <Text style={tailwind`text-center py-5 text-xl`}>Select a Ride</Text>
      </View>

      <RideList />
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: require('../assets/sedan.png'),
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: require('../assets/snacks.png'),
    screen: 'EatsScreen',
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 bg-gray-200 m-2 w-40 h-62`}
        >
          <View>
            <Image source={item.image} style={styles.image} />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <AntDesign
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              size={24}
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});

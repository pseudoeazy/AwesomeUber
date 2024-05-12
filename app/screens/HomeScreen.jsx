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
import NavOptions from '../components/NavOptions';

const HomeScreen = () => {
  return (
    <View style={[styles.container, tw`bg-white  p-5`]}>
      <View style={tw`p-5`}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
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

import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLOR from '../../constants/Colors';

const NotLogin = () => {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLOR.primary },
          headerTitle: 'Not Login',
          headerTitleStyle: { color: 'white' },
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          backgroundColor: 'white',
          height: Dimensions.get('window').height - 105,
          width: Dimensions.get('window').width,
        }}
      >
        <Image
          source={require('./../../assets/images/halamandepan.png')}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ fontSize: 20 }}>Not Logged In ?</Text>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            router.replace('login');
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 25,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: 'black',
    padding: 10,
    width: 200,
    borderRadius: 20,
  },
});

export default NotLogin;

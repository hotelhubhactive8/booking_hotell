import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import COLOR from '../../constants/Colors';
import GoogleMapView from '../../components/Home/GoogleMapView';
import Header from '../../components/Home/Header';
import Cities from './../../components/Home/Cities';
import Popular from './../../components/Home/Popular';

const home = () => {
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.white, marginTop: -30 }}>
        <Stack.Screen
          options={{
            headerTitle: 'HotelHub',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
            },
            headerStyle: {
              backgroundColor: COLOR.primary,
            },
          }}
        />
        <View style={styles.container}>
          <Header />
          <GoogleMapView />
          <Cities />
          <Popular />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    gap: 20,
  },

  listContainer: {
    flex: 1,
    borderRadius: 20,
    marginVertical: 8,
  },
});

export default home;

import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMapView = () => {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Places</Text>
      <View style={{ borderRadius: 20, overflow: 'hidden' }}>
        <MapView
          style={{
            width: Dimensions.get('screen').width * 1,
            height: Dimensions.get('screen').height * 0.25,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: -1.21462,
            longitude: 120.84513,
            latitudeDelta: 30,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    </View>
  );
};

export default GoogleMapView;

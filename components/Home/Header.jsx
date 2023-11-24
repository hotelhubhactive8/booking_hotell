import { View, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import React from 'react';

export default function Header() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
      }}
    >
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <View>
        <TextInput placeholder="Search" style={styles.searchBar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
  },
  searchBar: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 50,
    paddingLeft: 10,
    width: Dimensions.get('screen').width * 0.8,
    fontSize: 16,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

import React from 'react';
import { View, SafeAreaView, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useSelector } from 'react-redux';

import COLOR from '../../constants/Colors';
import ICON from '../../constants/Icons';
import FormEdit from '../../components/Settings/FormEdit';
import NotLogin from '../../components/Login/NotLogin';

const Profile = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const renderHeader = () => {
    return (
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLOR.primary },
          headerShadowVisible: false,
          headerTitle: isLoggedIn ? 'Settings' : '',
          headerTitleStyle: {
            color: 'white',
          },
        }}
      />
    );
  };

  const renderLoggedInContent = () => (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        <View style={styles.icon}>
          <Image source={ICON.hacker} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={styles.formContainer}>
          <FormEdit />
        </View>
      </SafeAreaView>
    </ScrollView>
  );

  return isLoggedIn ? renderLoggedInContent() : <NotLogin />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    gap: 20,
    height: Dimensions.get('screen').height - 140,
  },

  icon: {
    marginTop: 20,
    width: 80,
    height: 80,
    backgroundColor: COLOR.lightGray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 1,
  },

  formContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    flex: 1,
  },
});

export default Profile;

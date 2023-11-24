import { Stack, useRootNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import COLOR from '../../../constants/Colors';
import { addBooking } from '../../../redux/slice/bookingSlice';
import { resetDetails } from '../../../redux/slice/detailSlice';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 300,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
  },
});

const Booking = () => {
  const dispatch = useDispatch();
  const rootNavigation = useRootNavigation();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const detail = useSelector((state) => state.detail.details);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLOR.lightGray },
          headerShadowVisible: false,
          headerTitle: 'Booking',
          headerTitleStyle: {},
        }}
      />
      <View style={style.container}>
        <View>
          <Text>Booking</Text>
          <View>
            <Text>Date Check In</Text>
            <TextInput
              name="checkIn"
              placeholder="checkIn"
              style={style.textInput}
              onChangeText={(checkIn) => {
                setCheckIn(checkIn);
                console.log(checkIn);
              }}
              value={checkIn}
            />
          </View>
          <View>
            <Text>Date Check Out</Text>
            <TextInput
              name="checkOut"
              placeholder="checkOut"
              style={style.textInput}
              onChangeText={(checkOut) => {
                setCheckOut(checkOut);
                console.log(checkOut);
              }}
              value={checkOut}
            />
          </View>
          <View>
            <TouchableOpacity
              style={style.button}
              onPress={() => {
                if (auth.isLoggedIn === false) {
                  return rootNavigation.navigate('login');
                }
                if (checkIn === '' || checkOut === '') {
                  return alert('Please fill the form');
                }
                if (detail.length < 1) {
                  setCheckIn('');
                  setCheckOut('');
                  return rootNavigation.navigate('home');
                }
                setCheckIn('');
                setCheckOut('');
                dispatch(addBooking(detail));
                dispatch(resetDetails());
                rootNavigation.navigate('home');
              }}
            >
              <Text style={style.buttonText}>Booking now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booking;

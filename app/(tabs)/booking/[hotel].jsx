import { Stack, useLocalSearchParams, useRootNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLOR from '../../../constants/Colors';
import DatePicker from 'react-native-modern-datepicker';
import { addBooking } from '../../../redux/slice/bookingSlice';
import { resetDetails } from '../../../redux/slice/detailSlice';
import { useDispatch, useSelector } from 'react-redux';

const Booking = () => {
  const dispatch = useDispatch();
  const rootNavigation = useRootNavigation();
  const auth = useSelector((state) => state.auth);
  const detail = useSelector((state) => state.detail.details);
  const today = new Date().toLocaleDateString('en-CA');
  const { hotel } = useLocalSearchParams();
  const [checkIn, setCheckIn] = useState('Select Date');
  const [checkOut, setCheckOut] = useState('Select Date');
  const [openModalCheckIn, setOpenModalCheckIn] = useState(false);
  const [openModalCheckOut, setOpenModalCheckOut] = useState(false);
  const { fullName, telp } = useSelector((state) => state.auth);
  const [contactName, setContactName] = useState(fullName);
  const [contactTelp, setContactTelp] = useState(telp);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          backgroundColor: COLOR.white,
        }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLOR.primary },
            headerShadowVisible: false,
            headerTitle: 'Booking',
            headerTitleStyle: {
              color: 'white',
            },
          }}
        />
        {/* Modal Check In */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModalCheckIn}
          onRequestClose={() => setModalVisible(!openModalCheckIn)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Check In</Text>
              <DatePicker
                onSelectedChange={(date) => setCheckIn(date)}
                minimumDate={today}
                options={{
                  backgroundColor: COLOR.lightGray,
                  textHeaderColor: 'black',
                  textDefaultColor: 'black',
                  selectedTextColor: '#fff',
                  mainColor: 'black',
                  textSecondaryColor: 'black',
                }}
                current={today}
                mode="calendar"
                style={{ borderRadius: 10, width: 300 }}
              />
              <TouchableOpacity onPress={() => setOpenModalCheckIn(!openModalCheckIn)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal Check Out */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openModalCheckOut}
          onRequestClose={() => setModalVisible(!openModalCheckOut)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Check Out</Text>
              <DatePicker
                onSelectedChange={(date) => setCheckOut(date)}
                minimumDate={today}
                options={{
                  backgroundColor: COLOR.lightGray,
                  textHeaderColor: 'black',
                  textDefaultColor: 'black',
                  selectedTextColor: '#fff',
                  mainColor: 'black',
                  textSecondaryColor: 'black',
                }}
                current={today}
                mode="calendar"
                style={{ borderRadius: 10, width: 300 }}
              />
              <TouchableOpacity onPress={() => setOpenModalCheckOut(!openModalCheckOut)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.container1}>
            <Image
              source={require('../../../assets/images/hotel.png')}
              style={{ width: 80, height: 80 }}
            />
            <View>
              <Text style={{ color: COLOR.white }}>Hotel name: </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: COLOR.white,
                }}
              >
                {hotel}
              </Text>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.text}>
              <MaterialCommunityIcons name="calendar-start" size={19} />
              <Text>Check In</Text>
            </Text>
            <TouchableOpacity
              style={styles.btnDate}
              onPress={() => setOpenModalCheckIn(!openModalCheckIn)}
            >
              <Text style={[styles.text, styles.color]}>{checkIn}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              <MaterialCommunityIcons name="calendar-end" size={19} />
              <Text>Check Out</Text>
            </Text>
            <TouchableOpacity
              style={styles.btnDate}
              onPress={() => setOpenModalCheckOut(!openModalCheckOut)}
            >
              <Text style={[styles.text, styles.color]}>{checkOut}</Text>
            </TouchableOpacity>
            <View style={styles.contact}>
              <Text style={[styles.text]}>
                <MaterialCommunityIcons name="contacts" size={19} />
                Contact Information
              </Text>
              <View style={{ gap: 5 }}>
                <Text style={[styles.text]}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={contactName}
                  onChangeText={(inputName) => setContactName(inputName)}
                />
              </View>
              <View style={{ gap: 5 }}>
                <Text style={[styles.text]}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={contactTelp}
                  onChangeText={(inputTelp) => setContactTelp(inputTelp)}
                />
              </View>
            </View>
            <TouchableOpacity
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
                dispatch(
                  addBooking({
                    ...detail,
                    checkIn: checkIn,
                    checkOut: checkOut,
                  })
                );
                dispatch(resetDetails());
                rootNavigation.navigate('home');
              }}
            >
              <Text style={styles.btnBooking}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 16,
    padding: 10,
    paddingVertical: 20,
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  container2: {
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 20,
    flex: 6,
    width: 390,
    gap: 10,
  },

  contact: {
    marginTop: 15,
    gap: 10,
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 10,
  },

  color: {
    color: 'black',
  },

  btnDate: {
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 8,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },

  text: {
    fontSize: 18,
  },

  input: {
    borderBottomWidth: 0.3,
    fontSize: 18,

    paddingVertical: 5,
  },

  btnBooking: {
    backgroundColor: COLOR.primary,
    textAlign: 'center',
    padding: 10,
    color: COLOR.white,
    borderRadius: 10,
    fontSize: 18,
  },
});

export default Booking;

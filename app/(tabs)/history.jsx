import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ICON from '../../constants/Icons';
import COLOR from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { clearBooking } from '../../redux/slice/bookingSlice';
import NotLogin from './../../components/Login/NotLogin';

const history = () => {
  const { isLoggedIn, fullName, email, telp } = useSelector((state) => state.auth);
  const favorite = useSelector((state) => state.home.favorites);
  const booking = useSelector((state) => state.booking.booking);
  const dispatch = useDispatch();

  console.log(booking.map((item) => item.checkIn));

  return isLoggedIn ? (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View>
            <Image source={ICON.hacker} style={{ height: 50, width: 50, borderRadius: 10 }} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
              {fullName}
            </Text>
            <Text style={{ textAlign: 'center' }}>{email}</Text>
          </View>
        </View>
        <View style={styles.profileHistory}>
          <View style={{ textAlign: 'center' }}>
            <View>
              <Text>Bookings</Text>
            </View>
            <View>
              <Text style={{ color: '#32a852', fontWeight: 'bold', textAlign: 'center' }}>
                {booking.length}
              </Text>
            </View>
          </View>
          <View style={{ textAlign: 'center' }}>
            <View>
              <Text>Favorites</Text>
            </View>
            <View>
              <Text style={{ color: '#32a852', fontWeight: 'bold', textAlign: 'center' }}>
                {favorite.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ padding: 10, fontWeight: 'bold', textAlign: 'center' }}>
            List History Booking
          </Text>
          <TouchableOpacity onPress={() => dispatch(clearBooking())}>
            <Text
              style={{
                padding: 10,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
              }}
            >
              Hapus History
            </Text>
          </TouchableOpacity>
        </View>

        {booking.length < 1 ? (
          <View style={styles.listHistory}>
            <View style={{ alignItems: 'center' }}>
              <Text>No History</Text>
            </View>
          </View>
        ) : (
          booking.map((item, index) => (
            <View style={styles.listHistory} key={index}>
              <View style={styles.historyContainer}>
                <View>
                  <Image
                    source={{ uri: item.propertyGallery.images[0].image.url }}
                    style={{ height: 100, width: 330, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <View>
                    <Text>Nama : {item.summary.name}</Text>
                  </View>
                  <View>
                    <Text>Lokasi : {item.summary.location.address.addressLine}</Text>
                  </View>
                  <View>
                    <Text>Rating : {item.summary.overview.propertyRating.rating}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text>Check In</Text>
                      <Text>{booking.map((item) => item.checkIn)}</Text>
                    </View>
                    <View>
                      <Text>Check Out</Text>
                      <Text>{booking.map((item) => item.checkOut)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  ) : (
    <NotLogin />
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: COLOR.secondary,
    padding: 10,
    width: 200,
    borderRadius: 20,
  },

  container: {
    flex: 1,
    gap: 10,
  },

  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 26,
    gap: 20,
    margin: 16,
  },
  profileInfo: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileHistory: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  listHistory: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    gap: 20,
    marginStart: 16,
    marginEnd: 16,
  },
  historyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

export default history;

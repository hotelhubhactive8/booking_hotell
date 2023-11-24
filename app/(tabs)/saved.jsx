import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { removeFromFavorites } from '../../redux/slice/homeSlice';
import NotLogin from '../../components/Login/NotLogin';
import { Stack, useRouter } from 'expo-router';
import COLOR from '../../constants/Colors';

const Saved = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const home = useSelector((state) => state.home);

  const router = useRouter();

  return isLoggedIn ? (
    <ScrollView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLOR.primary },
          headerTitle: 'Saved',
          headerTitleStyle: { color: 'white' },
        }}
      />
      <View style={styles.container}>
        {home.favorites.length < 1 ? (
          <View style={{ alignItems: 'center', height: '80%', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/images/empty.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text style={{ fontSize: 20 }}>Nothing saved yet</Text>
          </View>
        ) : (
          home.favorites.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.push({
                  pathname: `details/${item.id}`,
                  params: item.id,
                });
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderWidth: 0.3,
                  borderColor: 'grey',
                  width: 350,
                }}
                key={index}
              >
                <View style={{ borderRadius: 20, display: 'flex', flex: 2 }}>
                  <Image
                    source={{ uri: item.propertyImage.image.url }}
                    style={{ width: 'auto', height: 100, borderRadius: 10, resizeMode: 'cover' }}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: 10,
                    flex: 3,
                  }}
                >
                  <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={styles.tag}>
                      Rating : <MaterialCommunityIcons name="star" color={'white'} size={16} />
                      {item.reviews.score}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{item.price.lead.formatted}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeFromFavorites(item.id));
                        console.log('ini hapus', item.id);
                      }}
                    >
                      <MaterialCommunityIcons name="heart" color="red" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  ) : (
    <NotLogin />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    gap: 20,
    alignItems: 'center',
    minHeight: Dimensions.get('screen').height - 140,
  },
  tag: {
    fontSize: 13,
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    width: 'max-content',
    alignSelf: 'flex-start',
    marginTop: 2,
  },
});
export default Saved;

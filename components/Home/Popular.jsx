import { Text, View, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { addToFavorites, removeFromFavorites, getHome } from '../../redux/slice/homeSlice';
import COLOR from './../../constants/Colors';

const ModalBox = ({ openModal, setOpenModal, setModalVisible, router }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => setModalVisible(!openModal)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setOpenModal(!openModal)}
            style={{ alignSelf: 'flex-end' }}
          >
            <MaterialCommunityIcons name="close" size={18} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/sad.png')}
            style={{ width: 70, height: 70 }}
          />
          <Text style={styles.modalText}>You need to login</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setOpenModal(!openModal);
              router.replace('login');
            }}
          >
            <Text style={styles.textStyle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Popular = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const home = useSelector((state) => state.home);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getHome());
  }, [dispatch]);

  return (
    <>
      <Text style={styles.title}>Top places</Text>
      <ModalBox
        openModal={openModal}
        setOpenModal={setOpenModal}
        setModalVisible={setOpenModal}
        router={router}
      />
      <View style={{ gap: 16 }}>
        {home.home.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.id);
              router.push({
                pathname: `details/${item.id}`,
                params: item.id,
              });
            }}
            style={styles.card}
            key={index}
          >
            <View style={{ borderRadius: 20 }}>
              <Image
                source={{ uri: item.propertyImage.image.url }}
                style={{ width: 'auto', height: 130, borderRadius: 10 }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={styles.tag}>
                  Rating : <MaterialCommunityIcons name="star" color={COLOR.secondary} size={16} />
                  <Text>{item.reviews.score}</Text>
                </Text>
              </View>
              {!isLoggedIn ? (
                <View style={styles.priceSave}>
                  <Text style={{ fontSize: 16 }}>{item.price.lead.formatted}</Text>
                  <TouchableOpacity onPress={() => setOpenModal(!openModal)}>
                    <MaterialCommunityIcons name="heart-outline" color="black" size={25} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.priceSave}>
                  <Text style={{ fontSize: 16 }}>{item.price.lead.formatted}</Text>
                  {home.favorites.find((favorite) => favorite.id === item.id) ? (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeFromFavorites(item.id));
                        console.log('ini hapus', item.id);
                      }}
                    >
                      <MaterialCommunityIcons name="heart" color="red" size={25} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addToFavorites(item));
                        console.log('ini tambah', item);
                      }}
                    >
                      <MaterialCommunityIcons name="heart-outline" color="black" size={25} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F4F9F9',
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: COLOR.primary,
    padding: 10,
  },
  priceSave: {
    flex: 2,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 3,
    marginBottom: 5,
    textTransform: 'capitalize',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
    backgroundColor: COLOR.primary,
  },
  textStyle: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Popular;

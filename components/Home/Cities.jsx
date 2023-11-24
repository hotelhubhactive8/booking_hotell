import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCity } from './../../redux/slice/homeSlice';
import COLOR from './../../constants/Colors';

const Cities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCity());
  }, [dispatch]);

  const { city, loading } = useSelector((state) => state.home);

  const renderCities = () => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return city.map((item) => (
      <Text key={item.index} style={styles.regionName}>
        {item.regionNames.shortName}
      </Text>
    ));
  };

  return (
    <View>
      <Text style={styles.title}>Indonesian Cities</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {renderCities()}
      </View>
    </View>
  );
};

const styles = {
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 3,
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  regionName: {
    color: COLOR.white,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLOR.primary,
    width: '30%',
    textAlign: 'center',
  },
};

export default Cities;

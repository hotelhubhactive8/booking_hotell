import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import COLOR from '../../constants/Colors';
import { login } from '../../redux/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    setError('');
    console.log('ini state', email.email, password.password);
    console.log('ini redux', auth.email, auth.password);
    if (email.email === auth.email && password.password === auth.password) {
      console.log('masuk');
      dispatch(login());
      router.back();
      return;
    }
    console.log('gagal');
    setError('Email atau password anda salah.');
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SafeAreaView style={style.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLOR.white },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View
        style={{
          backgroundColor: '#ffffff',
          padding: 30,
          borderRadius: 20,
          gap: 20,
          width: '90%',
        }}
      >
        <View>
          <Image
            source={require('../../assets/images/welcome.png')}
            style={{ width: '100%', height: 200 }}
          />
          <Text
            style={[
              {
                fontSize: 30,
                marginBottom: 10,
                textAlign: 'center',
                fontWeight: 'bold',
              },
            ]}
          >
            Login
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Email</Text>
          <TextInput
            style={style.input}
            name="email"
            onChangeText={(email) => {
              setError('');
              setEmail({ email });
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>Password</Text>
          <TextInput
            secureTextEntry={showPassword}
            style={style.input}
            name="password"
            onChangeText={(password) => {
              setError('');
              setPassword({ password });
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
          onPress={showPasswordHandler}
        >
          <MaterialCommunityIcons name={!showPassword ? 'eye-off' : 'eye'} size={20} />
          <Text>{!showPassword ? 'Hide Password' : 'Show Password'}</Text>
        </TouchableOpacity>
        {error && (
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
            }}
          >
            {error}
          </Text>
        )}
        <View>
          <TouchableOpacity
            style={style.btnPrimary}
            onPress={() => {
              handleLogin();
            }}
          >
            <Text style={style.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnPrimary: {
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 20,
  },

  btnText: {
    color: '#ffffff',
    textAlign: 'center',

    fontSize: 16,
  },

  input: {
    borderBottomWidth: 0.6,
    fontSize: 16,
  },
});
export default Login;

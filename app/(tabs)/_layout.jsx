import { Tabs } from 'expo-router';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import COLOR from '../../constants/Colors';

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',

          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#003580" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="heart" size={24} color="#003580" />
            ) : (
              <AntDesign name="hearto" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          headerStyle: { backgroundColor: COLOR.primary },
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="notifications" size={24} color="#003580" />
            ) : (
              <Ionicons name="notifications-outline" size={24} color="black" />
            ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#003580" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          headerShown: false,
          href: null,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}

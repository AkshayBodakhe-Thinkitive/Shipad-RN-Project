import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import AntDesign from '@react-native-vector-icons/ant-design';
import SampleScreen from "../domain/auth/screens/SampleScreen";
import ProfileTab from '../domain/profile/Screens/ProfileTab';
import { FontType } from '../constants/FontType';
import MessageScreen from '../domain/Message/screens/MessageScreen'
import Users from '../domain/Message/screens/Users';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontFamily:FontType.Roboto_Bold
        },

        tabBarIcon: ({ focused }) => {
          let icon;

          if (route.name === 'Home') {
            icon = <Feather name="home" size={20} />;
          } else if (route.name === 'Vitals') {
            icon = <Feather name="heart" size={20} />;
          } else if (route.name === 'Chat') {
            icon = <Feather name="message-square" size={20} />;
          } else if (route.name === 'Education') {
            icon = <Feather name="book-open" size={20} />;
          } else if (route.name === 'Profile') {
            icon = <AntDesign name="setting" size={20} />;
          }

          return (
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
              {React.cloneElement(icon, {
                color: focused ? '#2F80ED' : '#555',
              })}
              <Text
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: focused ? '#2F80ED' : '#555',
                }}
              >
                {route.name === 'Profile' ? 'Settings' : route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={SampleScreen} />
      <Tab.Screen name="Vitals" component={SampleScreen} />
      <Tab.Screen name="Chat" component={Users} />
      <Tab.Screen name="Education" component={SampleScreen} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  tabBar: {
    height: 75,
    backgroundColor: 'white',
    borderTopWidth: 1,
    fontFamily:FontType.Roboto_Medium
  },


  activeTab: {
    backgroundColor: '#D6E6FF',
    marginTop:30,
    height:50,
    width:60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inactiveTab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    height:50,
    width:60,

  },
});
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import AntDesign from '@react-native-vector-icons/ant-design';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../store/storeConfig';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import {
  AppNavConstants,
  AuthNavConstants,
} from '../../../constants/NavConstants';
import { logoutAction } from '../../auth/store/async-actions/AuthAsyncActions';
import { FontType } from '../../../constants/FontType';

const ProfileTab = () => {
  const profile = useAppSelector(
    (state: RootState) => state?.profile?.profileData,
  );

  const handleViewProfileClick = () =>
    navigation.navigate(AppNavConstants.PROFILE_SCREEN);

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const navigation = useNavigation<any>();

  const logoutFunction = async () => {
    await dispatch(logoutAction());
    navigation.navigate(AuthNavConstants.LOGIN_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Account</Text>

      <View style={styles.profileCard}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>
            {profile.firstName + '  ' + profile.lastName}{' '}
            <Text style={styles.id}>(#345)</Text>
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{profile.gender}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.contactRow}>
          <View style={styles.horizontalView}>
            <Feather
              name="phone"
              size={16}
              color="#555"
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.contactText}>{profile.mobileNumber}</Text>
          </View>

          <View style={styles.horizontalView}>
            <Feather
              name="mail"
              size={16}
              color="#555"
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.contactText}>{profile.email}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.menuCard}>
        <TouchableOpacity
          onPress={handleViewProfileClick}
          style={styles.menuItem}
        >
          <View style={styles.iconCircle}>
            <Feather name="user" size={18} color="#2F80ED" />
          </View>
          <Text style={styles.menuText}>View Profile</Text>
          <AntDesign name="right" size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconCircle}>
            <Feather name="target" size={18} color="#2F80ED" />
          </View>
          <Text style={styles.menuText}>Change Password</Text>
          <AntDesign name="right" size={16} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{Alert.alert(
            'Logout',
            'You will need to log in again after logout.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: logoutFunction,
              },
            ],
            { cancelable: true },
          )}}
          style={styles.menuItem}
        >
          <View style={styles.iconCircle}>
            <Feather name="log-out" size={18} color="#2F80ED" />
          </View>
          <Text style={styles.menuText}>Log Out</Text>
          <AntDesign name="right" size={16} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 6,
  },

  header: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    elevation: 2,
    fontFamily:FontType.Roboto_Medium
  },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 16,
    elevation: 2,
  },

  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily:FontType.Roboto_Medium
  },

  id: {
    color: '#777',
    fontWeight: '400',
    fontFamily:FontType.Roboto_Medium
  },

  badge: {
    backgroundColor: '#E6E0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: '#6C5CE7',
    fontSize: 12,
    fontWeight: '500',
    fontFamily:FontType.Roboto_Medium
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },

  contactRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  contactText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
    fontFamily:FontType.Roboto_Medium
  },

  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    color: '#888',
    fontWeight: '500',
    fontFamily:FontType.Roboto_Medium
  },

  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    fontSize: 15,
    fontFamily:FontType.Roboto_Medium
  },
});

import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../../store/storeConfig';
import { useAppSelector } from '../../../store/hooks';
import { AppNavConstants } from '../../../constants/NavConstants';
import Button from '../../../components/Button';
import { Colors } from '../../../constants/ColorConstants';
import { imagePaths } from '../../../constants/imagePaths';
import { firstLetterCapitalize, formatDateTime } from '../../../utils/helperUtils';
import { FontType } from '../../../constants/FontType';

const ProfileScreen = () => {
  const profile = useAppSelector(
    (state: RootState) => state?.profile?.profileData,
  );

  const fullAddress = [
    profile?.address?.line1,
    profile?.address?.line2,
    profile?.address?.city,
    profile?.address?.state,
    profile?.address?.zipcode,
  ].filter(Boolean)
    .join(', ');

  const editProfileClick = () =>
    navigation.navigate(AppNavConstants.EDIT_PROFILE);

  const [imageLoading, setImageLoading] = React.useState(true);

  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {imageLoading && <ActivityIndicator size="large" color="white" />}

          <Image
            source={{
              uri:
                profile?.nurseAvatar != null
                  ? profile.nurseAvatar
                  : imagePaths.NO_PROFILE,
            }}
            style={styles.profileImage}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>

        <View style={styles.detailsContainer}>
          <LabelValue
            label="Name"
            value={profile.firstName + ' ' + profile.lastName}
          />
          <LabelValue label="Email" value={profile.email} />
          <LabelValue label="Date" value={formatDateTime(profile.birthDate)} />
          <LabelValue
            label="Gender"
            value={firstLetterCapitalize(profile.gender)}
          />
          <LabelValue label="Phone Number" value={profile.mobileNumber} />

          <Text style={styles.sectionTitle}>Address</Text>

          <LabelValue value={fullAddress} />

          <Text style={styles.sectionTitle}>Emergency Details</Text>

          <LabelValue label="Name" value={profile.lastName} />
          <LabelValue label="Phone Number" value="(+33) 505 - 0124" />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button
          text="Edit Profile"
          onPress={editProfileClick}
          icon={<Feather name="edit-2" size={18} color="white" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const LabelValue = ({ label, value }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  backButton: {
    marginLeft: 16,
    marginTop: 10,
  },

  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  detailsContainer: {
    paddingHorizontal: 20,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    color: '#7A7A7A',
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    fontFamily: FontType.Roboto_Medium,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E7490',
    marginTop: 10,
    marginBottom: 15,
    fontFamily: FontType.Roboto_Medium,
  },

  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
  },

  addressCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },

  addressLine: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    fontFamily: FontType.Roboto_Medium,
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
    paddingVertical: 14,
    borderRadius: 12,
  },

  editText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    fontFamily: FontType.Roboto_Medium,
  },
});

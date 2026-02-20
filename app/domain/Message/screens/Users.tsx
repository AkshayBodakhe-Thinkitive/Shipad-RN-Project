import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavConstants } from '../../../constants/NavConstants';

type User = {
  id: string;
  name: string;
  lastMessage: string;
};

const Users = ({ navigation }: any) => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Atif',
      lastMessage: 'Hey bro, kya kar raha hai?',
    },
    {
      id: '2',
      name: 'Rahul',
      lastMessage: 'Kal milte hai office me. Bhai msg ko bada banan pdega taki number of lines bhi check ho sake',
    },
  ]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userRow}
      onPress={() =>
        navigation.navigate(AppNavConstants.MESSAGE_SCREEN, {
          receiverId: item.name,
        })
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Chats</Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    padding: 15,
    backgroundColor: '#075E54',
    color: '#fff',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  userInfo: {
    flex: 1,
  },

  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  lastMessage: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io, Socket } from 'socket.io-client';

type Message = {
  sender: string;
  text: string;
};

const ChatScreen = () => {
  const socketRef = useRef<Socket | null>(null);

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const senderId = 'user2';
  const receiverId = 'user1';

  const isReceiverOnline = onlineUsers.includes(receiverId);

  useEffect(() => {
    socketRef.current = io('http://192.168.10.228:5000', {
      transports: ['websocket'],
    });

    socketRef.current.emit('register', senderId);

    socketRef.current.on('receive_message', (data: any) => {
      setMessages(prev => [
        ...prev,
        { sender: data.senderId, text: data.message },
      ]);
    });

    socketRef.current.on('online_users', (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socketRef.current?.emit('send_message', {
      senderId,
      receiverId,
      message,
    });

    setMessages(prev => [...prev, { sender: senderId, text: message }]);

    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.username}>{receiverId}</Text>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isReceiverOnline ? '#4CAF50' : '#777' },
              ]}
            />
            <Text style={styles.statusText}>
              {isReceiverOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.sender === senderId
                  ? styles.myMessage
                  : styles.otherMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === senderId && { color: '#fff' },
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    alignItems:'center',    
  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121111',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    color: '#221e1e',
    fontSize: 13,
  },


  messageBubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 15,
    maxWidth: '75%',
  },

  myMessage: {
    backgroundColor: '#1E88E5',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },

  otherMessage: {
    backgroundColor: '#41596e',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },

  messageText: {
    color: '#ddd',
    fontSize: 15,
  },


  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#222',
  },

  input: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: '#fff',
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
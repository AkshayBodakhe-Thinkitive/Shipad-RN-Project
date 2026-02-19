import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { io } from 'socket.io-client';

const socket = io("http://192.168.10.228:5000", {
  transports: ["websocket"],
  autoConnect: true,
});

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const senderId = 'user1';
  const receiverId = 'user2';

  useEffect(() => {
    socket.emit('register', senderId);

    socket.on('receive_message', (data) => {
      setMessages((prev) => [
        ...prev,
        { sender: data.senderId, text: data.message },
      ]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    socket.emit('send_message', {
      senderId,
      receiverId,
      message,
    });

    setMessages((prev) => [
      ...prev,
      { sender: senderId, text: message },
    ]);

    setMessage('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBox,
              item.sender === senderId
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type message..."
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageBox: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginLeft: 5,
    borderRadius: 8,
  },
});
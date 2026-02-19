import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io, Socket } from 'socket.io-client';

type Message = {
  sender: string;
  text: string;
  time: string;
  status?: 'sent' | 'seen';
};

const ChatScreen = () => {
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const senderId = 'Shripad';
  const receiverId = 'Atif';

  const isReceiverOnline = onlineUsers.includes(receiverId);

  useEffect(() => {
    socketRef.current = io('http://192.168.10.228:5000', {
      transports: ['websocket'],
    });

    socketRef.current.emit('register', senderId);

    socketRef.current.on('receive_message', (data: any) => {
      const newMsg: Message = {
        sender: data.senderId,
        text: data.message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages(prev => [...prev, newMsg]);
    });

    socketRef.current.on('online_users', (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  
    useEffect(() => {
      if (messages.length > 0) {
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      sender: senderId,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: isReceiverOnline ? 'seen' : 'sent',
    };

    socketRef.current?.emit('send_message', {
      senderId,
      receiverId,
      message,
    });

    setMessages(prev => [...prev, newMsg]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* HEADER */}
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

          {/* CHAT LIST */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              paddingVertical: 10,
            }}
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

                <View style={styles.metaRow}>
                  <Text style={styles.timeText}>{item.time}</Text>

                  {item.sender === senderId && (
                    <Text
                      style={[
                        styles.tick,
                        {
                          color: item.status === 'seen' ? '#ffffff' : '#ffffff',
                        },
                      ]}
                    >
                      ✓
                    </Text>
                  )}
                </View>
              </View>
            )}
          />

          {/* INPUT */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#777"
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomColor: '#0a0a0a',
    alignItems: 'center',
  },

  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#292525',
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
    color: '#181616',
    fontSize: 13,
  },

  messageBubble: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    maxWidth: '75%',
  },

  myMessage: {
    backgroundColor: '#2563EB',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },

  otherMessage: {
    backgroundColor: '#1F2937',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },

  messageText: {
    color: '#E5E7EB',
    fontSize: 18,
  },

  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },

  timeText: {
    fontSize: 15,
    color: '#fff',
    marginRight: 4,
  },

  tick: {
    fontSize: 11,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: '#1b1919',
    marginRight: 10,
    borderWidth: 1,
  },

  sendButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});

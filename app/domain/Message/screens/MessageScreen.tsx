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
import { useRoute, RouteProp } from '@react-navigation/native';
import BackButton from '../../../components/backButton/BackButton';
import { localChats } from '../components/LocalChats';

type ChatScreenRouteParams = {
  receiverId: string;
};

type Message = {
  id: string;
  sender: string;
  text: string;
  date: string;
  status?: 'sent' | 'seen';
};

const ChatScreen = () => {
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const route =
    useRoute<RouteProp<{ params: ChatScreenRouteParams }, 'params'>>();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const senderId = 'Shripad';
  const receiverId = route?.params?.receiverId || 'Atif';

  const isReceiverOnline = onlineUsers.includes(receiverId);

  // ---------------- SOCKET CONNECTION ----------------
  useEffect(() => {
    socketRef.current = io('http://192.168.10.228:5000', {
      transports: ['websocket'],
    });

    socketRef.current.emit('register', senderId);

    socketRef.current.on('receive_message', (data: any) => {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: data.senderId,
        text: data.message,
        date: new Date().toISOString(),
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

  // ---------------- LOAD LOCAL CHAT ----------------
  useEffect(() => {
    const chat = localChats.find(c => c.userId === receiverId);
    if (chat) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  }, [receiverId]);

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // ---------------- SEND MESSAGE ----------------
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: senderId,
      text: message,
      date: new Date().toISOString(),
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

  // ---------------- DATE FORMATTER ----------------
  const formatDayLabel = (dateString: string) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toDateString();
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
            <BackButton color="white" />

            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {receiverId.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View>
                <Text style={styles.username}>{receiverId}</Text>
                <Text style={styles.statusText}>
                  {isReceiverOnline ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>

          {/* CHAT LIST */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            renderItem={({ item, index }) => {
              const isMe = item.sender === senderId;

              const currentDate = new Date(item.date).toDateString();
              const prevDate =
                index > 0
                  ? new Date(messages[index - 1].date).toDateString()
                  : null;

              const showDateSeparator = currentDate !== prevDate;

              return (
                <>
                  {showDateSeparator && (
                    <View style={styles.dateSeparator}>
                      <Text style={styles.dateSeparatorText}>
                        {formatDayLabel(item.date)}
                      </Text>
                    </View>
                  )}

                  <View
                    style={[
                      styles.messageRow,
                      isMe ? styles.myRow : styles.otherRow,
                    ]}
                  >
                    <View
                      style={[
                        styles.bubble,
                        isMe ? styles.myBubble : styles.otherBubble,
                      ]}
                    >
                      <Text style={styles.messageText}>{item.text}</Text>

                      <View style={styles.metaContainer}>
                        <Text style={styles.timeText}>
                          {new Date(item.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              );
            }}
          />

          {/* INPUT BAR */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Message"
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>➤</Text>
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
    backgroundColor: '#e5ddd5', // WhatsApp bg color
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#075E54',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
  },

  backButton: {
    paddingRight: 10,
  },

  backArrow: {
    fontSize: 22,
    color: '#fff',
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  dateSeparator: {
    alignSelf: 'center',
    backgroundColor: '#DCF8C6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginVertical: 10,
  },

  dateSeparatorText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },

  statusText: {
    color: '#e0e0e0',
    fontSize: 12,
    marginTop: 2,
  },

  messageRow: {
    marginVertical: 4,
    flexDirection: 'row',
  },

  myRow: {
    justifyContent: 'flex-end',
  },

  otherRow: {
    justifyContent: 'flex-start',
  },

  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 12,
  },

  myBubble: {
    backgroundColor: '#DCF8C6',
    borderTopRightRadius: 0,
  },

  otherBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 0,
  },

  messageText: {
    fontSize: 16,
  },

  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 5,
  },

  timeText: {
    fontSize: 11,
    color: '#555',
    marginRight: 4,
  },

  tick: {
    fontSize: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f0f0f0',
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },

  sendButton: {
    marginLeft: 8,
    backgroundColor: '#075E54',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendText: {
    color: '#fff',
    fontSize: 18,
  },
});

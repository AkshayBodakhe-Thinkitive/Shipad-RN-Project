import { io, Socket } from 'socket.io-client';
import { Message } from '../../interfaces/MessageInterfaces';

// ---------------- SEND MESSAGE ----------------
export const sendMessage = ({
  message,
  senderId,
  isReceiverOnline,
  socketRef,
  receiverId,
  setMessages,
  setMessage,
}: props) => {
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
export const formatDayLabel = (dateString: string) => {
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

interface props {
  message: string;
  senderId: string;
  isReceiverOnline: boolean;
  socketRef: React.RefObject<Socket | null>;
  receiverId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

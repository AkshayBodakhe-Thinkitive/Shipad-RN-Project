import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../interfaces/MessageInterfaces';

interface UseSocketProps {
  socketRef: React.MutableRefObject<Socket | null>;
  IP: string;
  senderId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useSocketConnection = ({
  socketRef,
  IP,
  senderId,
  setMessages,
  setOnlineUsers,
}: UseSocketProps) => {
  useEffect(() => {
    socketRef.current = io(`http://${IP}`, {
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
};
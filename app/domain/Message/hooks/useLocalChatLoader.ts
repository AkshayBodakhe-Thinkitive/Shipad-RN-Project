import { useEffect } from 'react';
import { localChats } from '../components/LocalChats';
import { Message } from '../interfaces/MessageInterfaces';

interface UseLocalChatLoaderProps {
  receiverId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const useLocalChatLoader = ({
  receiverId,
  setMessages,
}: UseLocalChatLoaderProps) => {
  useEffect(() => {
    const chat = localChats.find(c => c.userId === receiverId);

    if (chat) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  }, [receiverId]);
};
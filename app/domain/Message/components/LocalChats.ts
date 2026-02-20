export type LocalMessage = {
  id: string;
  sender: string;
  text: string;
  date: string; 
};

export type LocalChat = {
  userId: string;
  messages: LocalMessage[];
};

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const threeDaysBefore = new Date();
threeDaysBefore.setDate(today.getDate() - 3);

export const localChats: LocalChat[] = [
  {
    userId: 'Atif',
    messages: [
      {
        id: '1',
        sender: 'Atif',
        text: 'Bro project ka kya scene hai?',
        date: threeDaysBefore.toISOString(),
      },
      {
        id: '2',
        sender: 'Shripad',
        text: 'Working on UI part.',
        date: threeDaysBefore.toISOString(),
      },

      {
        id: '3',
        sender: 'Atif',
        text: 'Kal meeting hai yaad hai?',
        date: yesterday.toISOString(),
      },
      {
        id: '4',
        sender: 'Shripad',
        text: 'Haan bhai 11 baje.',
        date: yesterday.toISOString(),
      },

      {
        id: '5',
        sender: 'Atif',
        text: 'Online hai?',
        date: today.toISOString(),
      },
      {
        id: '6',
        sender: 'Shripad',
        text: 'Haan bolo.',
        date: today.toISOString(),
      },
    ],
  },
];
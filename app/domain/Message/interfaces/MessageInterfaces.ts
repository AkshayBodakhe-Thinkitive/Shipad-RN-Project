export type ChatScreenRouteParams = {
  receiverId: string;
};

export type Message = {
  id: string;
  sender: string;
  text: string;
  date: string;
  status?: 'sent' | 'seen';
};
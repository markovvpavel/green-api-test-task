export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type StateInstance =
  | "authorized"
  | "notAuthorized"
  | "blocked"
  | "sleepMode"
  | "starting"
  | "yellowCard";

export type Chat = {
  phoneNumber: string;
  id: string;
  messages: Message[];
};

export type Message = {
  chatId: string;
  text: string;
  type: "outgoing" | "incoming";
  timestamp: number;
};

// export type ChatMessage = {
//   messageText: string;
//   type: "outgoing" | "incoming";
//   timestamp: number;
// };

export type NotificationIncomingMessageReceived = {
  idMessage: string;
  instanceData: {
    idInstance: number;
    typeInstance: "whatsapp";
    wid: string;
  };
  messageData: {
    textMessageData: { textMessage: string };
    typeMessage: "textMessage";
  };
  senderData: {
    chatId: string;
    chatName: string;
    sender: string;
    senderContactName: string;
    senderName: string;
  };
  timestamp: 1738486134;
  typeWebhook: "incomingMessageReceived";
};

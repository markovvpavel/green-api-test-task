import { useAppDispatch } from "@/app/store";
import { ChatArea } from "@/components/Chats/ChatArea/ChatArea";
import { Sidebar } from "@/components/Chats/Sidebar/Sidebar";
import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { addMessage } from "@/slices/chats";
import { Message, NotificationIncomingMessageReceived } from "@/types";
import { handleError } from "@/utils/handleError";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import api from "@/app/api";

export const ChatsPage = () => {
  const dispatch = useAppDispatch();
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    const watcher = async () => {
      if (isRequestInProgress.current) return;

      isRequestInProgress.current = true;

      try {
        const idInstance = Cookies.get(COOKIE_KEYS.ID_INSTANCE);
        const apiTokenInstance = Cookies.get(COOKIE_KEYS.API_TOKEN_INSTANCE);

        if (!idInstance || !apiTokenInstance) return;

        let webhookBody: NotificationIncomingMessageReceived;
        let response;

        response = await api.receiveNotification({
          apiTokenInstance,
          idInstance,
        });

        if (response.data === null) return;

        const receiptId = response.data.receiptId;

        if (response.data.body.typeWebhook === "incomingMessageReceived") {
          webhookBody = response.data
            .body as NotificationIncomingMessageReceived;

          const { messageData, timestamp } = webhookBody;
          const { textMessage } = messageData.textMessageData;

          const newMessage: Message = {
            chatId: webhookBody.senderData.chatId,
            text: textMessage,
            timestamp,
            type: "incoming",
          };

          console.log(newMessage);

          dispatch(addMessage(newMessage));
        }

        response = await api.deleteNotification({
          apiTokenInstance,
          idInstance,
          receiptId,
        });
      } catch (error) {
        handleError(error);
      } finally {
        isRequestInProgress.current = false;
      }
    };

    const interval = setInterval(watcher, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, isRequestInProgress]);

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full md:w-1/2 lg:w-[520px] py-8 px-16">
        <Sidebar />
      </div>
      <div className="h-full hidden md:w-1/2 md:block lg:w-[calc(100%-520px)] bg-[#E8ECEF]">
        <ChatArea />
      </div>
    </div>
  );
};

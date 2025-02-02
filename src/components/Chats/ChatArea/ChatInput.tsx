import { COOKIE_KEYS } from "@/constants/cookieConstants";
import { useAppDispatch } from "@/app/store";
import { useCallback, useState } from "react";
import { handleError } from "@/utils/handleError";
import { addMessage } from "@/slices/chats";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { InputChangeEvent, Message } from "@/types";
import { useKeyDown } from "@/hooks/useKeyDown";
import { createTimestamp } from "@/utils/createTimestamp";
import Cookies from "js-cookie";
import api from "@/app/api";
import { useActiveChat } from "@/hooks/useActiveChat";

export const ChatInput = () => {
  const activeChat = useActiveChat();
  const dispatch = useAppDispatch();

  const [messageText, setMessageText] = useState("");
  const handleChange = useCallback(
    (e: InputChangeEvent) => setMessageText(e.target.value),
    []
  );

  const sendMessage = useCallback(async () => {
    try {
      const idInstance = Cookies.get(COOKIE_KEYS.ID_INSTANCE);
      const apiTokenInstance = Cookies.get(COOKIE_KEYS.API_TOKEN_INSTANCE);

      if (!idInstance || !apiTokenInstance || !activeChat || !messageText)
        return;

      const response = await api.sendMessage({
        apiTokenInstance,
        idInstance,
        data: { chatId: activeChat.id, message: messageText },
      });

      if (response.status !== 200) return;

      const newMessage: Message = {
        chatId: activeChat.id,
        text: messageText,
        timestamp: createTimestamp(),
        type: "outgoing",
      };

      dispatch(addMessage(newMessage));
      setMessageText("");
    } catch (error) {
      handleError(error);
    }
  }, [messageText, activeChat, dispatch]);

  useKeyDown("Enter", sendMessage);

  return (
    <footer className="w-full flex bg-white pt-[20px] pb-[32px] px-[32px] gap-x-[32px]">
      <Input
        className="w-full"
        name="messageText"
        onChange={handleChange}
        placeholder="Введите сообщение..."
        type="text"
        value={messageText}
      />
      <Button onClick={sendMessage}>Отправить</Button>
    </footer>
  );
};

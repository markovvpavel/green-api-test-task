import { setActiveChatId } from "@/slices/chats";
import { useAppDispatch } from "@/app/store";
import { useKeyDown } from "@/hooks/useKeyDown";
import { useCallback } from "react";
import { EmptyChatPlaceholder } from "./EmptyChatPlaceholder";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { MessageHistory } from "./MessageHistory/MessageHistory";
import { useActiveChat } from "@/hooks/useActiveChat";

export const ChatArea = () => {
  const dispatch = useAppDispatch();
  const closeChat = useCallback(() => dispatch(setActiveChatId(null)), [dispatch]);
  useKeyDown("Escape", closeChat);

  const activeChat = useActiveChat();

  if (!activeChat) return <EmptyChatPlaceholder />;

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <ChatHeader />
      <MessageHistory />
      <ChatInput />
    </div>
  );
};

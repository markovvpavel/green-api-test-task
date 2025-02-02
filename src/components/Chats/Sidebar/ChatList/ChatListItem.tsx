import { Chat, Message } from "@/types";
import { useAppDispatch } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import { parseTimestamp } from "@/utils/parseTimestamp";
import { useActiveChat } from "@/hooks/useActiveChat";
import { setActiveChatId } from "@/slices/chats";
import clsx from "clsx";

type Props = { chat: Chat; isLast: boolean };

export const ChatListItem = ({ chat, isLast }: Props) => {
  const dispatch = useAppDispatch();
  const activeChat = useActiveChat();

  const handleClick = useCallback(() => {
    if (chat.id === activeChat?.id) return;
    dispatch(setActiveChatId(chat.id));
  }, [chat, activeChat, dispatch]);

  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  useEffect(() => {
    const lastIndex = chat.messages.length - 1;
    const lastMessage = chat.messages[lastIndex];
    if (!lastMessage) return;
    setLastMessage(lastMessage);
  }, [chat]);

  return (
    <div
      className={clsx(
        "h-[72px] w-full flex cursor-pointer select-none",
        !isLast && "border-b border-white",
        activeChat?.id === chat.id
          ? "bg-black text-white"
          : "hover:bg-black hover:text-white"
      )}
      onClick={handleClick}
    >
      <div className="h-full w-[66px] flex justify-center items-center">
        <div className="w-[49px] aspect-square rounded-full bg-white flex justify-center items-center">
          <span className="!text-black">?</span>
        </div>
      </div>

      <div className="w-[calc(100%-66px)] flex flex-col justify-center pr-[15px]">
        <div className="w-full flex justify-between items-center">
          <span className="text-[18px] font-medium">+{chat.phoneNumber}</span>
          <span>
            {lastMessage?.timestamp
              ? parseTimestamp(lastMessage?.timestamp)
              : ""}
          </span>
        </div>
        <div className="w-full flex gap-x-[15px]">
          <p className="truncate w-full">{lastMessage?.text}</p>
          {lastMessage && (
            <div className="h-full aspect-square rounded-full bg-[#61C554] flex justify-center items-center">
              <span className="text-white">?</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

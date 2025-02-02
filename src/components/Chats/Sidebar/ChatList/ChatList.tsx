import { useAppSelector } from "@/app/store";
import { ChatListItem } from "./ChatListItem";

export const ChatList = () => {
  const { chats } = useAppSelector((s) => s.chats);

  return (
    <div className="flex-1 w-full overflow-y-scroll bg-[#F2F3F5] rounded-[6px]">
      {chats.map((chat, i, arr) => (
        <ChatListItem isLast={i < arr.length - 1} chat={chat} key={i} />
      ))}
    </div>
  );
};

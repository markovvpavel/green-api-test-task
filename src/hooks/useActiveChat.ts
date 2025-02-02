import { useAppSelector } from "@/app/store";

export const useActiveChat = () => {
  const { chats, activeChatId } = useAppSelector((s) => s.chats);
  return chats.find(({ id }) => id === activeChatId) || null;
};

import { MessageBubble } from "@/components/Chats/ChatArea/MessageHistory/MessageBubble";
import { useActiveChat } from "@/hooks/useActiveChat";

export const MessageHistory = () => {
  const activeChat = useActiveChat();

  return (
    <div
      className="flex-1 overflow-y-scroll py-[8px]"
      ref={(node) => node?.scrollTo({ top: node.offsetHeight })}
    >
      {activeChat?.messages.map((message, i) => (
        <MessageBubble message={message} key={i} />
      ))}
    </div>
  );
};

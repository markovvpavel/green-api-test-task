import { ChatList } from "./ChatList/ChatList";
import { NewChatForm } from "./NewChatForm";
import { Logout } from "./Logout";

export const Sidebar = () => {
  return (
    <aside className="h-full w-full flex flex-col justify-between space-y-[20px]">
      <NewChatForm />
      <ChatList />
      <Logout />
    </aside>
  );
};

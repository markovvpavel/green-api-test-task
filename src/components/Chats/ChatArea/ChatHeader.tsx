import { useActiveChat } from "@/hooks/useActiveChat";

export const ChatHeader = () => {
  const activeChat = useActiveChat();

  return (
    <header className="bg-[#61C554] pt-[32px] pb-[20px]">
      <div className="h-fit w-full flex items-center">
        <div className="h-full flex items-center px-[15px]">
          <div className="w-[49px] aspect-square rounded-full bg-white flex justify-center items-center">
            <span className="!text-black">?</span>
          </div>
        </div>
        {activeChat && (
          <span className="text-[18px] font-medium text-white">
            +{activeChat.phoneNumber}
          </span>
        )}
      </div>
    </header>
  );
};

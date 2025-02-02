import { Message } from "@/types";
import { parseTimestamp } from "@/utils/parseTimestamp";
import clsx from "clsx";

type Props = { message: Message };

export const MessageBubble = ({ message }: Props) => {
  return (
    <div
      className={clsx(
        "w-full flex px-[63px] py-[8px]",
        message.type === "incoming" && "justify-start",
        message.type === "outgoing" && "justify-end"
      )}
    >
      <div
        className={clsx(
          "max-w-[50%] w-fit p-[10px] rounded-[6px]",
          message.type === "outgoing" && "bg-[#61C554] text-white",
          message.type === "incoming" && "bg-white text-black"
        )}
      >
        <p
          className={clsx(
            "text-left break-words pb-[8px]",
            message.text.length <= 34 && "pr-[66.66px]"
          )}
        >
          {message.text}
        </p>

        <p className="relative float-right ml-[4px] mb-[-5px] mt-[-10px] text-[12px]">
          {parseTimestamp(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

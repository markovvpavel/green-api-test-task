import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { addChat } from "@/slices/chats";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const NewChatForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { chats } = useAppSelector((s) => s.chats);
  const dispatch = useAppDispatch();

  const handleAdd = useCallback(async () => {
    if (!phoneNumber) {
      toast.error(`Введите номер телефона`);
      return;
    }

    if (chats.find((x) => x.phoneNumber === phoneNumber)) {
      toast.error(`Номер уже добавлен`);
      return;
    }

    dispatch(addChat({ id: `${phoneNumber}@c.us`, messages: [], phoneNumber }));
    setPhoneNumber("");
  }, [chats, phoneNumber, dispatch]);

  return (
    <>
      <div className="flex flex-col w-full">
        <label className="mb-[8px] text-[14px]" htmlFor="phoneNumber">
          Номер Телефона:
        </label>
        <Input
          className="appearance-none"
          name="phoneNumber"
          placeholder="79521239596"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <Button theme="outline" onClick={handleAdd}>
        Добавить +
      </Button>
    </>
  );
};

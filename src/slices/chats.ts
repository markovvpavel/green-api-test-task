import { Chat, Message } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  chats: Chat[];
  activeChatId: string | null;
}

const initialState: State = {
  chats: [],
  activeChatId: null,
};

const slice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state: State, { payload }: PayloadAction<Chat>) => {
      state.chats = [...state.chats, payload];
    },

    addMessage: (state: State, { payload }: PayloadAction<Message>) => {
      state.chats = state.chats.map((chat) =>
        chat.id === payload.chatId
          ? { ...chat, messages: [...chat.messages, payload] }
          : chat
      );
    },

    setActiveChatId: (
      state: State,
      { payload }: PayloadAction<string | null>
    ) => {
      state.activeChatId = payload;
    },
  },
});

export const { addChat, addMessage, setActiveChatId } = slice.actions;

export default slice.reducer;

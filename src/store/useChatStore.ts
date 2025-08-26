import { create } from "zustand";

interface ChatState {
  isUnread: boolean;
  setUnread: (unread: boolean) => void;
}
export const useChatStore = create<ChatState>((set) => ({
  isUnread: false,
  setUnread: (unread) => set({ isUnread: unread }),
}));

import { create } from "zustand";

export const useChatStore = create((set) => ({
  isUnread: false,
  setUnread: (unread) => set({ isUnread: unread }),
}));

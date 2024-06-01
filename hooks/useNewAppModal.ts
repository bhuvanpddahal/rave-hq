import { create } from "zustand";

interface useNewAppModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useNewAppModal = create<useNewAppModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));
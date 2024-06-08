import { create } from "zustand";

interface useApiKeyHelpModalState {
    isOpen: boolean;
    appId: string;
    open: () => void;
    close: () => void;
    setAppId: (id: string) => void;
}

export const useApiKeyHelpModal = create<useApiKeyHelpModalState>((set) => ({
    isOpen: false,
    appId: "",
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setAppId: (id) => set({ appId: id })
}));
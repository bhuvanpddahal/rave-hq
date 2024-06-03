import { create } from "zustand";

interface useApiKeyModalState {
    isOpen: boolean;
    apiKey: string;
    open: () => void;
    close: () => void;
    setApiKey: (key: string) => void;
}

export const useApiKeyModal = create<useApiKeyModalState>((set) => ({
    isOpen: false,
    apiKey: "",
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setApiKey: (key) => set({ apiKey: key })
}));
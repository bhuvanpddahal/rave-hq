import { create } from "zustand";

interface useNewTestimonialModalState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useNewTestimonialModal = create<useNewTestimonialModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));
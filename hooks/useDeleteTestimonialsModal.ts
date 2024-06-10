import { create } from "zustand";

interface Testimonial {
    id: string;
    rating: number;
    email: string;
    feedback: string;
}

interface useDeleteTestimonialsModalState {
    isOpen: boolean;
    testimonials: Testimonial[];
    open: () => void;
    close: () => void;
    setTestimonials: (testimonials: Testimonial[]) => void;
}

export const useDeleteTestimonialsModal = create<useDeleteTestimonialsModalState>((set) => ({
    isOpen: false,
    testimonials: [],
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setTestimonials: (testimonials) => set({ testimonials })
}));
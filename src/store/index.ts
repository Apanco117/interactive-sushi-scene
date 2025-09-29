import type { ExperienceState, ResponsiveStore } from "@/types/threetypes";
import { create } from "zustand";


export const useResponsiveStore = create < ResponsiveStore > ((set) => ({
    isMobile: window.innerWidth < 768,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,

    updateDimensions: () =>
        set({
            isMobile: window.innerWidth < 768,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        }),
}));

export const useExperienceStore = create < ExperienceState > ((set) => ({
    isExperienceReady: false,
    setIsExperienceReady: () =>
    set({
        isExperienceReady: true,
    }),
    isWelcomeAnimationFinished: false,
    setIsWelcomeAnimationFinished: (isFinished) => set({ isWelcomeAnimationFinished: isFinished }),
}));
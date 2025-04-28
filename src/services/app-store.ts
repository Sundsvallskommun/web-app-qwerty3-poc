import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Data {
  isPWA: boolean;
}
interface Actions {
  setIsPWA: (isPWA: boolean) => void;
}

export const useAppStore = create(
  persist<Data & Actions>(
    (set) => ({
      isPWA: false,
      setIsPWA: (isPWA: boolean) => set({ isPWA }),
    }),
    { name: "Qwerty-app", storage: createJSONStorage(() => localStorage) }
  )
);

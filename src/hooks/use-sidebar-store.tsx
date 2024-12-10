import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SidebarStore = {
  position: 'top-right' | 'bottom-right' | 'navigation-bar' | 'hidden'
  setPosition: (
    position: 'top-right' | 'bottom-right' | 'navigation-bar' | 'hidden',
  ) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      position: 'top-right',
      setPosition: (position) => set({ position }),
    }),
    {
      name: 'sidebar-position',
    },
  ),
)

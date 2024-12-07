import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SidebarState {
  expanded: boolean
  expand: () => void
  collapse: () => void
}

const useSidebar = create<SidebarState>()(
  persist(set => ({
    expanded: true,
    expand: () => set({ expanded: true }),
    collapse: () => set({ expanded: false }),
  }), {
    name: 'sidebar',
    storage: createJSONStorage(() => localStorage),
  }),
)

export default useSidebar

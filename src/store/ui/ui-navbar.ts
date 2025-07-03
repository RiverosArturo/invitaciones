import { create } from 'zustand';

interface State {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
    closeDrawer: () => void;
}

export const useUiNavbar = create<State>()((set) => ({
    isDrawerOpen: false,
    
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    closeDrawer: () => set({ isDrawerOpen: false }),
}))

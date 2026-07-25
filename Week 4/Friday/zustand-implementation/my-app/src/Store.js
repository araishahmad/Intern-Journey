import { create } from 'zustand'

const createUserSlice = () => ({
  user: { name: 'Araish', role: 'Admin' },
})

const createThemeSlice = (set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
})

const createNotificationSlice = (set, user) => ({
  notifications: [{ id: 1, message: `Welcome ${user.name}` }],

  addNotification: (message) =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), message }],
    })),

  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
})

export const useStore = create((set) => {
  const userSlice = createUserSlice(set)

  return {
    ...userSlice,
    ...createThemeSlice(set),
    ...createNotificationSlice(set, userSlice.user),
  }
})
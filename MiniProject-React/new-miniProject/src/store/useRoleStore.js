import { create } from "zustand";

const useRoleStore = create((set) => ({
  userRole: "guest", // Default role
  setUserRole: (role) => set({ userRole: role }),
}));

export default useRoleStore;

// import { createContext, useState, useContext } from "react";

// // Create the User Context
// const UserContext = createContext();

// // Custom hook to use the User Context
// export const useUserContext = () => useContext(UserContext);

// // Provider Component
// export const UserProvider = ({ children }) => {
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

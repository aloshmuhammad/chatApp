import React, { createContext, useState } from "react";

const UserContext = createContext({ username: null, id: null });

const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

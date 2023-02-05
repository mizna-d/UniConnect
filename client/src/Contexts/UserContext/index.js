import React, { useState } from "react"

const UserContext = React.createContext(null)

export const UserContextProvider = ({ user, children }) => {
    const [currentUser, setCurrentUser] = useState(user);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext);
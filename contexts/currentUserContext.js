import React, {createContext, useState} from 'react'

export const CurrentUser = createContext()

export const CurrentUserContext = ({ children }) =>
{
    const [currentUser, setCurrentUser] = useState({
                                                    email: '',
                                                    first_name: '',
                                                    last_name: '',
                                                    avatar: ''
                                                    })

    return(
        <CurrentUser.Provider value = {[currentUser, setCurrentUser]}>
            {children}
        </CurrentUser.Provider>
    )
}
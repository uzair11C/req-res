import React, {useState, createContext, useEffect} from 'react'

export const AllUsers = createContext();

export const AllUsersContext = ({ children }) => 
{
    //const usersData = users.data

    const [users1, setUsers1] = useState([])
    const [users2, setUsers2] = useState([])

    const fetchAllUsers = async () =>
    {
        const res = await fetch('https://reqres.in/api/users?page=1')
        const users1 = await res.json()

        const res2 = await fetch('https://reqres.in/api/users?page=2')
        const users2 = await res2.json()

        setUsers1(users1.data)
        setUsers2(users2.data)
    }

    useEffect(
        () => {
        fetchAllUsers()
        }
        ,[])

    return (
        <AllUsers.Provider value={{value1:[users1, setUsers1], value2: [users2, setUsers2]}}>
            {children}
        </AllUsers.Provider>
    )
}
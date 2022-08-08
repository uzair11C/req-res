import * as actions from './types'
import axios from 'axios'

export const fetchUsers = () => dispatch =>
{
    axios.get('https://reqres.in/api/users?page=1')
        .then(res => res.json())
        .then(users1 => 
            dispatch ({
                type: actions.FETCH_USERS,
                payload: users1
            }))
}

// export const fetchUsersPage2 = () =>
// {
//     axios.get('https://reqres.in/api/users?page=2')
//         .then(res => res.json())
//         .then(users2 => {
//             return {
//                 type: actions.FETCH_USERS,
//                 payload: users2
//             }})
// }

// export const fetchUsers = async () =>
// {
//     const urls = ['https://reqres.in/api/users?page=1','https://reqres.in/api/users?page=2']

//     const ress = await Promise.all(urls.map((url) => (fetch(url))))
//     const users = await Promise.all(ress.map((res) => (res.json())))

//     return{
//         type: actions.FETCH_USERS,
//         payload: users
//     }

// }

// export const fetchUsers = () => dispatch =>
// {
//     const urls = ['https://reqres.in/api/users?page=1','https://reqres.in/api/users?page=2']

//     Promise.all(urls.map((url) => (axios.get(url)
//     .then(res => res.json())
//     .then(users => 
//         dispatch({
//             type: actions.FETCH_USERS,
//             payload: users
//         }
//     )))))
// }

export const fetchResources = async () =>
{
    const urls = ['https://reqres.in/api/unknown?page=1','https://reqres.in/api/unknown?page=2']

    const ress = await Promise.all(urls.map((url) => (fetch(url))))
    const resources = await Promise.all(ress.map((res) => (res.json())))

    return{
        type: actions.FETCH_RESOURCES,
        payload: resources
    }

}
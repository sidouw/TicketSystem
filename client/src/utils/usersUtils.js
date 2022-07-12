import axios from 'axios'
import cookies from 'js-cookie'

export const  getUsers = async ()=>{

    try {
        const users = await axios.get('/users',{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return users.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}

export const  getUserById = async (userId)=>{

    try {
        const user = await axios.get('/users/'+userId,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return user.data
    } catch (error) {
        console.log(error.response.data);
        return undefined
    }
}


export const  updateUsers = async (users)=>{

    try {
        const update = await axios.patch('/usersm',users,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}

export const  deleteUsers = async (users)=>{

    try {
        const update = await axios.delete('/usersm',{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
            },
            data: {
                ...users
            }
        }
        )
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}
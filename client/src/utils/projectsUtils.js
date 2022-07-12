import axios from 'axios'
import cookies from 'js-cookie'

export const  getProjectById = async projectId=>{

    try {
        const project = await axios.get('/projects/'+projectId,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return project.data
    } catch (error) {
        console.log(error.response.data);
        return {}
    }
}

export const  getProjectTickets = async projectId=>{

    try {
        const tickets = await axios.get('/tickets/project/'+projectId,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return tickets.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}

export const  updateProjectUsers = async (users)=>{

    try {
        const update = await axios.patch('/projectsU',users,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}

export const  deleteProjectUsers = async (users)=>{

    try {
        const update = await axios.delete('/projectsU',{
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

export const  editProject = async (data)=>{

    try {
        const update = await axios.patch('/projects',data,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}
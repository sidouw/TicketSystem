import axios from 'axios'
import cookies from 'js-cookie'



export const  getTicketById = async ticketId=>{

    try {
        const ticket = await axios.get('/tickets/'+ticketId,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return ticket.data
    } catch (error) {
        console.log(error.response.data);
        return {}
    }
}


export const  assignTicketsDeveloper = async (data)=>{

    try {
        const update = await axios.patch('/tickets/assign',data,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}

export const  EditTicket = async (data)=>{

    try {
        const update = await axios.patch('/tickets',data,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}
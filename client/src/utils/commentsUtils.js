import axios from 'axios'
import cookies from 'js-cookie'

export const addComment = async comment =>{

    try {
        const update = await axios.post('/comments', {
            ...comment
          },{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }}
        )
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
  }


export const deleteComment =async commentId => {
    try {
        const update = await axios.delete('/comments',{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
            },
            data: {
                _id:commentId
            }
        }
        )
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
  }

export const  getCommentsById = async (ticketId,skip=0,limit=10)=>{

    try {
        const comment = await axios.get(('/comments/'+ticketId+'?skip='+skip+'&limit='+limit),{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return comment.data
    } catch (error) {
        console.log(error.response.data);
        return {}
    }
}


export const  editComment = async (data)=>{

    try {
        const update = await axios.patch('/comments',data,{
            headers:{
            'Authorization':'Bearer '+cookies.get('token')
          }})
        return update.data
    } catch (error) {
        console.log(error.response.data);
        return []
    }
}
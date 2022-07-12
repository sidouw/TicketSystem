import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import cookies from 'js-cookie'


export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    loadingTickets : false,
    activeTicket :{},
    tickets: [],
  },
  reducers: {
    addTicket: (state, action) => {
      state.tickets = [...state.tickets,action.payload];
    },
    deleteTicket: (state, action) => {
        state.tickets = state.tickets.filter((ticket)=>ticket._id!==action.payload)
    },
    editTicket: (state, action) => {
        state.tickets = state.tickets.filter((ticket)=>ticket._id!==action.payload._id)
        state.tickets = [...state.tickets,action.payload];
    },
    setLoadingTickets: (state, action) => {
      state.loadingTickets = action.payload
    },
    setTickets: (state, action) => {
      state.tickets = [...action.payload]
    },
    setActiveTicket: (state, action) => {
      state.activeTicket = {...action.payload}
    },
    
  },
})

export const {setTickets, addTicket, deleteTicket, editTicket,setLoadingTickets,setActiveTicket } = ticketsSlice.actions;


// Thunks
export const addTicketAsync = ticket => dispatch => {

  dispatch(setLoadingTickets(true))
  console.log(ticket);
  axios.post('/tickets', {
    ...ticket
  },{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }}
  )
  .then(function (response) {
    dispatch(setLoadingTickets(false))
    console.log(response.data);
    dispatch(addTicket({...response.data}))
  })
  .catch(function (error) {
    dispatch(setLoadingTickets(false))
    console.log(error.response.data);
  })
}

export const deleteTicketAsync = ticketId => dispatch => {
  dispatch(setLoadingTickets(true))
  axios.delete('/tickets',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
    },
    data: {
      _id:ticketId
    }
})
.then(function (response) {
  dispatch(setLoadingTickets(false))
  dispatch(deleteTicket(ticketId));
})
.catch(function (error) {
  dispatch(setLoadingTickets(false))
  console.log(error.response.data);
})
}

export const editTicketAsync = ticket => dispatch => {
  setTimeout(() => {
    dispatch(editTicket(ticket));
  }, 500)
}

export const getAllTicketsAsync =  dispatch => {

  dispatch(setLoadingTickets(true))

  axios.get('/tickets',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
  .then(function (response) {
    dispatch(setLoadingTickets(false))
    dispatch(setTickets(response.data))
  })
  .catch(function (error) {
    dispatch(setLoadingTickets(false))
    console.log(error.response.data);
  })

}

export const getUnassignedTicketsAsync =  dispatch => {

  dispatch(setLoadingTickets(true))

  axios.get('/tickets/Unassigned',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
  .then(function (response) {
    dispatch(setLoadingTickets(false))
    dispatch(setTickets(response.data))
  })
  .catch(function (error) {
    dispatch(setLoadingTickets(false))
    console.log(error.response.data);
  })

}

export const getUserTicketsAsync =  dispatch => {

  dispatch(setLoadingTickets(true))

  axios.get('/tickets/User',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
  .then(function (response) {
    dispatch(setLoadingTickets(false))
    dispatch(setTickets(response.data))
  })
  .catch(function (error) {
    dispatch(setLoadingTickets(false))
    console.log(error.response.data);
  })

}
// Selectors
export const selectTickets = state => state.tickets.tickets;

export const selectActiveTicket = state => state.tickets.activeTicket;

export const selectLoadingTickets = state => state.tickets.loadingTickets;

export const selectTicketID =id =>state=>{

  return state.tickets.tickets.find((pj)=>(pj._id===id))
}
export default ticketsSlice.reducer;

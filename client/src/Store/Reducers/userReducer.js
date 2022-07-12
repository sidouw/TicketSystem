import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import cookies from 'js-cookie'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loged : false,
    loading:false,
    error:'',
    authLoading:false,
    user: {},
  },
  reducers: {
    setLoged: (state, action) => {
      state.loged =action.payload
    },
    setLoading: (state, action) => {
      state.loading =action.payload
    },
    setUser: (state, action) => {
      state.user ={...action.payload}
    },
    setError: (state, action) => {
      state.error =action.payload
    },
    setAuthLoading: (state, action) => {
      state.authLoading =action.payload
    },
  },
});

export const { setLoged,setLoading,setUser,setError,setAuthLoading} = userSlice.actions;

// Async Thunks

export const logInAsync = user => dispatch => {

  dispatch(setLoading(true))
  const remember = user.remember
  delete user.remember
  axios.post('/users/login', {
    ...user
  })
  .then(function (response) {
    console.log(response.data);
    dispatch(setLoading(false))
    dispatch(setUser({...response.data.user}))
    dispatch(setLoged(true))
    if(remember)
      cookies.set('token',response.data.token)

  })
  .catch(function (error) {
    dispatch(setLoading(false))
    dispatch(setError(error.response.data.error))
    console.log(error.response.data.error);
  })

}

export const signUpAsync = user => dispatch => {

  dispatch(setLoading(true))

  axios.post('/users/signup', {
    ...user
  })
  .then(function (response) {
    console.log(response.data);
    dispatch(setLoading(false))
    cookies.set('token',response.data.token)
    dispatch(setUser({...response.data.user}))
    dispatch(setLoged(true))

  })
  .catch(function (error) {
    dispatch(setLoading(false))
    dispatch(setError(error.response.data.error))
    console.log(error.response.data);
  })

}

export const authAsync =  dispatch => {

  dispatch(setAuthLoading(true))

  axios.get('/users/auth', {
    headers:{
      'Authorization':'Bearer '+cookies.get('token')
   }
  })
  .then(function (response) {
    console.log(response.data);
    dispatch(setAuthLoading(false))
    dispatch(setUser({...response.data}))
    dispatch(setLoged(true))

  })
  .catch(function (error) {
    dispatch(setAuthLoading(false))
    // dispatch(setError(error.response.data.error))
    console.log(error.response.data);
  })

}

export const signOutAsync = dispatch => {

  dispatch(setLoading(true))

  axios.get('/users/logout', {
    headers:{
      'Authorization':'Bearer '+cookies.get('token')
   }
  })
  .then(function (response) {
    dispatch(setLoading(false))
    dispatch(setLoged(false))

  })
  .catch(function (error) {
    dispatch(setLoading(false))
    console.log(error.response.data);
  })

}

// Selectors

export const selectLoged = state => state.user.loged;
export const selectLoading = state => state.user.loading;
export const selectError = state => state.user.error;
export const selectAuthLoading = state => state.user.authLoading;
export const selectUser = state => state.user.user;

export default userSlice.reducer;


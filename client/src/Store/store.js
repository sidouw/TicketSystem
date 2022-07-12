import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './Reducers/projectsReducer'
import ticketsReducer from './Reducers/ticketsReducer'
import userReducer from './Reducers/userReducer'

export default configureStore({
  reducer: {
    projects: projectsReducer,
    tickets: ticketsReducer,
    user: userReducer,
  },
});

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import cookies from 'js-cookie'


export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    loadingProjects : false,
    activeProject :{},
    projects: [],
  },
  reducers: {
    addProject: (state, action) => {
      state.projects = [...state.projects,action.payload];
    },
    deleteProject: (state, action) => {
        state.projects = state.projects.filter((project)=>project._id!==action.payload)
    },
    editProject: (state, action) => {
        state.projects = state.projects.filter((project)=>project._id!==action.payload._id)
        state.projects = [...state.projects,action.payload];
    },
    setLoadingProjecs: (state, action) => {
      state.loadingProjects = action.payload
    },
    setProjects: (state, action) => {
      state.projects =[...action.payload]
    },
    setActiveProject: (state, action) => {
      state.activeProject = {...action.payload}
    },
  },
});

export const { addProject, deleteProject, editProject,setLoadingProjecs,setProjects,setActiveProject } = projectsSlice.actions;


// Thunks
export const addProjectAsync = project => dispatch => {

  dispatch(setLoadingProjecs(true))
  axios.post('/projects', {
    ...project
  },{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }}
  )
  .then(function (response) {
    dispatch(setLoadingProjecs(false))
    console.log(response.data);
    dispatch(addProject({...response.data}))
  })
  .catch(function (error) {
    dispatch(setLoadingProjecs(false))
    console.log(error.response.data);
  })

}

export const getProjectsAsync =  dispatch => {

  dispatch(setLoadingProjecs(true))

  axios.get('/projects',{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
  .then(function (response) {
    dispatch(setLoadingProjecs(false))
    dispatch(setProjects(response.data))
  })
  .catch(function (error) {
    dispatch(setLoadingProjecs(false))
    console.log(error.response.data);
  })

}

export const getProjectByIdAsync = Id =>  dispatch => {

  dispatch(setLoadingProjecs(true))

  axios.get('/projects/'+Id,{
    headers:{
    'Authorization':'Bearer '+cookies.get('token')
  }})
  .then(function (response) {
    dispatch(setLoadingProjecs(false))
    dispatch(addProject(response.data))
  })
  .catch(function (error) {
    dispatch(setLoadingProjecs(false))
    console.log(error.response.data);
  })

}

export const deleteProjectAsync = projectId => dispatch => {

  dispatch(setLoadingProjecs(true))
  axios.delete('/projects',{
      headers:{
      'Authorization':'Bearer '+cookies.get('token')
      },
      data: {
        _id:projectId
      }
  }
  )
  .then(function (response) {
    dispatch(setLoadingProjecs(false))
    dispatch(deleteProject(projectId));
  })
  .catch(function (error) {
    dispatch(setLoadingProjecs(false))
    console.log(error.response.data);
  })
}

export const editProjectAsync = project => dispatch => {
  setTimeout(() => {
    dispatch(editProject(project));
  }, 500)
}

// Selectors
export const selectProjecs = state => state.projects.projects;

export const selectActiveProject = state => state.projects.activeProject;

export const selectLoadingProjecs = state => state.projects.loadingProjects;

export const selectProjectID =id =>state=>{
  const pr = state.projects.projects.find((pj)=>(pj._id===id))
  if(!pr)
    return {}
  return pr
}
export default projectsSlice.reducer;

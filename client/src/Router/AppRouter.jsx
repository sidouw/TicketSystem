import React from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'
import loadable from '@loadable/component';

import {selectUser} from '../Store/Reducers/userReducer'

import App from '../Components/App'

const Dashboard = loadable(() => import('../Components/DashboardPage'));
const ManageUsersPage = loadable(() => import('../Components/ManageUsersPage'));
const ManageProjectsUsersPage = loadable(() => import('../Components/ManageProjectsUsersPage'));
const ProjectsPage = loadable(() => import('../Components/ProjectsPage'));
const MyTicketsPage = loadable(() => import('../Components/MyTicketsPage'));
const AllTicketsPage = loadable(() => import('../Components/AllTicketsPage'));
const ProjectViewPage = loadable(() => import('../Components/ProjectViewPage'));
const TicketViewPage = loadable(() => import('../Components/TicketViewPage'));
const UnassignedTicketsPage = loadable(() => import('../Components/UnassignedTicketsPage'));
const UserPage = loadable(() => import('../Components/UserPgae'));



const AppRouter =()=>{

    const user = useSelector(selectUser)
    return (
        <BrowserRouter  >
        
            <Routes>
                <Route path="/" element={<App/>}>
                        {user.role<=0 && <Route path="/dashboard" element={<Dashboard fallback={<div>Loading...</div>} />} />}
                        {user.role<=0 && <Route path="/ManageUsers" element={<ManageUsersPage/>} />}
                        {user.role<=2 && <Route path="/User/:id" element={<UserPage/>} />}
                        {user.role<=0 && <Route path="/ManageProjects" element={<ManageProjectsUsersPage/>} />}
                        {user.role<=2 && <Route path="/Projects" element={<ProjectsPage/>} />}
                        {user.role<=2 && <Route path="/Projects/:id" element={<ProjectViewPage/>} />}
                        {user.role<=0 && <Route path="/tickets/all" element={<AllTicketsPage/>} />}
                        {user.role<=0 && <Route path="/tickets/unassigned" element={<UnassignedTicketsPage/>} />}
                        {user.role<=2 && <Route path="/tickets/myTickets" element={<MyTicketsPage/>} />}
                        {user.role<=2 && <Route path="/tickets/:id" element={<TicketViewPage/>} />}
                        <Route path="*" element={<NotFound/>} />
                    
                </Route>
            </Routes>
        
        </BrowserRouter>
    )
}

const st = {
    height:'70vh',
    display:'grid',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize : '3rem',
    textAlign : 'center'
  }
const NotFound = ()=>(
        <div style={st} >
            <h1>Page not found</h1>
        </div>
        )

export default AppRouter
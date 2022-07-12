
import React from 'react'
import {Navigate} from 'react-router-dom'
import { Layout} from 'antd';
import SideNavBar from '../Components/SideNavBar'
import PageHeader from '../Components/PageHeader'
const {Content, Footer} = Layout;



const PrivateRoute =  ({children })=>(
    true?
      <Layout style={{ minHeight: '100vh' }}>
            <SideNavBar/>
            <Layout className="site-layout" >
                <PageHeader/>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Sidah boi</Footer>
            </Layout>
        </Layout>
            :
            <Navigate to= '/'/ >
        )

// import React from 'react'

// import {useSelector} from 'react-redux'
// import {selectLogedIn} from '../Store/Reducers/userReducer'



// function PrivateRoute({ children }) {
//     const logedIn = useSelector(selectLogedIn);
//     return logedIn ?
//                  <> <NavBar/> {children} </> 
                 
//                  : 
//                  <Navigate to="/" />;
//   }

export default PrivateRoute
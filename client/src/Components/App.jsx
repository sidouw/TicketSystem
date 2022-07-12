import React,{useEffect} from 'react';
import { Outlet} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import loadable from '@loadable/component';

import {Spin,Layout,Typography} from 'antd';

import {selectLoged,authAsync,selectAuthLoading} from '../Store/Reducers/userReducer';
import SideNavBar from '../Components/SideNavBar'
import PageHeader from '../Components/PageHeader'
// import AuthPage from './AuthPage';



const AuthPage = loadable(() => import('./AuthPage'));

const {Content, Footer} = Layout;


const spinStyle = {
    height:'100vh',
    display:'grid',
    justifyContent: 'center',
    alignContent: 'center'
  }

const App = ()=>{
    const dispatch = useDispatch()
    const loged = useSelector(selectLoged)
    const authLoading = useSelector(selectAuthLoading)

    useEffect(()=>{
        dispatch(authAsync)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        authLoading? 
        <div style={spinStyle} >
            <Spin size='large'/>
        </div>
        :
        !loged ?
        <AuthPage/>
        :
        <Layout style={{ minHeight: '100vh' }}>
            <SideNavBar/>
            <Layout className="site-layout" >
                <PageHeader/>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet/>
                </Content>
                <Footer style={{ textAlign: 'center',padding:'5px 50px' }}><Typography.Title level={5} >Github.com/sidouw _2022</Typography.Title> </Footer>
            </Layout>
        </Layout>
        )
}

export default App
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {UserOutlined,ToolOutlined,SearchOutlined} from '@ant-design/icons'
import {Menu,Dropdown,Layout,Avatar} from 'antd';

import {signOutAsync} from '../Store/Reducers/userReducer'
import {selectUser} from '../Store/Reducers/userReducer'

const userIcons = [<UserOutlined/>,<ToolOutlined/>,<SearchOutlined/>]
const { Header} = Layout;
const menuStyle = {
    fontSize: '1rem',
    fontWeight :'500',
    margin :'1rem 0 ',
    paddingInline : '50px'
}

const headerStyle ={
    display :'flex',
    alignItems :'center',
    justifyContent : 'flex-end',
    padding :'0 1.5rem 0 0 ',
    // background :"#141414"
    background :"#fff"
}
const PageHeader = ()=>{
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const menu = (
        <Menu   mode="horizontal" >
                <Menu.Item style = {menuStyle} key="Profile"><Link to= {'/User/'+user._id}>Profile</Link> </Menu.Item>
                <Menu.Item style = {menuStyle} key="Logout"><Link to= '/' onClick={()=>dispatch(signOutAsync)} > Logout </Link> </Menu.Item>
        </Menu>
    )
    
    return (
        <Header style = {headerStyle} >
            <Dropdown  overlay={menu} placement="bottomLeft" arrow>
                <Avatar style={{cursor:'pointer'}} icon={userIcons[user.role]} />
            </Dropdown>
        </Header>
    )
}

export default PageHeader
import React from 'react'
import {useSelector} from 'react-redux'
import {Link,useLocation} from 'react-router-dom'

import { Layout, Menu,Typography} from 'antd';
import { ContainerOutlined } from '@ant-design/icons';

import {selectUser} from '../Store/Reducers/userReducer'

const { Sider } = Layout;



  const SideNavBar = ()=>{

    const location = useLocation()
    const user = useSelector(selectUser)

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            width = '250'
            style={{
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex :10,
                // background :"#141414"
                background :"#fff"
            }}
            >
            
            {/* <div className="logo">
            <BugOutlined /> Bug Tracker
            </div> */}
            <Typography.Title level={1} style = {{textAlign :'center',margin : '9px 0'}} ><ContainerOutlined /></Typography.Title>
            <Menu  defaultSelectedKeys={[location.pathname.split('/')[1]]} 
                  mode="inline" 
                  style= {{fontSize : "1rem" , fontWeight : '500'}}
                  defaultOpenKeys={['sub']}

                  >
                { user.role<=0 &&
                <Menu.Item key='Dashboard' >
                    <Link to = '/Dashboard'>Dashboard</Link>
                </Menu.Item>
                }
                { user.role<=0 &&
                <Menu.Item key='ManageUsers' >
                    <Link to = '/ManageUsers'>Manage Users</Link>
                </Menu.Item>
                }
                { user.role<=0 &&
                <Menu.Item key='ManageProjects' >
                    <Link to = '/ManageProjects'>Manage Projects Users</Link>
                </Menu.Item>
                }
                { user.role<=2 &&               
                <Menu.Item key='projects' >
                    <Link to = '/projects'>Projects</Link>
                </Menu.Item>
                }

                <Menu.SubMenu key='sub' title="Tickets" >
                      { user.role<=0 &&   
                      <Menu.Item key='all' >
                          <Link to = '/tickets/all'>All Tickets</Link>
                      </Menu.Item>
                      }
                      { user.role<=0 &&                       
                      <Menu.Item key='unassigned' >
                          <Link to = '/tickets/unassigned'>Unassigned Tickets</Link>
                      </Menu.Item>
                      }
                      <Menu.Item key='myTickets' >
                          <Link to = '/tickets/myTickets'>My Tickets</Link>
                      </Menu.Item>
                </Menu.SubMenu >

            </Menu>
        </Sider>
    )
  }

  export default SideNavBar
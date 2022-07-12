import React,{ useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'

import { Avatar,Row, Col,Divider,Typography,Descriptions,Spin } from 'antd';
import {UserOutlined,ToolOutlined,SearchOutlined} from '@ant-design/icons'

import {getUserById} from '../utils/usersUtils'
import {USER_ROLE} from '../utils/tables'
const userIcons = [<UserOutlined/>,<ToolOutlined/>,<SearchOutlined/>]

const spinStyle = {
    height:'70vh',
    display:'grid',
    justifyContent: 'center',
    alignContent: 'center'
  }

const descriptionStyle= {
    contentStyle:{fontSize:'20px'},
    labelStyle:{fontSize:'20px'}
}
const UserPage = ()=>{
    const params = useParams()
    const [user,setUser] = useState({})
    const [loading,setSetLocading] = useState(true)
    useEffect(()=>{
        setSetLocading(true)
        getUserById(params.id).then((user)=>{
            setUser(user)
            setSetLocading(false)
        })
    },[params])

    return(
        loading? 
        <div style={spinStyle} >
            <Spin size='large'/>
        </div>
        :
       ( !user?
        <div style={spinStyle} >
            <Typography.Title  >User not Found !</Typography.Title>
        </div>
        :
        <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
                <Row gutter={[0,10]} >
                    <Col style={{display:'flex',justifyContent :'center'}} span={24}>
                        <Avatar  size={128} icon={userIcons[user.role]}  />
                    </Col>
                    <Col style={{display:'flex',justifyContent :'center'}} span={24}>
                        <Typography.Title style={{margin : '0'}}>{user?.username}</Typography.Title>
                    </Col>
                    <Divider style={{margin : '10px 0'}}/>
                </Row>
                
                <Row>
                    <Col span={24}>
                            <Descriptions  bordered>
                                <Descriptions.Item  {...descriptionStyle} span={2} label="Role">{USER_ROLE[user?.role]}</Descriptions.Item>
                                <Descriptions.Item  {...descriptionStyle} span={1} label="Join Date">{user.createdAt.slice(0,10)}</Descriptions.Item>
                                <Descriptions.Item  {...descriptionStyle} span={2}  label="Tickets Submited ">{}</Descriptions.Item>
                                <Descriptions.Item  {...descriptionStyle} span={1} label="Email">{user.email}</Descriptions.Item>
                            </Descriptions>
                    </Col>
                </Row>
        </div>)
    )
}


export default UserPage
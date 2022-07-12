import React from 'react';

import { Typography,Tabs,Row,Col,Card } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';

import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'


const { TabPane } = Tabs;

const { Title } = Typography;


const AuthPage = ()=>{
    return (
        <Row type = "flex" justify = "center" align = "middle" style= {{minHeight : '100vh'} } >
            <Col >
                <Card style= {{height : '430px'} }>
                    <Title style= {{padding : '0 0',textAlign:'center'} }  >{<ContainerOutlined />} Ticket System</Title>
                    <Tabs defaultActiveKey="1" centered type="card">
                        <TabPane tab="Login" key="1">
                            <LogInForm/>
                        </TabPane>
                        <TabPane tab="SignUp" key="2">
                            <SignUpForm/>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
        )
}

export default AuthPage
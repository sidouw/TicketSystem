import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'

import { Form, Input, Button, Checkbox,message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import {logInAsync,selectLoading,selectError,setError} from '../Store/Reducers/userReducer';


const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  useEffect(()=>{
    error&& message.error(error)
    dispatch(setError(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])

  const onFinish = values => {
    // console.log('Received values of form: ', values); validateStatus
    dispatch(logInAsync({username:values.username,password:values.password,remember:values.remember}))
    navigate('/Dashboard')
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined  />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined  />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item >
        <Button  loading={loading} type="primary" htmlType="submit" >
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}


export default LoginForm
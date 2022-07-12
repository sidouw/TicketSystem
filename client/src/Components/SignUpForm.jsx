import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'

import {Form,Input,Button,message} from 'antd'
import { UserOutlined, LockOutlined,MailOutlined } from '@ant-design/icons'

import {signUpAsync,selectLoading,selectError,setError} from '../Store/Reducers/userReducer'


const SignUpForm = () => {

  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const [form] = Form.useForm();

  useEffect(()=>{
    error&& message.error(error)
    dispatch(setError(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])

  const onFinish = values => {
    console.log('Received values of form: ', values);
    dispatch(signUpAsync(values))
  };


  return (
    <Form
      // {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username"/>

        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined/>} placeholder="Email"/>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined/>} type="password" placeholder="Password"/>
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined/>} type="password" placeholder="Confirm Password"/>
        </Form.Item>

        <Form.Item>
          <Button loading= {loading} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
    </Form>
  )
}

export default SignUpForm
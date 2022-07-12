import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import {Col,Row,Select,Form,Button,Table,Typography} from 'antd' 

import {selectUser} from '../Store/Reducers/userReducer'
import {getUsers,updateUsers,deleteUsers} from '../utils/usersUtils'
import {USER_ROLE} from '../utils/tables'

const { Option } = Select;




const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
    key: 'name',
    ellipsis: 'enable',
    render: (text,record) =>(<Link to= {'/user/'+record._id}>{record.username}</Link> ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ellipsis: 'enable',
    responsive: ['md'],

  },
  {
    title: 'Role',
    dataIndex : 'role',
    key: 'role',
    ellipsis: 'enable',
    render: (text,record) =>( USER_ROLE[text]),
  },
]



const ManageUsersPage = ()=> {

  const user = useSelector(selectUser)
  const [RolesForm] = Form.useForm();
  const [DeleteForm] = Form.useForm();
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(true)
  const [loadingUpdate,setLoadingUpdate] = useState(false)

  useEffect(()=>{

    getUsers().then((u)=>{
      setLoading(false)
      setUsers(u?.filter(us=>us._id!==user._id))
      RolesForm.resetFields()
      DeleteForm.resetFields()
    })
// eslint-disable-next-line
  },[])

  const  onFinish = (value)=> {
    setLoadingUpdate(true)
    updateUsers(value).then((acknowledged)=>{
      if (acknowledged) {

        const allUsers = [...users]
        value.selectedUsers.forEach(user => {
          const objIndex = allUsers.findIndex((obj => obj._id === user));
          allUsers[objIndex].role = value.role
          RolesForm.resetFields()
          DeleteForm.resetFields()
        })


        setUsers(allUsers)
        setLoadingUpdate(false)
      }
    })
  }
  
  const  onFinishDelete = (value)=> {
    console.log(value);
    // DeleteForm.resetFields()
    deleteUsers(value).then((acknowledged)=>{
      if (acknowledged) {

            const allUsers = [...users]
            value.selectedUsers.forEach(user => {
              const objIndex = allUsers.findIndex((obj => obj._id === user));
              delete allUsers[objIndex]
            })

            const nAt = allUsers.filter(u=> u!== undefined)
            RolesForm.resetFields()
            DeleteForm.resetFields()
          setUsers(nAt)
          setLoadingUpdate(false)
      }
    })

    // setLoadingUpdate(true)
    // updateUsers(value).then((acknowledged)=>{

    // })
  }
     
    return (
            <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
              <Typography.Title  level={1}>Manage Users</Typography.Title>
              <Row justify ='center' gutter={[24, 24]}>
                
                  <Col xs={{ span: 24}} lg={{ span: 7}}>

                      <Form
                        form={DeleteForm}
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinishDelete}
                      >
                        <Form.Item
                          name='selectedUsers' 
                          label = 'Select users to delete'
                          rules={[{ required: true, message: 'Please Select at least one user' }]}
                          >
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: '100%' }}
                              placeholder="Please select users"
                            >
                            {users.map((u,i)=><Option key={i} value={u._id} >{u.username}</Option>)}
                          </Select>
                        </Form.Item>

                        <Form.Item>
                          <Button loading= {loadingUpdate}  type="primary" danger htmlType="submit" >
                            Delete
                          </Button>
                        </Form.Item>
                      </Form>

                      <Form
                        form={RolesForm}
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                      >
                        <Form.Item
                          name='selectedUsers' 
                          label = 'Select users to assign a role'
                          rules={[{ required: true, message: 'Please Select at least one user' }]}
                          >
                            <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Please select users"
                            >
                            {users.map((u,i)=>
                                <Option key={i} value={u._id} >{u.username}</Option>
                            )}
                          </Select>
                        </Form.Item>

                        <Form.Item 
                          name = 'role'
                          label = 'Select a Role to Assign'
                          rules={[{ required: true, message: 'Please Select at least one user' }]}
                        >
                          <Select
                          style={{ width: 200 }}
                          placeholder="Select a Role"
                          >
                            {
                              USER_ROLE.map((tp,index)=>
                                <Option value={index} key = {index}>{tp}</Option>
                              )
                            }
                          </Select>
                        </Form.Item>

                        <Form.Item>
                          <Button loading= {loadingUpdate}  type="primary" htmlType="submit" >
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>

                  </Col>

                <Col xs={{ span: 24}} lg={{ span: 17}}>
                  <Table
                    pagination= {{position : ['bottomCenter']}}
                    style={{ height: '72vh'}}
                    loading= {loading}   
                    columns={columns} 
                    dataSource={users} 
                    title={() => (<h3>Users</h3>)}
                  />
                </Col>
            </Row>
            </div>
    )
  
}


export default ManageUsersPage
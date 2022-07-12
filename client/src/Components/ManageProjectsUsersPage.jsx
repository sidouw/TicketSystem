import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'

import { Col,Row,Select,Form,Button,Table,Typography} from 'antd';

import {selectProjecs,getProjectsAsync} from '../Store/Reducers/projectsReducer'
import {getUsers} from '../utils/usersUtils'
import {updateProjectUsers,getProjectById,deleteProjectUsers} from '../utils/projectsUtils'

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

  }
]

const ManageProjectsUsersPage = ()=> {

  const dispatch = useDispatch ()
  const [form] = Form.useForm();
  const projects = useSelector(selectProjecs)
  const [users,setUsers] = useState([])
  const [projectUsers,setProjectUsers] = useState([])
  const [loadingProjectUsers,setLoadingProjectUsers] = useState(false)
  const [selectedProject,setSelectedProject] = useState('')
  const [loadingUpdate,setLoadingUpdate] = useState(false)
  const [selectedRows,setSelectedRows] = useState([])
  const [selectedRowKeys,setSelectedRowKeys] = useState([])

  useEffect(()=>{
      dispatch(getProjectsAsync)
      getUsers().then((u)=>{
        setUsers(u.filter(user=>user.role<=1))
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    const onProjectChanged = pr=>{
      setSelectedProject(pr)
      setLoadingProjectUsers(true)
      setSelectedRowKeys([])
      getProjectById(pr).then((p)=>{
        setProjectUsers(p.users)
        setLoadingProjectUsers(false)
      }).catch(()=>{
        setProjectUsers([])
        setLoadingProjectUsers(false)
      })
    }
    
    const onFinish = (values)=>{
      
      setLoadingUpdate(true)
      updateProjectUsers({...values,Project:selectedProject}).then(()=>{
        getProjectById(selectedProject).then((p)=>{
          setProjectUsers(p.users)
          setLoadingProjectUsers(false)
        }).catch(()=>{
          setProjectUsers([])
          setLoadingProjectUsers(false)
        })
        setLoadingUpdate(false)
        form.resetFields()
      })
    }

    const onRowSelectionChange = (selectedRowKeys,selectedTableRows)=>{
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedTableRows)
    }
    const onRemoveBtnClicked = ()=>{
      setLoadingProjectUsers(true)
      deleteProjectUsers({selectedUsers:selectedRows,Project:selectedProject}).then(()=>{
      
        const newUsers = projectUsers.filter(ar => !selectedRows.find(rm =>rm._id === ar._id ))
        setProjectUsers(newUsers)
        setSelectedRowKeys([])
        setLoadingProjectUsers(false)
      }).catch(()=>{
        setLoadingProjectUsers(false)
      })
    }
    return (
      <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
        <Typography.Title  level={1}>Manage project developers</Typography.Title>
        <Col justify ='center' gutter={[10, 10]}>
          <Row>
          <Select
              showSearch
              onChange={onProjectChanged}
              placeholder="Please select a project"
              style={{ width: '100%',marginBottom:'10px' }}
              filterOption={(input, option) =>(option.children.includes(input))}
              >
              {projects.map((p,i)=>
                  <Option key={i} value={p._id} >{p.name}</Option>
              )}
            </Select>
          </Row>
          <Row xs={{ span: 24}} lg={{ span: 7}}>

            <Form
            form={form}
            layout="horizontal"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item 
              name = 'selectedUsers'
              label = 'Select Developers to assign to project'
              rules={[{ required: true, message: 'Please Select at least one developer' }]}
              >
            <Select
            mode="multiple"
            style={{ width: '100%',minWidth:200}}
            placeholder="Select Developers"
            >
            {users.map((u,i)=>
                          <Option key={i} value={u._id} >{u.username}</Option>
                      )}
            </Select>
            </Form.Item>

            <Form.Item>
              <Button disabled={selectedProject===''} loading= {loadingUpdate}  type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
          </Form>

          </Row>

          <Row xs={{ span: 24}} lg={{ span: 7}}>
            <Button 
                    onClick={onRemoveBtnClicked} 
                    disabled={!selectedRows.length>0} 
                    loading={loadingProjectUsers}
                    danger
                    type="primary"
                    style={{marginBottom:'10px' }}
                    >Remove Selected Users</Button>
            <Table
              rowSelection={{onChange:onRowSelectionChange,selectedRowKeys}}
              style={{ height: '53vh'}}
              pagination= {{position : ['bottomCenter']}}
              loading= {loadingProjectUsers}   
              columns={columns} 
              dataSource={projectUsers.map((p,i)=>( {...p,key:i}) )} 
              title={() => (<h3>Project users</h3>)}
            />
          </Row>
      </Col>
    </div>
    )
  
}


export default ManageProjectsUsersPage
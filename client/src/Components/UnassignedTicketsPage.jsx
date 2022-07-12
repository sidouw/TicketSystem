import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Col,Row,Select,Form,Button,Table} from 'antd';

import {getUsers} from '../utils/usersUtils'
import {assignTicketsDeveloper} from '../utils/ticketsUtils'
import {selectLoadingTickets, selectTickets,getUnassignedTicketsAsync} from '../Store/Reducers/ticketsReducer'
import {selectProjecs,getProjectsAsync} from '../Store/Reducers/projectsReducer'

import {TICKET_TYPE} from '../utils/tables'

const { Option } = Select;

const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: 'enable',
      render: (text,record) =>( <Link to= {'/tickets/'+record._id}>{text}</Link>),
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      ellipsis: 'enable',
      render: (text,record) =>( <Link to= {'/projects/'+record.project?._id}>{record.project?.name}</Link>),
    },
    // 
    // {
    //   title: 'Priority',
    //   dataIndex: 'priority',
    //   key: 'priority',
    //   ellipsis: 'enable',
    // },
    // {
    //   title: 'status',
    //   key: 'status',
    //   ellipsis: 'enable',
    //   dataIndex: 'status',
    // },
    {
      title: 'Type',
      key: 'type',
      ellipsis: 'enable',
      dataIndex: 'type',
    //   responsive: ['md'],
    render: (text,record) =>( TICKET_TYPE[text]),
    },
    {
      title: 'Created',
      key: 'createdAt',
      ellipsis: 'enable',
      dataIndex: 'createdAt',
      responsive: ['md'],
      // 
      render: text =>( <td class="ant-table-cell ant-table-cell-ellipsis">{text.slice(0,10)}</td>),
    }
  ]
 

const UnassignedTicketsPage = ()=> {

  const dispatch = useDispatch ()
  const [form] = Form.useForm();
  const projects = useSelector(selectProjecs)
  const [users,setUsers] = useState([])
  const [filtredUsers,setFiltredUsers] = useState([])
  const [filtredTickets,setFiltredTickets] = useState([])
  const [loadingUpdate,setLoadingUpdate] = useState(false)
  const [selectedRows,setSelectedRows] = useState([])
  const [selectedRowKeys,setSelectedRowKeys] = useState([])
  const tickets = useSelector(selectTickets)
  const loading = useSelector(selectLoadingTickets)


    useEffect(()=>{
        dispatch(getProjectsAsync)
        getUsers().then((u)=>{
            setUsers(u)
            // setFiltredUsers(u)
          })
        dispatch(getUnassignedTicketsAsync)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    
    
    const onFinish = (values)=>{
        const t = selectedRows.map(r=>r._id)
        setLoadingUpdate(true)
        assignTicketsDeveloper({tickets:t,developer:values.selectedUser}).then((done)=>{
            setLoadingUpdate(false)
            dispatch(getUnassignedTicketsAsync)
            setFiltredTickets([])
            setSelectedRowKeys([])
            form.resetFields()
        }).catch((err)=>{
            setLoadingUpdate(false)
            console.log(err);
        })
      

    }

    const onRowSelectionChange = (selectedRowKeys,selectedTableRows)=>{
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedTableRows)
    }

    const onProjectChanged = pr=>{
      const selectedProject = projects.find(elem=>elem._id===pr)
      if(!selectedProject)
      return
      const fUsers = users.filter(u=>selectedProject.users.includes(u._id))
      const fTickets = tickets.filter(t=>t.project._id===selectedProject._id) 
      setFiltredTickets(fTickets)
      setFiltredUsers(fUsers)
      setSelectedRowKeys([])
      form.resetFields()
    }
    
    
    return (
      <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
      <h1>Manage unassigned tickets</h1>
      
      <Col justify ='center' gutter={[10, 10]}>
        <Row xs={{ span: 24}} lg={{ span: 7}}>

          <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item 
            name = 'selectedUser'
            label = 'Select Developer to assign to ticket'
            rules={[{ required: true, message: 'Please Select a developer' }]}
            >
          <Select
          showSearch
          style={{ width: '100%',minWidth:200}}
          placeholder="Select Developers"
          filterOption={(input, option) =>(option.children.toLocaleLowerCase().includes(input.toLocaleLowerCase()))}
          >
          {filtredUsers.map((u,i)=>
                        <Option key={i} value={u._id} >{u.username}</Option>
                    )}
          </Select>
          </Form.Item>

          <Form.Item>
            <Button disabled={!selectedRowKeys.length>0} loading= {loadingUpdate}  type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>

        </Row>

        <Row>
        <Select
            showSearch
            onChange={onProjectChanged}
            placeholder="Please select a project"
            style={{ width: '100%' }}
            filterOption={(input, option) =>(option.children.includes(input))}
            >
            {projects.map((p,i)=>
                <Option key={i} value={p._id} >{p.name}</Option>
            )}
          </Select>
        </Row>

        <Row xs={{ span: 24}} lg={{ span: 7}}>

          <Table
            rowSelection={{onChange:onRowSelectionChange,selectedRowKeys}}
            pagination= {{position : ['bottomCenter']}}
            style={{ height: '50vh'}}
            loading= {loading}   
            columns={columns} 
            dataSource={filtredTickets.map((t,i)=>( {...t,key:i}) )} 
            title={() => (<h3>Unassigned Tickets</h3>)}
          />
        </Row>
    </Col>
    </div>
    )
  
}


export default UnassignedTicketsPage
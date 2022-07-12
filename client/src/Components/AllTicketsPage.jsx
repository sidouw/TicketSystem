import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import { Space,Button,Table} from 'antd';

import CreateTicketModal from './CreateTicketModal'
import {selectLoadingTickets, selectTickets,getAllTicketsAsync} from '../Store/Reducers/ticketsReducer'

import {TICKET_PRIORIRY,TICKET_STATUS,TICKET_TYPE} from '../utils/tables'

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
  {
    title: 'Assigned Dev',
    key: 'developer',
    ellipsis: 'enable',
    dataIndex: 'developer',
    responsive: ['md'],
    render: (text,record) =>(<Link to= {'/user/'+record.developer?._id}>{record.developer?.username}</Link> ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    ellipsis: 'enable',
    render: (text,record) =>( TICKET_PRIORIRY[text]),
  },
  {
    title: 'status',
    key: 'status',
    ellipsis: 'enable',
    dataIndex: 'status',
    render: (text,record) =>( TICKET_STATUS[text]),
  },
  {
    title: 'Type',
    key: 'type',
    ellipsis: 'enable',
    dataIndex: 'type',
    responsive: ['md'],
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


// --------------------------------------------****-------------------------------------
//TODO dark mode , Dashboard
const TicketsPage= ()=> {
  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const loading = useSelector(selectLoadingTickets)

  const [visible, setVisible] = useState(false);
  
  useEffect(()=>{
    dispatch(getAllTicketsAsync)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
            <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
              
              <Space size= 'large' direction="vertical">
              <Button size= 'large' 
              type= 'primary'
              onClick={() => {
                setVisible(true);
              }}
              >Create New Ticket</Button>  
              <CreateTicketModal
                visible={visible}
                onCancel={() => {
                  setVisible(false);
                }}
                />
              <Table
               pagination= {{position : ['bottomCenter']}}
               style={{ height: '72vh'}}
               loading= {loading}   
               columns={columns} 
               dataSource={tickets} 
               title={() => (<h3>Tickets</h3>)}
               />
              </Space>
            </div>
    )
  
}


export default TicketsPage
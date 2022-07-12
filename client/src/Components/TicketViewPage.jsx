import React,{useState,useEffect} from 'react';
import {useParams,Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col,Descriptions,Card,Button,Spin,Typography } from 'antd';

import TicketComments from './TicketComments'
import TicketEditModal from './TicketEditModal'

import {setActiveTicket,selectActiveTicket} from '../Store/Reducers/ticketsReducer'
import {selectUser} from '../Store/Reducers/userReducer'
import {getTicketById} from '../utils/ticketsUtils'
import {TICKET_PRIORIRY,TICKET_STATUS,TICKET_TYPE} from '../utils/tables'

    
  const spinStyle = {
    height:'80vh',
    display:'grid',
    justifyContent: 'center',
    alignContent: 'center'
  }

  const descriptionStyle= {
    contentStyle:{fontSize:'16px'},
     labelStyle:{fontSize:'16px'}
  }
  
const TicketViewPage = ()=>{

    const dispatch = useDispatch()
    const params = useParams()
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const ticket = useSelector(selectActiveTicket)
    const user = useSelector(selectUser)
    useEffect(()=>{
      
      getTicketById(params.id).then((t)=>{
        dispatch(setActiveTicket(t))
        setLoading(false)
      })

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return ( 
        loading
        ?
        <div style={spinStyle} >
            <Spin size='large'/>
        </div>
        :
       ( ticket._id
        ?
        <>
            <Row>
                <Col span={24}>
                    <Card title="Ticket info" style= {{margin : '1rem 0'}} extra={user.role<=1&&(<Button onClick = {()=>setVisible(true)} type = 'primary'>Edit</Button>)} >
                        <Descriptions bordered  >
                            <Descriptions.Item {...descriptionStyle} label="Title">{ticket.title}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Assigned Developer"> <Link to={'/user/'+ticket.developer?._id} >{ticket.developer?.username}</Link></Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Submitter"><Link to={'/user/'+ticket.submiter?._id} >{ticket.submiter?.username}</Link></Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Project">{ticket.project.name}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Priority">{TICKET_PRIORIRY[ticket.priority]}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Status">{TICKET_STATUS[ticket.status]}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Type">{TICKET_TYPE[ticket.type]}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Submitted" span={2}>{ticket.createdAt.slice(0,10)}</Descriptions.Item>
                            {/* <Descriptions.Item label="Description">{ticket.description}</Descriptions.Item> */}
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Card title="Description" style= {{margin : '0 0 1rem 0'}}>
                        {ticket.description}
                    </Card>
                </Col>
            </Row>

            <Row>
              <Col span={24}>
                <TicketComments/>
              </Col>
            </Row>

            <TicketEditModal
            visible={visible}
            onCancel={() => {
              setVisible(false);
            }}
            />

        </>
        :
        <div style={spinStyle} >
            <Typography.Title  >Ticket not Found !</Typography.Title>
        </div>
        )
    )
}


export default TicketViewPage

// const historycolumns = [
//     {
//       title: 'Proprety',
//       dataIndex: 'proprety',
//       key: 'proprety',
//       ellipsis: 'enable',

//     },
//     {
//       title: 'Old Value',
//       dataIndex: 'oldval',
//       key: 'oldval',
//       ellipsis: 'enable',
//     },
//     {
//       title: 'New Value',
//       dataIndex: 'newval',
//       key: 'newval',
//       ellipsis: 'enable',
//     },
//     {
//       title: 'Date Changed',
//       dataIndex: 'date',
//       key: 'date',
//       ellipsis: 'enable',
//       responsive : ['md']
//     },
//   ]

  
//   const historydata = [
//     {
//       key: '1',
//       proprety: 'John Brown',
//       oldval: 'La soupe',
//       newval: 'Du Fromage',
//       date: '1/1/1000',
//     },
//     {
//       key: '2',
//       proprety: 'John Brown',
//       oldval: 'La soupe',
//       newval: 'Du Fromage',
//       date: '1/1/1000',
//     },
//     {
//       key: '3',
//       proprety: 'John Brown',
//       oldval: 'La soupe',
//       newval: 'Du Fromage',
//       date: '1/1/1000',
//     },
//   ]
            
// <Row justify = {'center'} wrap = {true} gutter={[12,0]}>
// <Col >
//         <Table
//           // style={{maxHeight : '10px'}}
//           style={{ height: '500px',minHeight:'500px',maxHeight:'500px' }}
//           // scroll={{ y: 300 }}
//           pagination= {{position : ['bottomCenter']}}
//           loading= {false}   
//           columns={historycolumns} 
//           dataSource={historydata} 
//           title={() => (<h3>History</h3>)}
//         />
// </Col>
// </Row>
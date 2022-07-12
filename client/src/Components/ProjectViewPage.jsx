import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {useParams,Link} from 'react-router-dom'

import { Row, Col,Descriptions,Card,Table ,Button} from 'antd';

import EditProjectModal from './EditProjectModal'

import {selectActiveProject,setActiveProject} from '../Store/Reducers/projectsReducer'
import {getProjectTickets,getProjectById} from '../utils/projectsUtils'

import {TICKET_STATUS} from '../utils/tables'

const developerscolumns = [
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
    },
  ];

const ticketscolumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: 'enable',
      render: (text,record) =>( <Link to= {'/tickets/'+record._id}>{text}</Link>),
    },
    {
      title: 'Submitter',
      dataIndex: 'submitter',
      key: 'submitter',
      ellipsis: 'enable',
      responsive: ['md'],
      render: (text,record) =>(<Link to= {'/user/'+record.submiter?._id}>{record.submiter?.username}</Link> ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ellipsis: 'enable',
      render: (text,record) =>( TICKET_STATUS[text]),
    },
    {
      title: 'date',
      key: 'date',
      dataIndex: 'createdAt',
      ellipsis: 'enable',
      render: text =>( <td class="ant-table-cell ant-table-cell-ellipsis">{text.slice(0,10)}</td>),
    },
  ];
  
  
  const descriptionStyle= {
    contentStyle:{fontSize:'20px'},
     labelStyle:{fontSize:'20px'}
  }
  

const ProjectViewPage = ()=>{

    const params = useParams()

    const [ticketsData,setTicketsData] = useState([])
    const dispatch = useDispatch()
    const activeProject = useSelector(selectActiveProject)
    const [devs,setDevs] = useState([])
    const [visible,setVisible] = useState(false)

  useEffect(()=>{
    getProjectById(params.id).then((pj)=>{
      dispatch(setActiveProject(pj))
      setDevs(pj.users)
      getProjectTickets(pj._id).then((tickets)=>{
        setTicketsData(tickets)
      })
    })
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card title="Project info" style= {{margin : '1rem 0'}}extra={<Button onClick = {()=>setVisible(true)}  type = 'primary'>Edit</Button>}  >
                        <Descriptions bordered >
                            <Descriptions.Item {...descriptionStyle} span = {4} label="Name">{activeProject?.name}</Descriptions.Item>
                            <Descriptions.Item {...descriptionStyle} label="Description">{activeProject?.description}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>

 
            <Row justify = {'center'} wrap = {true} gutter={[12,0]}>
              <Col xs={{ span: 24}} lg={{ span: 12}}>
                  <Table
                  pagination= {{position : ['bottomCenter']}}
                  loading= {false}   
                  style= {{height : '60vh'}}
                  columns={developerscolumns} 
                  dataSource={devs} 
                  title={() => (<h3>Developers</h3>)}
                  />
              </Col>
              <Col xs={{ span: 24}} lg={{ span: 12}}>
                  <Table
                  pagination= {{position : ['bottomCenter']}}
                  style= {{height : '60vh'}}
                  loading= {false}   
                  columns={ticketscolumns} 
                  dataSource={ticketsData} 
                  title={() => (<h3>Tickets</h3>)}
                  />
              </Col>
            </Row>
            <EditProjectModal
            visible={visible}
            onCancel={() => {
              setVisible(false);
            }}
            />
        </>
    )
}


export default ProjectViewPage
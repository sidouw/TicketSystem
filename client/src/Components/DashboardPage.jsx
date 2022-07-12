import React,{useEffect,useState,useMemo} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {Row,Col,Card,Typography,Select} from 'antd'
import { Pie } from '@ant-design/plots';

import {selectLoadingTickets, selectTickets,getAllTicketsAsync} from '../Store/Reducers/ticketsReducer'

import {TICKET_PRIORIRY,TICKET_STATUS,TICKET_TYPE} from '../utils/tables'

const TicketPie = ({data=[]}) => {
  const config = {
    // appendPadding:0,
    // padding:0,
    data,
    renderer: 'svg',
    angleField: 'value',
    colorField: 'type',
    radius: .9,
    legend: {
      // layout: 'vertical',
      position: 'right',
      offsetX:-20
    },
    height : 200,
    width : 380,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  }
  return <Pie {...config} />;
}

const Dashboard = ()=> {

  const dispatch = useDispatch()
  const tickets = useSelector(selectTickets)
  const loading = useSelector(selectLoadingTickets)

  const [ticketTypes,setTicketTypes]= useState([])
  const [ticketStatus,setTicketStatus]= useState([])
  const [ticketsPriority,setTicketPriority]= useState([])
  
  const [projects,setProjects]= useState([])
  const [selectedProject,setSelectedProject]= useState('')
  const [projectTickets,setProjectTickets] = useState([])
  const [projectTicketTypes,setProjectTicketTypes]= useState([])
  const [projectTicketStatus,setProjectTicketStatus]= useState([])
  const [projectTicketsPriority,setProjectTicketPriority]= useState([])

  useEffect(()=>{
    dispatch(getAllTicketsAsync)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    const oPjs = tickets.map(tick =>tick.project).reduce((prev,cur)=>{
      prev[cur._id] = cur
      return prev
    },{})
    const pjs = []
    for (const property in oPjs) {
      pjs.push(oPjs[property],
      )
    }
    setProjects(pjs)
    setSelectedProject(pjs[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tickets])

  useEffect(()=>{
    const pjs = tickets.filter(tick =>tick.project._id===selectedProject._id)
    setProjectTickets(pjs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedProject])

  const formatTicketType = () =>{

    const reducer = (map, val) => {
      if (map[TICKET_TYPE[val]] == null) {
        map[TICKET_TYPE[val]] = 1;
      } else {
        ++map[TICKET_TYPE[val]];
      }
      return map;
    }

    const ticketType = tickets.map(tick =>tick.type).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_TYPE.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setTicketTypes(ticketTypesPieArray)
  }

  const formatTicketPriority = () =>{
    const reducer = (map, val) => {
      if (map[TICKET_PRIORIRY[val]] == null) {
        map[TICKET_PRIORIRY[val]] = 1;
      } else {
        ++map[TICKET_PRIORIRY[val]];
      }
      return map;
    }

    const ticketType = tickets.map(tick =>tick.priority).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_PRIORIRY.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setTicketPriority(ticketTypesPieArray)
  }

  const formatTicketStatus = () =>{
    const reducer = (map, val) => {
      if (map[TICKET_STATUS[val]] == null) {
        map[TICKET_STATUS[val]] = 1;
      } else {
        ++map[TICKET_STATUS[val]];
      }
      return map;
    }

    const ticketType = tickets.map(tick =>tick.status).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_STATUS.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setTicketStatus(ticketTypesPieArray)
  }

  const formatProjectTicketType = () =>{

    const reducer = (map, val) => {
      if (map[TICKET_TYPE[val]] == null) {
        map[TICKET_TYPE[val]] = 1;
      } else {
        ++map[TICKET_TYPE[val]];
      }
      return map;
    }

    const ticketType = projectTickets.map(tick =>tick.type).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_TYPE.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setProjectTicketTypes(ticketTypesPieArray)
  }

  const formatProjectTicketPriority = () =>{
    const reducer = (map, val) => {
      if (map[TICKET_PRIORIRY[val]] == null) {
        map[TICKET_PRIORIRY[val]] = 1;
      } else {
        ++map[TICKET_PRIORIRY[val]];
      }
      return map;
    }

    const ticketType = projectTickets.map(tick =>tick.priority).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_PRIORIRY.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setProjectTicketPriority(ticketTypesPieArray)
  }

  const formatProjectTicketStatus = () =>{
    const reducer = (map, val) => {
      if (map[TICKET_STATUS[val]] == null) {
        map[TICKET_STATUS[val]] = 1;
      } else {
        ++map[TICKET_STATUS[val]];
      }
      return map;
    }

    const ticketType = projectTickets.map(tick =>tick.status).reduce(reducer,{})
    const ticketTypesPieArray = []
    for (const property in ticketType) {
      ticketTypesPieArray.push({
        type: property,
        value: ticketType[property],
      })
    }
    TICKET_STATUS.forEach(type=>{
        if(!ticketType[type])
          ticketTypesPieArray.push({
            type,
            value: 0,
          })
    })
    setProjectTicketStatus(ticketTypesPieArray)
  }

  useMemo(formatTicketType,[tickets])
  useMemo(formatTicketPriority,[tickets])
  useMemo(formatTicketStatus,[tickets])
  useMemo(formatProjectTicketType,[projectTickets])
  useMemo(formatProjectTicketPriority,[projectTickets])
  useMemo(formatProjectTicketStatus,[projectTickets])

  const onSelectedProjectChange = (selected)=>{
    const pj = projects.find(element => element._id ===selected)
    setSelectedProject(pj)
  }
    return (
            !loading&&
            <div className="site-layout-background" style={{ padding: 10, minHeight: 360 }}>
              <Typography.Title  style={{ padding: 0 , margin : 0}} level={1}>Dashboard</Typography.Title>
              <Row justify='center' gutter={[10,10]}>
                  <Col >
                      <Card title={<Typography.Title  level={2}>Tickets</Typography.Title>} >
                        <Card.Meta title={<Typography.Title  level={4}>Total Number of tickets : {tickets.length}</Typography.Title>}/>
                        <Row justify='center' gutter={[10,10]}>
                          <Col span={{sm: 8,md: 12}}>
                              <TicketPie data= {ticketTypes}/>
                          </Col>
                          <Col span={{sm: 8,md: 12}} >
                              <TicketPie data= {ticketsPriority}/>
                          </Col>
                          <Col span={{sm: 8,md: 12}}>
                              <TicketPie data= {ticketStatus}/>
                          </Col>
                        </Row>
                      </Card>
                  </Col>
                  <Col >
                      <Card title={<Typography.Title  level={2}>Tickets per project</Typography.Title>}
                      >
                        <Card.Meta description={<Typography.Title  level={4}>Total Number of tickets : {projectTickets?.length}</Typography.Title>} title = {
                          <Select
                            value={selectedProject?._id}
                            onChange ={onSelectedProjectChange}
                            style={{ width: 250 }}
                            placeholder="Select a Project"
                          >
                              {projects.map((pj)=>(
                                <Select.Option value={pj._id} key = {pj._id}>{pj.name}</Select.Option>
                              ))}
                          </Select>}/>
                        <Row justify='center' gutter={[10,10]}>
                          <Col span={{sm: 8,md: 12}}>
                              <TicketPie data= {projectTicketTypes}/>
                          </Col>
                          <Col span={{sm: 8,md: 12}} >
                              <TicketPie data= {projectTicketsPriority}/>
                          </Col>
                          <Col span={{sm: 8,md: 12}}>
                              <TicketPie data= {projectTicketStatus}/>
                          </Col>
                        </Row>
                      </Card>
                  </Col>
              </Row>
            </div>
    )
  
}


export default Dashboard
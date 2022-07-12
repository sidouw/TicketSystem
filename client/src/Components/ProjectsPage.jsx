import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { Space,Button,Table} from 'antd';

import CreateProjectModal from './CreateProjectModal'
import {selectProjecs,deleteProjectAsync,selectLoadingProjecs,getProjectsAsync} from '../Store/Reducers/projectsReducer'
import { selectUser } from '../Store/Reducers/userReducer';

// Math.floor(Math.random() * 10)

const BrojectDeleteBtn = ({projectId})=>{
  const dispatch = useDispatch ()
  return (<Button type= 'link' onClick = {()=>dispatch (deleteProjectAsync(projectId))}>
    Delete</Button>)
}

const adminColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: 'enable',
    render: (text, record) =>( <Link to= {'/projects/'+record._id}>{text}</Link>),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'Description',
    ellipsis: 'enable',
    responsive: ['md'],

  },
  {
    title: 'Manage',
    key: 'action',
    ellipsis: 'enable',
    render: (text, record) => (
      <Space size="middle">
      {/* <Link to= '/projects/create' >Edit</Link>   */}
      <BrojectDeleteBtn projectId = {record._id}/>
      </Space>
    ),
  },
]
const devColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: 'enable',
    render: (text, record) =>( <Link to= {'/projects/'+record._id}>{text}</Link>),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'Description',
    ellipsis: 'enable',
    responsive: ['md'],

  },
]



// ---------------------------------------****-------------------------------------

const ProjectsPage = ()=> {

  const dispatch = useDispatch ()
  const projects = useSelector(selectProjecs)
  const loading = useSelector(selectLoadingProjecs)
  const {role} = useSelector(selectUser)

  const [visible, setVisible] = useState(false);
  
  
  useEffect(()=>{
    dispatch(getProjectsAsync)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    return (
            <div className="site-layout-background" style={{ padding: 10, minHeight: '100%' }}>
              
              <Space size= 'large' direction="vertical">
                {
                  role<=0&&
                  <>
                  <Button size= 'large' 
                  type= 'primary'
                  onClick={() => {
                    setVisible(true);
                  }}
                  >Create New Project</Button>  
                  <CreateProjectModal
                    visible={visible}
                    onCancel={() =>setVisible(false)}
                    />
                  </>
                }
                <Table
                pagination= {{position : ['bottomCenter']}}
                style={{ height: '72vh'}}
                loading= {loading}   
                columns={ role<=0? adminColumns:devColumns} 
                dataSource={projects.map((pr,index)=>{return {...pr,key:index}})} 
                title={() => (<h3>Projects</h3>)}
                />
              </Space>
            </div>
    )
  
}


export default ProjectsPage
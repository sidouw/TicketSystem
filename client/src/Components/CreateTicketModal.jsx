
import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'

import {Modal, Form, Input,Select} from 'antd';

import {selectProjecs,getProjectsAsync} from '../Store/Reducers/projectsReducer'
import {addTicketAsync} from '../Store/Reducers/ticketsReducer'

import {TICKET_TYPE} from '../utils/tables'

const { TextArea } = Input;
const { Option } = Select;


// ------------------------------*************-----------------
const CreateTicketModal = ({ visible, onCancel }) => {

  const dispatch = useDispatch()
  const projects = useSelector(selectProjecs)

  const [form] = Form.useForm();
  useEffect(()=>{
    dispatch(getProjectsAsync)
    // eslint-disable-next-line
  },[])


  const filterOptions = (input, option)=>{
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  // -------------*******----------------------
  return (
    <Modal
      visible={visible}
      title="Create new Ticket"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            values.type = TICKET_TYPE.findIndex(t=>t===values.type)
            dispatch(addTicketAsync({...values}))
            onCancel()

          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >

      <Form
        form={form}
        layout="vertical"
        name="mainform"
      >

        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of Project!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item  
          name="description" 
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please write a description !',
            },
          ]}
          >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
           name="project" 
           label="Project"
           rules={[
            {
              required: true,
              message: 'Please select a project!',
            },
          ]}>

            <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Project"
            optionFilterProp="children"
            filterOption={filterOptions}
          >
          {
            projects.map((op,index)=>
              <Option value={op._id} key = {index}>{op.name}</Option>
            )
          }
          </Select>
        </Form.Item>

        <Form.Item 
          name="type" 
          label="Type"
          rules={[
            {
              required: true,
              message: 'Please select the ticket type!',
            },
          ]}
          >
            <Select
            style={{ width: 200 }}
            placeholder="Select a Type"
          >
          {
            TICKET_TYPE.map((tp,index)=>
              <Option value={tp} key = {index}>{tp}</Option>
            )
          }
          </Select>
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

export default CreateTicketModal
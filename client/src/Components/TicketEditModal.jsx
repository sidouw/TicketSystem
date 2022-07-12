
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {Modal, Form, Input,Select} from 'antd';


import {TICKET_PRIORIRY,TICKET_STATUS,TICKET_TYPE} from '../utils/tables'
import {EditTicket} from '../utils/ticketsUtils'
import {setActiveTicket,selectActiveTicket} from '../Store/Reducers/ticketsReducer'

const { TextArea } = Input;
const { Option } = Select;
// ------------------------------*************-----------------



const TicketEditModal = ({visible, onCancel }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const ticket = useSelector(selectActiveTicket)
  // -------------*******----------------------
  return (
    <Modal
      visible={visible}
      title="Edit Ticket"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            values.priority = TICKET_PRIORIRY.findIndex(t=>t===values.priority)
            values.status = TICKET_STATUS.findIndex(t=>t===values.status)
            values.type = TICKET_TYPE.findIndex(t=>t===values.type)
            values._id=ticket._id
            EditTicket(values).then((t)=>{
              const newTicket = {...t}
              newTicket.submiter = ticket.submiter
              newTicket.developer = ticket.developer
              newTicket.project = ticket.project
              dispatch(setActiveTicket(newTicket))
              onCancel()
            })
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
          initialValue = {ticket.title}
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of Project!',
            },
          ]}
        >
          <Input  />
        </Form.Item>

        <Form.Item 
        initialValue = {ticket.description}  
        name="description" 
        label="Description">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item 
        initialValue = {TICKET_PRIORIRY[ticket.priority]} 
        name="priority" 
        label="Priority">
            <Select
                
                style={{ width: 200 }}
                placeholder="Select a Priority"
            >
            {
                TICKET_PRIORIRY.map((tp,index)=>
                <Option value={tp} key = {index}>{tp}</Option>
                )
            }
            </Select>
        </Form.Item>

        <Form.Item 
        initialValue = {TICKET_TYPE[ticket.type]} 
        name="type" 
        label="Type">
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

        <Form.Item 
        initialValue = {TICKET_STATUS[ticket.status]} 
        name="status" 
        label="Status">
            <Select
                
                style={{ width: 200 }}
                placeholder="Select a status"
            >
            {
                TICKET_STATUS.map((tp,index)=>
                <Option value={tp} key = {index}>{tp}</Option>
                )
            }
            </Select>
        </Form.Item>

        {/* <Form.Item
         initialValue = {ticket.developoer._id} 
         name="developer" 
         label="Developer">
            <Select
                defaultValue = {ticket.assignedDev}
                style={{ width: 200 }}
                placeholder="Select a Developer"
            >
            {
                TicketTypes.map((tp,index)=>
                <Option value={tp} key = {index}>{tp}</Option>
                )
            }
            </Select>
        </Form.Item> */}
        
      </Form>
    </Modal>
  );
};


export default TicketEditModal
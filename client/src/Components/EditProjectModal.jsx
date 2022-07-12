
import React  from 'react';
import {useDispatch,useSelector} from 'react-redux'

import {Modal, Form, Input} from 'antd';

import {selectActiveProject,setActiveProject} from '../Store/Reducers/projectsReducer'
import {editProject} from '../utils/projectsUtils'
const { TextArea } = Input;


// ------------------------------*************-----------------
const EditrojectModal = ({ visible, onCancel }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const project = useSelector(selectActiveProject)
  return (
    <Modal
      visible={visible}
      title="Edit Project"
      okText="Edit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values._id = project._id
            // form.resetFields();
            editProject(values).then((data)=>{
              dispatch(setActiveProject(data))
              onCancel()
            })
            
            onCancel()
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >

    <Form.Provider
    onFormFinish={(name, { values, forms }) => {
      // for forms inside forms
    }}
  >
      <Form
        form={form}
        layout="vertical"
        name="mainform"
      >
        <Form.Item
          name="name"
          label="Name"
          initialValue={project.name}
          rules={[
            {
              required: true,
              message: 'Please input the name of Project!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item  
        name="description" 
        label="Description"
        initialValue={project.description}
        >
          <TextArea rows={3} />
        </Form.Item>


      </Form>

      </Form.Provider>
    </Modal>
  );
};

export default EditrojectModal
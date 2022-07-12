
import React  from 'react';
import {useDispatch} from 'react-redux'

import {Modal, Form, Input} from 'antd';

import {addProjectAsync} from '../Store/Reducers/projectsReducer'

const { TextArea } = Input;


// ------------------------------*************-----------------
const CreateProjectModal = ({ visible, onCancel }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()

  return (
    <Modal
      visible={visible}
      title="Create new Project"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            dispatch(addProjectAsync({...values}))
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
          rules={[
            {
              required: true,
              message: 'Please input the name of Project!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item  name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>


      </Form>

      </Form.Provider>
    </Modal>
  );
};

export default CreateProjectModal
import React, { useState,useEffect } from 'react';
import { Button, Modal, message, Form, Input, Select } from 'antd';
import axios from "axios";
import { base_url } from "../constants";
const { Option } = Select;


const ModalDesc = ({ data, isModalOpen, setIsModalOpen, update, id,leftGridRef }) => {
  const [form] = Form.useForm()

  const handleCreate = (value) => {
    try {
          axios.post(`${base_url}/task`, value).then((response) => {
            const transaction = {
              add: [response.data],
            };
            leftGridRef.current.api.applyTransaction(transaction);
            message.success('task created')
            setIsModalOpen(false)
        });
      } catch (error) {
        message.error(error)
      }
}

  useEffect(() => {
    if (data) {
      form.resetFields()
      form.setFieldsValue({ ...data })
    }
    else {
      form.resetFields()
    }
  }, [form, data]);

  return (
    <>
      <Modal title={data?.name} open={isModalOpen} footer={false} onCancel={()=>{setIsModalOpen(false)}}>
      <Form
          layout='horizontal'
          form={form}
    // labelCol={{
    //   span: 8,
    // }}
    // wrapperCol={{
    //   span: 16,
    // }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
          onFinish={(values) => {
            values.projectId = id
            if (data) {
            values._id = data._id
            update(values)
            }
            else {
              handleCreate(values)
            }
          }}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
        >
          
          <Form.Item
      label="Name"
      name="name"
    >
       <Input />
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
    >
       <Input.TextArea />
    </Form.Item>

    <Form.Item
        name="priority"
        label="Priority"
      >
        <Select placeholder="Select">
          <Option value="URGENT">URGENT</Option>
          <Option value="NORMAL">NORMAL</Option>
          <Option value="HIGH">HIGH</Option>
          <Option value="LOW">LOW</Option>
        </Select>
      </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form.Item>
  </Form>
      </Modal>
    </>
  );
};
export default ModalDesc;
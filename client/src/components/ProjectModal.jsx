import React, { useEffect, useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Select, message } from 'antd';
import axios from "axios";
import { base_url } from "../constants";



const ProjectModal = ({ data, isModalOpen, setIsModalOpen,getProjects }) => {

  const [form] = Form.useForm()
    const handleCreate = (value) => {
        try {
            axios.post(`${base_url}/project`, value).then((response) => {
                console.log(response.data)
                setIsModalOpen(false)
                message.success('board created')
                getProjects()
            });
          } catch (error) {
            message.error(error)
          }
    }
    
  const handleUpdate = (value, data) => {
      try {
        axios.patch(`${base_url}/project/${data?._id}`, value).then((response) => {
            console.log(response.data)
            setIsModalOpen(false)
            message.success('board updated')
            getProjects()
        });
      } catch (error) {
        message.error(error)
      }
  };
  
  useEffect(() => {
    if (data) {
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
    form={form}
    layout='horizontal'
    // labelCol={{
    //   span: 8,
    // }}
    wrapperCol={{
      span: 18,
    }}
    style={{
      maxWidth: 600,
    }}
    // initialValues={{
    //   ...data,
    // }}
    onFinish={(values)=> data? handleUpdate(values, data) : handleCreate(values)}
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
export default ProjectModal;
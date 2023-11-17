import {
    Card,
    Col,
    Collapse,
    Row,
    Menu,
  Spin,
  Dropdown,
  Button,
  Popconfirm
} from "antd";
import { PlusOutlined,MoreOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../constants";
import ProjectModal from "./ProjectModal";

function Projects() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [data, setData] = useState(null);


  const getProjects = () => {
    try {
      axios.get(`${base_url}/project`).then((response) => {
        setProjects(response?.data);
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = (value) => {
    try {
      axios.delete(`${base_url}/project/${value?._id}`).then((response) => {
        getProjects()
      });
    } catch (error) {
      console.log(error)
    }
  };

  function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100 for pastel
    const lightness = Math.floor(Math.random() * 40) + 60; // 60-80 for pastel
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  
  useEffect(() => {
    getProjects()
  }, []);

  const handleClick  = (e) => {
    e.stopPropagation();
}





  return (
    <Spin spinning={loading}>
      <PlusOutlined onClick={() => {
        setData(null)
        setCreateModal(true)
      }} style={{ fontSize: "40px", float: 'right', cursor: "pointer", color:"#fff" }} />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 20 }}>
          {projects.map((project, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 12, offset: 0 }}
              md={{ span: 8, offset: 0 }}
              lg={{ span: 6, offset: 0 }}
              style={{ padding: "30px 20px" }}
              key={project._id}
            >
                  <Card
                      style={{
                  backgroundColor: generatePastelColor(),
                        height:"140px"
                      }}
                key={project._id}
                loading={loading}
                extra={
                  <Dropdown
                    overlay={
                    <Menu>
                      <Menu.Item
                        key="1"
                        icon={<EditOutlined />}
                          onClick={(e) => {
                        e.domEvent.stopPropagation()
                        setData(project)
                        setCreateModal(true)
                        }}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        key="2"
                        icon={<DeleteOutlined />}
                          onClick={(e) => {
                          e.domEvent.stopPropagation()
                          handleDelete(project)
                        }}
                      >
                        Delete
                      </Menu.Item>
                    </Menu>
                  }>
                    <Button type="text" onClick={(e)=>e.stopPropagation()}>
                      <MoreOutlined />
                    </Button>
                  </Dropdown>
                }
                onClick={(e) => {
                  console.log('clicked')
                  navigate(`/kanban/${project._id}`);
                }
                }
                      hoverable
                      title={project.name}
                  >
                   {project.description}
              </Card>
            </Col>
          ))}{" "}
      </Row>
      <ProjectModal data={data} getProjects={getProjects} isModalOpen={createModal} setIsModalOpen={setCreateModal} />
      </Spin>
  )
}

export default Projects
  


import React,{useState,useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { CalendarOutlined, ContainerOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { base_url } from "../constants";
import axios from "axios";


const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const getProjects = async() => {
    try {
      const response = await axios.get(`${base_url}/project`)
      setProjects(response?.data) 
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getProjects()
  }, []);

  return (
    <Sider  width={200} style={{backgroundColor:"#000"}} theme="light" trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        style={{ backgroundColor: "#000", color:"#fff" }} 
        
        theme="light"
        mode="inline"
      >
        <Menu.Item key="home" icon={<CalendarOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <SubMenu key="kanban" icon={<ContainerOutlined />} title="kanban">
        {projects && projects?.map((item) => (
          <Menu.Item key={item._id} onClick={()=>navigate(`/kanban/${item._id}`)}>
          {item.name}
        </Menu.Item>
      ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;

import React,{useState} from 'react';
import { Layout,Button,Row,Col,ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import Kanban from './pages/Kanban';
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';


const { Content, Header, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#000',

        // // Alias Token
        // colorBgContainer: '#000',
      },
    }}
  >
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header
           style={{
              paddingLeft: 20,
              paddingBottom: 20,
              color: "#fff",
              alignContent: 'center',
              backgroundColor:"#000"
            }}>
             <Row>
          <Col span={12}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
              style={{
              color:"#fff",
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
                />
              </Col>
              <Col span={12}>
                <h3>Kanban Boards</h3>
                </Col></Row>
          </Header>
          <Content style={{ padding: '24px', minHeight: '280px', backgroundColor:"#181d1f" }}>
            <Routes>
              <Route path="/" exact element={<Projects/>} />
              <Route path="/kanban/:id" element={<Kanban/>} />
            </Routes>
          </Content>
          <Footer style={{backgroundColor:"#181d1f", textAlign: 'center',}}>Created by Tuba Raj ©2023 </Footer>
        </Layout>
      </Layout>
      </Router>
      </ConfigProvider>
  );
};

export default App;

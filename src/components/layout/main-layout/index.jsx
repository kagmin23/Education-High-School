import { HomeOutlined, InsertRowAboveOutlined, SignatureOutlined, SnippetsOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../../pages/footer';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (coll) => {
    setCollapsed(coll);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
        {/* Replace the logo text with an image */}
        <div className="text-center ">
          <img
            src="https://st2.depositphotos.com/4398873/9234/v/450/depositphotos_92345772-stock-illustration-education-logo-concept.jpg" // Update this path to your logo image
            alt="Logo"
            style={{ width: '100%', height: '100%', maxHeight: '170px' }} // Adjust the styles as needed
          />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" icon={<HomeOutlined />} title="Tuỳ chọn">
            <Menu.Item key="1-1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="1-2">
              <Link to="/info">Thông tin</Link>
            </Menu.Item>
            <Menu.Item key="1-3">
              <Link to="/achievement">Thành tích</Link>
            </Menu.Item>
            <Menu.Item key="1-4">
              <Link to="/event">Sự kiện</Link>
            </Menu.Item>
            <Menu.Item key="1-5">
              <Link to="/activity">Hoạt động</Link>
            </Menu.Item>
            <Menu.Item key="1-6">
              <Link to="/blog">Blog</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<InsertRowAboveOutlined />}>
            <Link to="/login/student">Thời Khoá Biểu</Link>
          </Menu.Item>

          <SubMenu key="sub2" icon={<SignatureOutlined />} title="Lịch Kiểm tra">
            <Menu.Item key="3-1">
              <Link to="/login/student">Kiểm tra lớp</Link>
            </Menu.Item>
            <Menu.Item key="3-2">
              <Link to="/login/student">Học kỳ</Link>
            </Menu.Item>
            <Menu.Item key="3-3">
              <Link to="/login/student">Tốt nghiệp</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4" icon={<SnippetsOutlined />}>
            <Link to="/login/student">Tài liệu Giáo án</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/login/parent">Phụ huynh</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content Area */}
      <Layout>
        {/* Header */}
        <Header className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-500">
          <h1 className="text-2xl font-bold tracking-wider text-transparent uppercase bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse drop-shadow-lg">
            Cổng thông tin Giáo dục Trung học
          </h1>
        </Header>

        {/* Flexbox Layout to ensure footer stays at the bottom */}
        <div className="flex flex-col min-h-screen">
          {/* Content */}
          <Content className="flex-grow p-1 m-1 rounded-lg shadow-md bg-blue-50">
            <Outlet />
          </Content>

          {/* Footer */}
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

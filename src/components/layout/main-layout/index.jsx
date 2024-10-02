import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../../../pages/footer';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="py-4 text-lg text-center text-white bg-blue-300">Logo</div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/">Danh hiệu</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/">Blog</Link>
          </Menu.Item>
        </Menu>

        {/* Login and Register Buttons */}
        <div className="flex flex-row items-center justify-center mt-5">
          <Button type="link" className="text-white">
            <Link to="/select-role-login">Đăng nhập</Link>
          </Button>
          <Button type="link" className="text-white">
            <Link to="/">Đăng ký</Link>
          </Button>
        </div>
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
          <Content className="flex-grow p-2 m-2 bg-white rounded-lg shadow-md">
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

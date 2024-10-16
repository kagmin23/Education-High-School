import { HomeOutlined, InsertRowAboveOutlined, LineChartOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, SignatureOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../../../pages/footer';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleCollapse = (coll) => {
    setCollapsed(coll);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa thông tin đăng nhập
    navigate('/'); // Chuyển hướng đến trang đăng nhập
  };

  // Dropdown menu items
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        <Link to="/student/profile">Hồ sơ cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/student/settings">Cài đặt</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  // Sample user data, replace with actual data
  const userName = "Nguyễn Văn A";
  const userClass = "Lớp 10A1";

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
        <div className="text-center">
          <img
            src="https://st2.depositphotos.com/4398873/9234/v/450/depositphotos_92345772-stock-illustration-education-logo-concept.jpg" // Update the path to your logo image
            alt="Logo"
            style={{ width: '100%', height: '100%', maxHeight: '170px' }} // Adjust the styles as needed
          />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" icon={<HomeOutlined />} title="Tuỳ chọn">
            <Menu.Item key="1-1">
              <Link to="/student">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="1-2">
              <Link to="/student/info">Thông tin</Link>
            </Menu.Item>
            <Menu.Item key="1-3">
              <Link to="/student/achievements">Thành tích</Link>
            </Menu.Item>
            <Menu.Item key="1-4">
              <Link to="/student/event">Sự kiện</Link>
            </Menu.Item>
            <Menu.Item key="1-5">
              <Link to="/student/activity">Hoạt động</Link>
            </Menu.Item>
            <Menu.Item key="1-6">
              <Link to="/student/blog">Blog</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="2" icon={<InsertRowAboveOutlined />}>
            <Link to="/student/timetable-student">Thời Khoá Biểu</Link>
          </Menu.Item>

          <SubMenu key="sub2" icon={<SignatureOutlined />} title="Lịch Kiểm tra">
            <Menu.Item key="3-1">
              <Link to="/student/exams/class">Kiểm tra lớp</Link>
            </Menu.Item>
            <Menu.Item key="3-2">
              <Link to="/student/exams/semester">Học kỳ</Link>
            </Menu.Item>
            <Menu.Item key="3-3">
              <Link to="/student/exams/graduation">Tốt nghiệp</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="4" icon={<SnippetsOutlined />}>
            <Link to="/student/materials">Tài liệu Giáo án</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LineChartOutlined />}>
            <Link to="/student/do-test">Kiểm tra trắc nghiệm</Link>
          </Menu.Item>
        </Menu>

      </Sider>

      {/* Main Content Area */}
      <Layout>
        <Header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500">
          {/* Centered Title */}
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold tracking-wider text-transparent uppercase bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse drop-shadow-lg">
              Cổng thông tin Giáo dục Trung học
            </h1>
          </div>

          {/* Avatar Section with Dropdown */}
          <Dropdown overlay={menu} trigger={['hover']}>
            <div className="flex flex-row items-center gap-3 cursor-pointer">
              <Avatar
                size="default"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&s"
                alt="User Avatar"
              />
              <div className="flex flex-col">
                <div className="text-sm text-white">{userName}</div>
                <div className="text-xs text-white underline">{userClass}</div>
              </div>
            </div>
          </Dropdown>
        </Header>

        {/* Content and Footer */}
        <div className="flex flex-col min-h-screen">
          <Content className="flex-grow p-1 m-1 rounded-lg shadow-md bg-blue-50">
            <Outlet />
          </Content>
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;

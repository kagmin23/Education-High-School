import {
    CalendarOutlined,
    ClusterOutlined,
    DashboardOutlined,
    GiftOutlined,
    IdcardOutlined,
    MergeOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/HSchool_Logo_Admin.png'; // Đảm bảo rằng đường dẫn đến file logo là chính xác

const { Sider } = Layout;

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Hàm điều hướng khi click vào các mục trong menu
  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      className="min-h-screen bg-gray-800"
      breakpoint="lg"
      collapsedWidth="80"
    >
      {/* Hiển thị logo */}
      <div className="flex items-center justify-center my-4">
        <img
          src={logo}
          alt="Logo"
          className={`transition-all duration-300 ${collapsed ? 'w-12' : 'w-20'}`} // Điều chỉnh kích thước logo dựa trên trạng thái collapsed
        />
      </div>
      {/* Chỉ hiện chữ Admin Panel khi sidebar không bị thu gọn */}
      {!collapsed && (
        <div className="my-6 text-center text-white">
          <h1 className="pb-4 text-2xl font-bold">Admin Panel</h1>
        </div>
      )}
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleMenuClick}
        defaultSelectedKeys={['/']}
        className="bg-gray-800"
      >
        <Menu.Item key="/admin/dashboard" icon={<DashboardOutlined />}>
          Tổng quan
        </Menu.Item>
        <Menu.Item key="/admin/manager/infos" icon={<GiftOutlined />}>
          Thông tin
        </Menu.Item>
        <Menu.Item key="/admin/manager/class" icon={<ClusterOutlined />}>
          Quản lý Lớp
        </Menu.Item>
        <Menu.Item key="/admin/manager/teachers" icon={<TeamOutlined />}>
          Quản lý Giáo viên
        </Menu.Item>
        <Menu.Item key="/admin/manager/students" icon={<UserOutlined />}>
          Quản lý Học sinh
        </Menu.Item>
        <Menu.Item key="/admin/manager/activities" icon={<MergeOutlined />}>
          Quản lý Hoạt động
        </Menu.Item>
        <Menu.Item key="/admin/manager/events" icon={<CalendarOutlined />}>
          Quản lý Sự kiện
        </Menu.Item>
        <Menu.Item key="/admin/manager/achievements" icon={<TrophyOutlined />}>
          Quản lý Danh hiệu
        </Menu.Item>
        <Menu.Item key="/admin/manager/awards" icon={<GiftOutlined />}>
          Quản lý Giải thưởng
        </Menu.Item>
        <Menu.Item key="/admin/manager/blogs" icon={<IdcardOutlined />}>
          Quản lý Blog
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdmin;

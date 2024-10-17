import { LogoutOutlined, PieChartOutlined, ReadOutlined, SignatureOutlined, SnippetsOutlined, SolutionOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SidebarTeacher = () => {
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng

  const handleLogout = () => {
    // Xóa token hoặc thông tin người dùng từ localStorage
    localStorage.removeItem('token'); // Thay đổi 'token' thành tên khóa bạn đang sử dụng
    navigate('/'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <div className="site-layout-background" style={{ width: '256px' }}>
      <div className="text-center">
        <SolutionOutlined className="mt-8 text-5xl text-orange-600" />
      </div>
      <p className="mt-2 text-center text-orange-600 mb-9">Trang quản lý dành cho Giáo viên</p>
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/teacher">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
          <Link to="/teacher/homeroom">Chủ nhiệm</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ReadOutlined />}>
          <Link to="/teacher/lesson-plan">Giáo án</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SnippetsOutlined />}>
          <Link to="/teacher/document">Tài liệu</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SignatureOutlined />}>
          <Link to="/teacher/test-exam">Bài kiểm tra</Link>
        </Menu.Item>

        {/* Nút Đăng xuất */}
        <Button
          type="link"
          onClick={handleLogout}
          className="w-full mt-5 text-red-500"
        >
          Đăng xuất <LogoutOutlined />
        </Button>
      </Menu>
    </div>
  );
};

export default SidebarTeacher;

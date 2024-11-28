import {
    ArrowLeftOutlined,
    SettingOutlined,
    UserAddOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const ProfileStudentSidebar = () => {
    // Lấy dữ liệu người dùng đã đăng nhập
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Lấy thông tin người dùng đã đăng nhập
    console.log("loggedInUserPro", loggedInUser)
    const userAccountsData = JSON.parse(localStorage.getItem('userAccountsData')) || []; // Lấy dữ liệu tất cả người dùng

    // Tìm thông tin người dùng tương ứng với người dùng đã đăng nhập
    const userData = userAccountsData.find(user => user.id === loggedInUser.id); // Giả sử người dùng có trường 'id'
    const userImage = userData?.imageUrl || ''; // Lấy hình ảnh của người dùng

    return (
        <Sider width={256} className="site-layout-background">
            {/* Hiển thị hình ảnh người dùng */}
            <div className="flex items-center justify-center p-4">
                {userImage && (
                    <img src={userImage} alt="User" className="object-cover w-20 h-20 rounded-full" />
                )}
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/student/profile">Hồ sơ cá nhân</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SettingOutlined />}>
                    <Link to="/student/settings">Cài đặt</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserAddOutlined />}>
                    <Link to="/student/register-parent">Đăng ký Phụ huynh</Link>
                </Menu.Item>
            </Menu>
            {/* Nút Thoát */}
            <div className="fixed bottom-0 p-4 left-14">
                <Button type="link" icon={<ArrowLeftOutlined />} className="text-left">
                    Thoát
                </Button>
            </div>
        </Sider>
    );
};

export default ProfileStudentSidebar;

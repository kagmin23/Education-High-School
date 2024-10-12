import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 bg-blue-600">
      <div className="flex justify-between">
        <h1 className="text-xl text-white">High School Education</h1>
        <div>
          <Link to="/select-role-login"><Button type="link" className="text-white">Đăng Nhập</Button></Link>
          <Link to="/register"><Button type="link" className="text-white">Đăng Ký</Button></Link>
        </div>
      </div>

      <Menu
        mode="horizontal"
        className="pt-3 bg-blue-600"
        defaultSelectedKeys={['home']}
      >
        <Menu.Item key="home" icon={<HomeOutlined />} className="!text-white">
          Trang chủ
        </Menu.Item>
        <Menu.Item key="courses" icon={<BookOutlined />} className="!text-white">
          Bài học
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />} className="!text-white">
          Đội ngũ
        </Menu.Item>
      </Menu>
    </header>
  );
};

export default Header;

import { BookOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const Header = () => {
  return (
    <header className="p-4 bg-blue-600">
      <h1 className="text-3xl text-white">High School Education</h1>
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

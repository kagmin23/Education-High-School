import { KeyOutlined, SolutionOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const RoleSelectionPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      {/* Outer Container with Increased Width and Padding */}
      <div className="w-full p-12 bg-white rounded-lg shadow-lg max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">Bạn muốn đăng nhập với Vai trò?</h1>

        {/* Container for Role Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          
          {/* Parent Role Card */}
          <div className="flex flex-col items-center p-8 transition-transform transform border rounded-lg shadow-lg hover:scale-105 bg-gray-100 min-h-[250px]">
            <UsergroupAddOutlined className="mb-4 text-4xl text-blue-600" />
            <h2 className="mb-3 text-lg font-bold">Phụ huynh</h2>
            <p className="mb-5 text-gray-600 whitespace-nowrap">Đăng nhập với tư cách phụ huynh</p>
            <Link to="/login/parent">
              <Button type="primary" size="large">Chọn</Button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">Bạn là phụ huynh?</p> {/* Dòng nhỏ mới thêm vào */}
          </div>

          {/* Student Role Card */}
          <div className="flex flex-col items-center p-8 transition-transform transform border rounded-lg shadow-lg hover:scale-105 bg-gray-100 min-h-[250px]">
            <UserOutlined className="mb-4 text-4xl text-green-600" />
            <h2 className="mb-3 text-lg font-bold">Học sinh</h2>
            <p className="mb-5 text-gray-600 whitespace-nowrap">Đăng nhập với tư cách học sinh</p>
            <Link to="/login/student">
              <Button type="primary" size="large">Chọn</Button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">Bạn là học sinh?</p> {/* Dòng nhỏ mới thêm vào */}
          </div>

          {/* Teacher Role Card */}
          <div className="flex flex-col items-center p-8 transition-transform transform border rounded-lg shadow-lg hover:scale-105 bg-gray-100 min-h-[250px]">
            <SolutionOutlined className="mb-4 text-4xl text-orange-600" />
            <h2 className="mb-3 text-lg font-bold">Giáo viên</h2>
            <p className="mb-5 text-gray-600 whitespace-nowrap">Đăng nhập với tư cách giáo viên</p>
            <Link to="/login/teacher">
              <Button type="primary" size="large">Chọn</Button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">Bạn là giáo viên?</p> {/* Dòng nhỏ mới thêm vào */}
          </div>

          {/* Admin Role Card */}
          <div className="flex flex-col items-center p-8 transition-transform transform border rounded-lg shadow-lg hover:scale-105 bg-gray-100 min-h-[250px]">
            <KeyOutlined className="mb-4 text-4xl text-red-600" />
            <h2 className="mb-3 text-lg font-bold">Admin</h2>
            <p className="mb-5 text-gray-600 whitespace-nowrap">Đăng nhập với tư cách admin</p>
            <Link to="/login/admin">
              <Button type="primary" size="large">Chọn</Button>
            </Link>
            <p className="mt-2 text-xs text-gray-500">Bạn là admin?</p> {/* Dòng nhỏ mới thêm vào */}
          </div>
          
        </div>

        {/* Note below the Role Cards */}
        <div className="mt-8 italic text-center text-gray-600">
          <p>* Vui lòng hãy lựa chọn vai trò đúng với tài khoản đã được cung cấp hoặc đăng ký tại nhà trường!</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;

import { ArrowLeftOutlined, KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dữ liệu cứng cho giáo viên
  const accountTestAdmin = {
    username: 'admin',
    password: '123',
  };

  // Xử lý khi form đăng nhập được submit
  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const { username, password } = values;

      // Kiểm tra thông tin đăng nhập với dữ liệu cứng
      if (username === accountTestAdmin.username && password === accountTestAdmin.password) {
        toast.success('Đăng nhập thành công!');
        // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
        navigate('/admin/dashboard');
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    }, 1000); // Giả lập thời gian chờ xử lý
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Nút quay lại */}
        <Button
          icon={<ArrowLeftOutlined />}
          className="absolute z-10 top-4 left-4" // Added z-index
          onClick={() => navigate(-1)}
          type="link"
        />
        <div className="text-center">
          <KeyOutlined className="mb-8 text-5xl text-orange-600" />
        </div>
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Admin đăng nhập</h2>

        <Form
          name="login_admin"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* Tên đăng nhập */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          {/* Ghi nhớ tôi */}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a className="float-right" href="/forgot-password">
              Quên mật khẩu?
            </a>
          </Form.Item>

          {/* Nút đăng nhập */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full login-form-button" loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <p className="px-5 pt-3 text-xs text-center text-red-500">
            * Trang quản trị quản lý nội bộ trường THPT chỉ dành riêng cho đội ngũ cán bộ phân công!{' '}
            {/* <a href="/signup/admin" className="text-blue-500">
              Đăng ký ngay
            </a> */}
          </p>
        </Form>

        {/* Toast Container để hiển thị thông báo */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginAdmin;

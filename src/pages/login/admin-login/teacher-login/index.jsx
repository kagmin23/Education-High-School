import { ArrowLeftOutlined, LockOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginTeacher = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [accountsTestTeacher, setAccountsTestTeacher] = useState([]);

  // Load teacher accounts from localStorage on component mount
  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem('teacherAccountsData')) || [];
    setAccountsTestTeacher(storedAccounts);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const { username, password } = values;
  
      const accountFound = accountsTestTeacher.find(
        (account) => account.username === username && account.password === password
      );
  
      if (accountFound) {
        // Lưu thông tin user đã login vào localStorage
        localStorage.setItem('currentTeacher', JSON.stringify(accountFound));
  
        notification.success({
          message: 'Đăng nhập thành công!',
          description: 'Bạn đã đăng nhập thành công vào trang Quản lý dành cho Giáo viên.',
        });
        navigate('/teacher');
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng!');
      }
    }, 1000);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Nút quay lại */}
        <Button
          icon={<ArrowLeftOutlined />}
          className="absolute z-10 top-4 left-4"
          onClick={() => navigate(-1)}
          type="link"
        />
        <div className="text-center"><SolutionOutlined className="mb-8 text-5xl text-orange-600" /></div>
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Giáo viên đăng nhập</h2>

        <Form
          name="login_teacher"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a className="float-right" href="/forgot-password">
              Quên mật khẩu?
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full login-form-button" loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>

          <p className="px-5 pt-3 text-xs text-center text-red-500">
            * Bạn là giáo viên tại trường? Hãy đăng nhập đúng với tài khoản đã được cung cấp từ nhà trường!{' '}
          </p>
        </Form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginTeacher;

import { ArrowLeftOutlined, LockOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginParent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dữ liệu cứng cho phụ huynh
  const accountTestParent = {
    username: 'phuhuynh',
    password: '123',
  };

  // Hàm mở thông báo với mô tả
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,  // Thêm mô tả ở đây
      placement: 'topRight',
    });
  };

  // Xử lý khi form đăng nhập được submit
  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const { username, password } = values;

      // Kiểm tra thông tin đăng nhập với dữ liệu cứng
      if (username === accountTestParent.username && password === accountTestParent.password) {
        openNotificationWithIcon(
          'success', 
          'Đăng nhập thành công!', 
          'Bạn đã đăng nhập thành công.'
        );
        // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
        navigate('/parent');
      } else {
        openNotificationWithIcon(
          'error', 
          'Đăng nhập không thành công!', 
          'Tên đăng nhập hoặc mật khẩu không đúng!'
        );
      }
    }, 1000); // Giả lập thời gian chờ xử lý
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Nút quay lại */}
        <Button
            icon={<ArrowLeftOutlined />}
            className="absolute top-4 left-4"
            onClick={() => navigate(-1)}
            type="link"
        />

        <div className="text-center">
          <UsergroupAddOutlined className="mb-8 text-5xl text-orange-600" />
        </div>
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Phụ huynh đăng nhập</h2>

        <Form
          name="login_parent"
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

          <p className="text-center text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <a href="/signup/parent" className="text-blue-500">
              Đăng ký ngay
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LoginParent;

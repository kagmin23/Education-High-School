// Login.jsx
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from '@mui/material';
import { Button, Form, Input } from 'antd';
import 'antd/dist/reset.css';
import React from 'react';
import './main.css';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover login-container">
      <div className="absolute inset-0 bg-blue-600 opacity-50 overlay"></div>

      <div className="relative z-10 w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl login-box md:max-w-md lg:max-w-lg">
        <div className="mb-8 text-center">
          <Typography variant="h3" className="font-bold text-white">
            Chào Mừng Đến Hệ Thống Giáo Dục
          </Typography>
          <Typography variant="h6" className="text-gray-300">
            Hãy đăng nhập để tiếp tục
          </Typography>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-6"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên tài khoản"
              size="large"
              className="rounded-full"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
              size="large"
              className="rounded-full"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 text-lg rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:to-purple-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <Typography variant="body2" className="text-white">
            Chưa có tài khoản? <a href="#" className="text-yellow-400 hover:underline">Đăng ký ngay</a>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;

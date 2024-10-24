import {
  ArrowLeftOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  const { Option } = Select;
  
  const RegisterStudent = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    // Kiểm tra vai trò người dùng khi truy cập trang
    useEffect(() => {
      checkUserRole();
    }, []);
  
    // Hàm kiểm tra vai trò của người dùng từ localStorage
    const checkUserRole = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'student') {
          navigate('/student/homepage');
        } else {
          // Nếu không phải student, chuyển hướng về trang phù hợp
        }
      }
    };
  
    // Hàm xử lý khi form đăng ký hoàn tất
    const onFinish = (values) => {
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
  
        // Lưu thông tin đăng ký vào localStorage
        const userData = {
          username: values.username,
          email: values.email,
          phone: values.phone_number,
          role: 'student', // Vai trò là student
        };
  
        // Lưu vào localStorage
        localStorage.setItem('user', JSON.stringify(userData));
  
        toast.success('Đăng ký thành công!');
        navigate('/student/homepage');
      }, 1000);
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600">
        <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
          {/* Nút quay lại */}
          <Button
            icon={<ArrowLeftOutlined />}
            className="absolute top-4 left-4"
            onClick={() => navigate(-1)}
            type="link"
          />
          <div className="text-center">
            <UserOutlined className="mb-8 text-5xl text-green-600" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Đăng ký dành cho Học sinh
          </h2>
  
          <Form
            name="register_student"
            className="register-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                {/* Tên đăng nhập */}
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="mr-1 site-form-item-icon " />}
                    placeholder="Tên đăng nhập"
                  />
                </Form.Item>
  
                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="mr-1 site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
  
                {/* Số điện thoại */}
                <Form.Item
                  label="Số điện thoại"
                  name="phone_number"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input
                    prefix={<PhoneOutlined className="mr-1 site-form-item-icon" />}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
              </Col>
  
              <Col xs={24} sm={12}>
                {/* Lớp */}
                <Form.Item
                  label="Lớp"
                  name="grade"
                  rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]}
                >
                  <Select placeholder="Chọn lớp">
                    <Option value="10A">10A</Option>
                    <Option value="11A">11A</Option>
                    <Option value="12A">12A</Option>
                  </Select>
                </Form.Item>
  
                {/* Mật khẩu */}
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="mr-1 site-form-item-icon" />}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
  
                {/* Xác nhận mật khẩu */}
                <Form.Item
                  label="Xác nhận mật khẩu"
                  name="confirm_password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="mr-1 site-form-item-icon" />}
                    placeholder="Xác nhận mật khẩu"
                  />
                </Form.Item>
              </Col>
            </Row>
  
            {/* Nút đăng ký */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                Đăng ký
              </Button>
            </Form.Item>
  
            {/* Điều khoản sử dụng */}
            <p className="text-center text-gray-600">
              Bằng việc đăng ký tài khoản, bạn đồng ý với{' '}
              <a href="/terms" className="text-blue-500">
                điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="/rules" className="text-blue-500">
                nội quy của nhà trường
              </a>.
            </p>
  
            <p className="text-center text-gray-600">
              Bạn đã có tài khoản?{' '}
              <a href="/select-role-login" className="text-blue-500">
                Đăng nhập
              </a>
            </p>
          </Form>
  
          {/* Toast Container để hiển thị thông báo */}
          <ToastContainer />
        </div>
      </div>
    );
  };
  
  export default RegisterStudent;
import {
  ArrowLeftOutlined,
  LockOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select, Upload, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const RegisterStudent = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
    loadClasses();
  }, []);

  const checkUserRole = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'student') {
        navigate('/student/homepage');
      }
    }
  };

  const loadClasses = () => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      try {
        const parsedClasses = JSON.parse(storedClasses);
        const formattedClasses = parsedClasses.map(classItem => ({
          value: classItem.key,
          label: classItem.name
        }));
        setClasses(formattedClasses);
      } catch (error) {
        console.error('Error parsing classes:', error);
        setClasses([]);
      }
    }
  };

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      try {
        // Kiểm tra username đã tồn tại chưa
        const existingUsers = JSON.parse(localStorage.getItem('userAccountsData')) || [];
        const isUsernameTaken = existingUsers.some(user => user.username === values.username);

        if (isUsernameTaken) {
          toast.error('Đăng ký thất bại!', {
            description: 'Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác.',
            duration: 3000,
            position: 'top-right'
          });
          setLoading(false);
          return;
        }

        const userData = {
          username: values.username,
          fullName: values.fullName, // Added full name field
          gender: values.gender,       // Added gender field
          phone: values.phone_number,
          dateOfBirth: values.date_of_birth.format('YYYY-MM-DD'),
          classId: values.grade,
          password: values.password,
          role: 'student',
          image: imageUrl
        };

        // Thêm user mới vào mảng
        existingUsers.push(userData);

        // Lưu lại vào localStorage
        localStorage.setItem('userAccountsData', JSON.stringify(existingUsers));

        notification.success({
          message: 'Đăng ký thành công!',
          description: 'Đăng ký tài khoản Học sinh thành công. Vui lòng đăng nhập để truy cập.',
        });

        navigate('/login/student');
      } catch (error) {
        notification.error({
          message: 'Đăng ký thất bại!',
          description: 'Đã có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.',
        });
      }

      setLoading(false);
    }, 1000);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600">
      <div className="relative w-full max-w-5xl p-5 bg-white rounded-lg shadow-lg">
        <Button
          icon={<ArrowLeftOutlined />}
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
          type="link"
        />
        <div className="text-center">
          <UserOutlined className="mb-2 text-5xl text-green-600" />
        </div>
        <h2 className="mb-5 text-3xl font-bold text-center text-gray-800">
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
              <Form.Item
                label="Tên đăng nhập"
                name="username"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                  { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
                ]}
              >
                <Input
                  prefix={<UserOutlined className="mr-1 site-form-item-icon" />}
                  placeholder="Tên đăng nhập"
                />
              </Form.Item>

              <Form.Item
                label="Họ và Tên"
                name="fullName"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                ]}
              >
                <Input
                  placeholder="Họ và Tên"
                />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
              >
                <Select
                  placeholder="Chọn giới tính"
                >
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="date_of_birth"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                  placeholder="Chọn ngày sinh"
                />
              </Form.Item>
              <Form.Item
                label="Hình ảnh"
                name="image"
              >
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={handleImageUpload}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="image" style={{ width: '100%' }} />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="mr-1 site-form-item-icon" />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirm_password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận lại mật khẩu!' },
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
              <Form.Item
                label="Số điện thoại (cá nhân / phụ huynh)"
                name="phone_number"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="mr-1 site-form-item-icon" />}
                  placeholder="Số điện thoại"
                />
              </Form.Item>

              <Form.Item
                label="Lớp"
                name="grade"
                rules={[{ required: true, message: 'Vui lòng chọn lớp của bạn!' }]}
              >
                <Select
                  placeholder="Chọn lớp"
                  options={classes}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>

          <p className="text-center text-gray-600">
            Bằng việc đăng ký tài khoản, bạn đồng ý với{' '}
            <a href="/terms" className="text-blue-500">
              điều khoản sử dụng
            </a>{' '}
            và{' '}
            <a href="/rules" className="text-blue-500">
              nội quy của nhà trường
            </a>
            .
          </p>

          <p className="text-center text-gray-600">
            Bạn đã có tài khoản?{' '}
            <a href="/select-role-login" className="text-blue-500">
              Đăng nhập
            </a>
          </p>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterStudent;

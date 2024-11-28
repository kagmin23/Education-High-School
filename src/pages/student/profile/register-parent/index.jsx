import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const RegisterParent = () => {
  const [form] = Form.useForm();
  const [studentData, setStudentData] = useState({ studentName: '', class: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userAccountsData');
    if (data) {
      const parsedData = JSON.parse(data);
      setStudentData({
        studentName: parsedData.username || '',
        class: parsedData.class || '', // Assuming you have a class field in userAccountsData
      });
      form.setFieldsValue({
        student: parsedData.username || '',
        class: parsedData.class || '',
      });
    }
  }, [form]);

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setImage(info.file.originFileObj); // Store the uploaded image file
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleFinish = (values) => {
    // Logic to handle the form submission
    console.log('Received values:', values);
    message.success('Đăng ký phụ huynh thành công!');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Đăng ký Phụ huynh</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item label="Học sinh" name="student" required>
          <Input value={studentData.studentName} disabled />
        </Form.Item>

        <Form.Item label="Lớp" name="class" required>
          <Input value={studentData.class} disabled />
        </Form.Item>

        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Quan hệ"
          name="relationship"
          rules={[{ required: true, message: 'Vui lòng nhập quan hệ!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent auto upload
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
          </Upload>
          {image && <img src={URL.createObjectURL(image)} alt="image" style={{ width: '100px', marginTop: '10px' }} />}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterParent;

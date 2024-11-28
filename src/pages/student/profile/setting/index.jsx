import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Settings = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({ username: '', password: '' });

  useEffect(() => {
    const data = localStorage.getItem('userAccountsData');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData({
        username: parsedData.username || '',
        password: parsedData.password || '',
      });
      form.setFieldsValue({
        username: parsedData.username || '',
      });
    }
  }, [form]);

  const handleFinish = (values) => {
    const updatedData = {
      ...userData,
      username: values.username,
      password: values.password,
    };
    setUserData(updatedData);
    localStorage.setItem('userAccountsData', JSON.stringify(updatedData));
    message.success('Cập nhật thành công!');
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Cài đặt</h2>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ username: userData.username }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;

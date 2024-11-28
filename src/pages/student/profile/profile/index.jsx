import { Avatar, Button, DatePicker, Form, Input, Layout, Select, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const StudentProfile = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('userAccountsData');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData({
        fullName: parsedData.fullName || '',
        gender: parsedData.gender || '',
        dateOfBirth: parsedData.dateOfBirth || '',
        phoneNumber: parsedData.phoneNumber || '',
        image: parsedData.image || '',
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFinish = (values) => {
    const updatedData = {
      ...userData,
      ...values,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    };
    setUserData(updatedData);
    localStorage.setItem('userAccountsData', JSON.stringify(updatedData));
    message.success('Cập nhật thành công!');
    setIsEditing(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <div className="flex-1 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Thông tin cá nhân</h2>
          <div className="flex items-center mb-6">
            <Avatar src={userData.image} size={100} />
            <div className="ml-4">
              <h3 className="text-xl">{userData.fullName}</h3>
              <p>Giới tính: {userData.gender}</p>
              <p>Ngày sinh: {userData.dateOfBirth}</p>
              <p>Số điện thoại: {userData.phoneNumber}</p>
              {isEditing ? (
                <Button onClick={handleCancel}>Hủy</Button>
              ) : (
                <Button type="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              )}
            </div>
          </div>

          {isEditing && (
            <Form
              layout="vertical"
              initialValues={{
                fullName: userData.fullName,
                gender: userData.gender,
                dateOfBirth: moment(userData.dateOfBirth),
                phoneNumber: userData.phoneNumber,
              }}
              onFinish={handleFinish}
              className="space-y-4"
            >
              <Form.Item
                label="Họ và tên"
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
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
                <Button className="ml-2" onClick={handleCancel}>
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default StudentProfile;

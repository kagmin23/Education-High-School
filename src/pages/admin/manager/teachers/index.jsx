import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import '../main.css';

const { Option } = Select;

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  
  // Dữ liệu giả định cho ví dụ này
  const defaultTeachers = [
    {
      key: '1',
      image: '',
      name: 'Nguyễn Văn A',
      subject: 'Toán',
      phone: '0123456789',
      account: 'nguyenvana',
      class: '10A1',
    },
    {
      key: '2',
      image: '',
      name: 'Trần Thị B',
      subject: 'Lý',
      phone: '0987654321',
      account: 'tranthib',
      class: '10A2',
    },
  ];

  useEffect(() => {
    const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || defaultTeachers;
    setTeachers(loadedTeachers);
    const loadedClasses = JSON.parse(localStorage.getItem('classes')) || []; // Giả sử lớp học đã lưu trong localStorage
    setClasses(loadedClasses);
  }, []);

  const saveTeachersToLocalStorage = (teachers) => {
    localStorage.setItem('teachers', JSON.stringify(teachers));
  };

  const handleDelete = (key) => {
    const newTeachers = teachers.filter((teacher) => teacher.key !== key);
    setTeachers(newTeachers);
    saveTeachersToLocalStorage(newTeachers);
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setVisible(true);
  };

  const handleAdd = () => {
    setEditingTeacher(null);
    setVisible(true);
  };

  const handleOk = (values) => {
    const newTeachers = editingTeacher
      ? teachers.map((teacher) => (teacher.key === editingTeacher.key ? { ...teacher, ...values } : teacher))
      : [...teachers, { key: Date.now().toString(), ...values }];

    setTeachers(newTeachers);
    saveTeachersToLocalStorage(newTeachers);
    setVisible(false);
    setEditingTeacher(null);
    message.success(editingTeacher ? 'Cập nhật giáo viên thành công!' : 'Thêm giáo viên thành công!');
  };

  const handleClassChange = (key, value) => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.key === key ? { ...teacher, class: value } : teacher
    );
    setTeachers(updatedTeachers);
    saveTeachersToLocalStorage(updatedTeachers);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      render: (text) => text ? <img src={text} alt="Teacher" style={{ width: 50, height: 50 }} /> : 'Chưa có hình ảnh',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
    },
    {
      title: 'Bộ Môn',
      dataIndex: 'subject',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'account',
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'class',
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => handleClassChange(record.key, value)}
        >
          {classes.map((className, index) => (
            <Option key={index} value={className}>{className}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Hành động',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: 8 }}>
            Chỉnh sửa
          </Button>
          <Button onClick={() => handleDelete(record.key)} type="danger">
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto custom-table">
      <h1 className="mb-6 text-xl font-bold text-center">Quản lý Giáo Viên</h1>
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm Giáo Viên
      </Button>
      <Table columns={columns} dataSource={teachers} rowKey="key" />

      <Modal
        title={editingTeacher ? 'Chỉnh sửa Giáo Viên' : 'Thêm Giáo Viên'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingTeacher || { class: '' }}
          onFinish={handleOk}
        >
          <Form.Item name="image" label="Hình ảnh">
            <Upload beforeUpload={() => false} showUploadList={false} onChange={({ file }) => {
              if (file.status === 'done') {
                setEditingTeacher({ ...editingTeacher, image: file.response.url }); // Giả sử hình ảnh được lưu trên server
              }
            }}>
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subject" label="Bộ Môn" rules={[{ required: true, message: 'Vui lòng nhập bộ môn!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="account" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="class" label="Chủ nhiệm" rules={[{ required: false }]}>
            <Select placeholder="Chọn lớp">
              {classes.map((className, index) => (
                <Option key={index} value={className}>{className}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTeacher ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherManagement;

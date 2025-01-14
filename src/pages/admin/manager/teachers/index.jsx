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

  useEffect(() => {
    const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || []; // Lấy dữ liệu giáo viên từ localStorage
    setTeachers(loadedTeachers);

    const loadedClasses = JSON.parse(localStorage.getItem('classes')) || []; // Lấy dữ liệu lớp học từ localStorage
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
    setTeachers(updatedTeachers); // Cập nhật ngay trong state teachers
    saveTeachersToLocalStorage(updatedTeachers); // Lưu lại vào localStorage
  };
  
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      align: 'center',
      width: 20,
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
      title: 'Chủ nhiệm',
      dataIndex: 'class',
      align: 'center',
      render: (text, record) => (
        <Select
          className='w-24'
          defaultValue={text}
          onChange={(value) => handleClassChange(record.key, value)}
        >
          <Option value="Không">Không</Option>
          {classes.map((classItem) => (
            <Option key={classItem.key} value={classItem.name}>
              {classItem.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (text, record) => (
        <>
          <Button className='' onClick={() => handleEdit(record)} type="link" style={{ marginRight: 8 }}>
            Chỉnh sửa
          </Button>
          <Button className='text-red-500' onClick={() => handleDelete(record.key)} type="link">
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container p-5 mx-auto bg-white custom-table">
      <h1 className="mb-6 text-xl text-center">Quản lý Giáo Viên</h1>
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
          initialValues={editingTeacher || { class: 'Không' }}
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
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item name="subject" label="Bộ Môn" rules={[{ required: true, message: 'Vui lòng chọn bộ môn!' }]}>
            <Input placeholder="Lựa chọn bộ môn" />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input type='number' placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="class"
            label="Chủ nhiệm"
            rules={[{ required: true, message: 'Vui lòng chọn lớp!' }]}
          >
            <Select defaultValue={editingTeacher ? editingTeacher.class : 'Không'}>
              <Option value="Không">Không</Option>
              {classes.map((classItem) => (
                <Option key={classItem.key} value={classItem.name}>
                  {classItem.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingTeacher ? 'Lưu thay đổi' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeacherManagement;

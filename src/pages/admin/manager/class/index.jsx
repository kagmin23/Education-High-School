import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const loadedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses(loadedClasses);

    const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    setTeachers(loadedTeachers);
  }, []);

  const saveClassesToLocalStorage = (classes) => {
    localStorage.setItem('classes', JSON.stringify(classes));
  };

  const handleDelete = (key) => {
    const newClasses = classes.filter((classItem) => classItem.key !== key);
    setClasses(newClasses);
    saveClassesToLocalStorage(newClasses);
    message.success('Xóa lớp thành công!');
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setVisible(true);
  };

  const handleAdd = () => {
    setEditingClass(null);
    setVisible(true);
  };

  const handleOk = (values) => {
    const newClasses = editingClass
      ? classes.map((classItem) => (classItem.key === editingClass.key ? { ...classItem, ...values } : classItem))
      : [...classes, { key: Date.now().toString(), ...values }];

    setClasses(newClasses);
    saveClassesToLocalStorage(newClasses);
    setVisible(false);
    setEditingClass(null);
    message.success(editingClass ? 'Cập nhật lớp thành công!' : 'Thêm lớp thành công!');
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Lớp',
      dataIndex: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Số học sinh',
      dataIndex: 'studentCount',
      render: (text) => <span>{text || 0}</span>,
    },
    {
      title: 'Giáo viên chủ nhiệm',
      dataIndex: 'teacher',
      render: (text, record) => (
        <Select
          defaultValue={text}
          onChange={(value) => {
            const updatedClasses = classes.map((classItem) =>
              classItem.key === record.key ? { ...classItem, teacher: value } : classItem
            );
            setClasses(updatedClasses);
            saveClassesToLocalStorage(updatedClasses);
          }}
        >
          {teachers.map((teacher, index) => (
            <Option key={index} value={teacher.name}>
              {teacher.name}
            </Option>
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
    <div className="container mx-auto">
      <h1 className="mb-6 text-xl font-bold text-center">Quản lý Lớp Học</h1>
      <Button icon={<PlusCircleOutlined />} type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm Lớp
      </Button>
      <Table columns={columns} dataSource={classes} rowKey="key" />

      <Modal
        title={editingClass ? 'Chỉnh sửa Lớp' : 'Thêm Lớp'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingClass || { name: '', studentCount: 0, teacher: '' }}
          onFinish={handleOk}
        >
          <Form.Item name="name" label="Lớp" rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="studentCount" label="Số học sinh" rules={[{ required: true, message: 'Vui lòng nhập số học sinh!' }]}>
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="teacher" label="Giáo viên chủ nhiệm" rules={[{ required: true, message: 'Vui lòng chọn giáo viên chủ nhiệm!' }]}>
            <Select placeholder="Chọn giáo viên">
              {teachers.map((teacher, index) => (
                <Option key={index} value={teacher.name}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingClass ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagement;

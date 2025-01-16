import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Table, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import './main.css';

const { Option } = Select;
const { Footer } = Layout;

// ParentList component
const ParentList = () => {
  const [students, setStudents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isOtherRelationship, setIsOtherRelationship] = useState(false);
  const [form] = Form.useForm();
  
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Load students from localStorage on component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Function to handle form submission
  const onFinish = (values) => {
    let updatedValues = { ...values };
    if (values.relationship === 'Khác' && values.other_relationship) {
      updatedValues.relationship = values.other_relationship;
      delete updatedValues.other_relationship;
    }

    let updatedStudents;
    if (editMode) {
      // Update student
      updatedStudents = students.map(student =>
        student.id === currentStudent.id ? { ...student, ...updatedValues } : student
      );
      notification.success({ message: 'Cập nhật phụ huynh thành công!' });
    } else {
      // Add new student
      const newStudent = { ...updatedValues, id: Date.now() };
      updatedStudents = [...students, newStudent];
      notification.success({ message: 'Thêm phụ huynh thành công!' });
    }
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentStudent(null);
    setEditMode(false);
    setIsOtherRelationship(false);
    form.resetFields();
  };

  const showModal = (student = null) => {
    setCurrentStudent(student);
    setEditMode(!!student);
    setVisible(true);
    if (student) {
      const isOther = !['Bố', 'Mẹ', 'Anh', 'Chị'].includes(student.relationship);
      setIsOtherRelationship(isOther);
      form.setFieldsValue({
        ...student,
        relationship: isOther ? 'Khác' : student.relationship,
        other_relationship: isOther ? student.relationship : undefined,
      });
    } else {
      form.resetFields();
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa phụ huynh này khỏi DS Lớp?',
      onOk: () => {
        const updatedStudents = students.filter(student => student.id !== id);
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        notification.success({ message: 'Xóa phụ huynh thành công!' });
      },
    });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '70px',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Lớp',
      dataIndex: 'grade',
      key: 'grade',
      width: '80px',
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '130px',
      align: 'center',
      render: (text) => (
        <div className="flex justify-center">
          <img
            src={text}
            alt="student"
            className="object-cover w-12 h-12 rounded-full"
          />
        </div>
      ),
    },
    {
      title: 'Học sinh',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phụ Huynh',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'Quan hệ',
      dataIndex: 'relationship',
      key: 'relationship',
      width: '90px',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
      width: '200px',
    },
    {
      title: 'Actions',
      key: 'action',
      width: '100px',
      align: 'center',
      render: (text, record) => (
        <div>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}></Button>
        </div>
      ),
    },
  ];

  const handleRelationshipChange = (value) => {
    setIsOtherRelationship(value === 'Khác');
    if (value !== 'Khác') {
      form.setFieldsValue({ other_relationship: undefined });
    }
  };

  // Function to filter students based on search term
  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.parent.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <div className="flex justify-between">
        <Typography.Title level={4}>Danh sách Phụ huynh</Typography.Title>

        {/* Search Input */}
        <div>
          <Input
            placeholder="Tìm kiếm theo tên"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
            className="w-64"
          />
        </div>
      </div>

      <Table
        dataSource={filteredStudents} // Use filtered students
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ y: 400 }}
        className="mt-3 custom-table"
      />

      <Modal
        title={editMode ? 'Chỉnh sửa thông tin' : 'Thêm phụ huynh'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="student_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Học sinh"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên Học sinh!' }]}
          >
            <Input placeholder="Nhập họ và tên học sinh" />
          </Form.Item>

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

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: false, message: 'Vui lòng nhập URL hình ảnh học sinh!' }]}
          >
            <Input placeholder="Nhập URL hình ảnh học sinh" />
          </Form.Item>

          <Form.Item
            label="Phụ huynh"
            name="parent"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên phụ huynh!' }]}
          >
            <Input placeholder="Nhập họ và tên phụ huynh" />
          </Form.Item>

          <Form.Item
            label="Quan hệ"
            name="relationship"
            rules={[{ required: true, message: 'Vui lòng chọn quan hệ với học sinh!' }]}
          >
            <Select placeholder="Chọn quan hệ với học sinh" onChange={handleRelationshipChange}>
              <Option value="Bố">Bố</Option>
              <Option value="Mẹ">Mẹ</Option>
              <Option value="Anh">Anh</Option>
              <Option value="Chị">Chị</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>

          {isOtherRelationship && (
            <Form.Item
              label="Quan hệ khác"
              name="other_relationship"
              rules={[{ required: true, message: 'Vui lòng nhập quan hệ!' }]}
            >
              <Input placeholder="Nhập quan hệ khác" />
            </Form.Item>
          )}

          <Form.Item
            label="Số điện thoại"
            name="phone_number"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {editMode ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Footer style={{ textAlign: 'center' }}>
        Created by KagMin © 2025
      </Footer>
    </div>
  );
};

export default ParentList;

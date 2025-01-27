import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Select, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import studentData from '../../../../../components/constant/studentData'; // Import dữ liệu cứng từ data.js

const { Option } = Select;

const StudentTotal = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // State to store class options
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Load data from localStorage and combine with hardcoded data
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    let studentsList = [];

    if (storedStudents) {
      studentsList = JSON.parse(storedStudents);
    }

    // Kết hợp dữ liệu cứng vào students
    setStudents([...studentData, ...studentsList]);

    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  // Save data to localStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem('students', JSON.stringify(data));
    localStorage.setItem('totalStudents', data.length); // Save total number of students
  };

  // Show modal for adding/editing student
  const showModal = (student = null) => {
    setEditingStudent(student);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  // Add or update student
  const handleOk = (values) => {
    if (editingStudent) {
      // Update student
      const updatedStudents = students.map((student) =>
        student.key === editingStudent.key
          ? { ...student, ...values, dob: values.dob.format('YYYY-MM-DD') }
          : student
      );
      setStudents(updatedStudents);
      saveToLocalStorage(updatedStudents);
    } else {
      // Add new student
      const newStudent = {
        key: (students.length + 1).toString(),
        ...values,
        dob: values.dob.format('YYYY-MM-DD'),
      };
      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      saveToLocalStorage(updatedStudents);
    }
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  // Confirm before deleting student
  const confirmDelete = (key) => {
    const updatedStudents = students.filter((student) => student.key !== key);
    setStudents(updatedStudents);
    saveToLocalStorage(updatedStudents);
  };

  // Configure columns for the table
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Hình ảnh" className="object-cover w-12 h-12 rounded-full" />,
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => moment(dob).format('DD/MM/YYYY'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá học sinh này?"
            onConfirm={() => confirmDelete(record.key)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col justify-between mb-4">
        <h2 className="mb-3 ">Danh sách học sinh</h2>
        <div className="flex flex-row items-center justify-between">
            <p className="italic">Tổng số học sinh: <span className="not-italic font-bold">{students.length}</span></p>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Thêm học sinh
            </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={students} className="custom-table" rowKey="key" />

      {/* Modal for adding/editing student */}
      <Modal
        title={editingStudent ? 'Chỉnh sửa học sinh' : 'Thêm học sinh'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingStudent ? { ...editingStudent, dob: moment(editingStudent.dob) } : {}}
          onFinish={handleOk}
        >
          <Form.Item
            name="image"
            label="Hình ảnh"
            rules={[{ required: false, message: 'Vui lòng nhập link hình ảnh!' }]}
          >
            <Input placeholder="Link hình ảnh" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Họ và Tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dob"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: false, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="class"
            label="Lớp"
            rules={[{ required: true, message: 'Vui lòng chọn Lớp!' }]}
          >
          <Select
              onChange={(value) => handleClassChange(record.key, value)}
            >
              {classes.map((classItem) => (
                <Option key={classItem.key} value={classItem.name}>
                  {classItem.name} {/* Use the correct property to display */}
                </Option>
              ))}
          </Select>
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {editingStudent ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentTotal;

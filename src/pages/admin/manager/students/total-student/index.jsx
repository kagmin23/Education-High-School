import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const StudentTotal = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // State to store class options
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }

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

  // Delete student
  const handleDelete = (key) => {
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
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} danger></Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col justify-between mb-4">
        <h2 className="mb-5 text-2xl font-bold">Quản lý học sinh</h2>
        <div className="flex flex-row items-center justify-between">
            <p>Tổng số học sinh: <span className="font-bold">{students.length}</span></p>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Thêm học sinh
            </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={students} rowKey="key" />

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
            rules={[{ required: true, message: 'Vui lòng nhập link hình ảnh!' }]}
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
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
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

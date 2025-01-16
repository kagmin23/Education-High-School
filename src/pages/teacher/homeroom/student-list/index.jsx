import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Layout, Modal, Select, Table, Typography, notification } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './main.css';

const { Option } = Select;
const { Footer } = Layout;
const { TextArea } = Input;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [schoolYear, setSchoolYear] = useState('');
  const [grade, setGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const storedSchoolYear = localStorage.getItem('schoolYear') || '';
    const storedGrade = localStorage.getItem('grade') || '';
    
    setStudents(storedStudents);
    setFilteredStudents(storedStudents); // Initialize filtered students
    setSchoolYear(storedSchoolYear);
    setGrade(storedGrade);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('schoolYear', schoolYear);
  }, [schoolYear]);

  useEffect(() => {
    localStorage.setItem('grade', grade);
  }, [grade]);

  // Function to handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Filter students based on search term
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(value.toLowerCase()) ||
      student.address.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredStudents(filtered); // Update filtered students
  };

  const onFinish = (values) => {
    let updatedStudents;
    if (editMode) {
      updatedStudents = students.map(student =>
        student.id === currentStudent.id ? { ...student, ...values, dob: values.dob.format('YYYY-MM-DD') } : student
      );
      notification.success({ message: 'Cập nhật học sinh thành công!' });
    } else {
      const newStudent = { ...values, id: students.length + 1, dob: values.dob.format('YYYY-MM-DD') };
      updatedStudents = [...students, newStudent];
      notification.success({ message: 'Thêm học sinh thành công!' });
    }
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents); // Update filtered students as well
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentStudent(null);
    setEditMode(false);
  };

  const showModal = (student = null) => {
    setCurrentStudent(student);
    setEditMode(!!student);
    setVisible(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa Học sinh này khỏi DS Lớp?',
      onOk: () => {
        const updatedStudents = students.filter(student => student.id !== id);
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents); // Update filtered students
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        notification.success({ message: 'Xóa học sinh thành công!' });
      },
    });
  };

  const handleNoteChange = (id, value) => {
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, notes: value } : student
    );
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents); // Update filtered students
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleSchoolYearChange = (e) => {
    const value = e.target.value;
    setSchoolYear(value);
    localStorage.setItem('schoolYear', value); // Lưu giá trị Niên khóa vào localStorage
  };
  
  const handleGradeChange = (e) => {
    const value = e.target.value;
    setGrade(value);
    localStorage.setItem('grade', value); // Lưu giá trị Lớp vào localStorage
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
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      width: '170px',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '90px',
      align: 'center',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      width: '100px',
      align: 'center',
      render: (text) => dayjs(text).isValid() ? dayjs(text).format('DD/MM/YYYY') : '',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '100px',
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
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
      width: '180px',
      render: (text, record) => (
        <TextArea
          value={text}
          onChange={(e) => handleNoteChange(record.id, e.target.value)}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder="Nhập ghi chú"
          className="text-xs"
        />
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <div>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}></Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Typography.Title level={4} className="m-0">Danh sách Học sinh</Typography.Title>
        <div className="flex space-x-2">
          <Input
            placeholder="Nhập Niên khóa"
            value={schoolYear}
            onChange={handleSchoolYearChange}
            className="w-36"
          />
          <Input
            placeholder="Nhập Lớp"
            value={grade}
            onChange={handleGradeChange}
            className="w-36"
          />
          <Input
            placeholder="Tìm kiếm theo tên hoặc địa chỉ"
            value={searchTerm}
            onChange={handleSearch} // Add search input
            className="w-64"
            prefix={<SearchOutlined />}
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <p>Tổng số Học sinh: <span className="font-bold">{filteredStudents.length}</span></p>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Thêm học sinh</Button>
      </div>

      <Table
        dataSource={filteredStudents} // Use filtered students here
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ y: 400 }}
        className="custom-table"
      />

      <Modal
        title={editMode ? 'Chỉnh sửa thông tin' : 'Thêm học sinh'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="student_form"
          onFinish={onFinish}
          layout="vertical"
          initialValues={editMode ? { ...currentStudent, dob: dayjs(currentStudent.dob) } : {}}
        >
          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dob"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: false, message: 'Vui lòng nhập link hình ảnh!' }]}
          >
            <Input placeholder="Nhập link hình ảnh" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      
      <Footer style={{ textAlign: 'center' }}>Created by KagMin © 2025</Footer>
    </div>
  );
};

export default StudentList;

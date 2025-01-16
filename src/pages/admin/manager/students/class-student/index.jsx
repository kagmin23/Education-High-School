import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Select, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import studentData from '../../../../../components/constant/studentData'; // Import dữ liệu cứng từ data.js

const { Option } = Select;

const StudentClass = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // State for filtered students
  const [classes, setClasses] = useState([]); // State to store class options
  const [selectedClass, setSelectedClass] = useState('12A1'); // Set default class to '12A1'
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
    setFilteredStudents([...studentData, ...studentsList]); // Initially, show all students

    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  // Filter students based on selected class
  const handleClassChange = (value) => {
    setSelectedClass(value);
    if (value) {
      const filtered = students.filter(student => student.class === value);
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students); // Show all students if no class is selected
    }
  };

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
      <div className="flex flex-col justify-between">
        <Select
          placeholder="Chọn lớp"
          value={selectedClass}
          onChange={handleClassChange}
          style={{ width: 200, marginBottom: 16 }}
        >
          {classes.map((classItem) => (
            <Option key={classItem.key} value={classItem.name}>
              {classItem.name}
            </Option>
          ))}
        </Select>
        <h2 className="mb-3 ">Danh sách học sinh</h2>
      </div>
      <Table columns={columns} dataSource={filteredStudents} className="custom-table" rowKey="key" />
    </div>
  );
};

export default StudentClass;

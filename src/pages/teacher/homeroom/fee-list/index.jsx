import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, Layout, Select, Table, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import './main.css';

const { Option } = Select;
const { Footer } = Layout;
const { TextArea } = Input;
const { RangePicker } = DatePicker; // Importing RangePicker

// FeeList component
const FeeList = () => {
  const [students, setStudents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(''); // State for month filter
  const [dateRange, setDateRange] = useState([]); // State for date range filter
  const [selectedStatus, setSelectedStatus] = useState(''); // State for status filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Load students from localStorage on component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Get current month/year
  const getCurrentMonthYear = () => {
    const date = new Date();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  // Function to handle status change
  const handleStatusChange = (value, studentId) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, status: value } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Update localStorage
    notification.success({ message: 'Cập nhật trạng thái thành công!' });
  };

  // Function to handle tuition and fund fee change
  const onTuitionChange = (value, studentId) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, tuition: value } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save updated tuition
  };

  const onFundFeeChange = (value, studentId) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, fund_fee: value } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save updated fund fee
  };

  // Function to handle notes change
  const onNotesChange = (value, studentId) => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, notes_fee: value } : student
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents)); // Save updated notes
  };

  // Filtering students based on selected date range, status, and search term
  const filteredStudents = students.filter(student => {
    const studentDate = new Date(student.date); // Ensure your student object has a 'date' field
    const dateMatch = dateRange && dateRange.length > 0 
      ? studentDate >= dateRange[0].toDate() && studentDate <= dateRange[1].toDate()
      : true; // Check if within date range if set
    const statusMatch = selectedStatus ? student.status === selectedStatus : true; // Match status if selected
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase()); // Match name if search term is provided
    return dateMatch && statusMatch && nameMatch; // Include nameMatch in the final filter
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      width: '70px',
      align: 'center',
      className: "text-xs",
      render: (text, record, index) => index + 1, // Display serial number
    },
    {
      title: 'Lớp',
      dataIndex: 'grade',
      key: 'grade',
      width: '80px',
      align: 'center',
      className: "text-xs"
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '100px',
      align: 'center',
      className: "text-xs",
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
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      width: '170px',
      className: "text-xs"
    },
    {
      title: 'Học phí',
      dataIndex: 'tuition',
      key: 'tuition',
      align: 'end',
      className: "text-xs",
      render: (tuition, record) => (
        <Input
          value={tuition}
          onChange={(e) => onTuitionChange(e.target.value, record.id)}
          placeholder="Số tiền"
          className="text-xs text-end"
        />
      ),
    },
    {
      title: 'Quỹ lớp',
      dataIndex: 'fund_fee',
      key: 'fund_fee',
      align: 'end',
      className: "text-xs",
      render: (fund_fee, record) => (
        <Input
          value={fund_fee}
          onChange={(e) => onFundFeeChange(e.target.value, record.id)}
          placeholder="Số tiền"
          className="text-xs text-end"
        />
      ),
    },
    {
      title: 'Tháng',
      key: 'month',
      render: () => (
        <span className="text-xs">{getCurrentMonthYear()}</span> // Display current month/year
      ),
      align: 'center',
      width: '100px',
      className: "text-xs"
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '150px',
      className: "text-xs",
      render: (status, record) => (
        <Select
          value={status || 'Chưa nộp'}
          onChange={(value) => handleStatusChange(value, record.id)}
          className="w-24"
        >
          <Option value="Chưa nộp">Chưa nộp</Option>
          <Option value="Đã nộp">Đã nộp</Option>
        </Select>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes_fee',
      key: 'notes_fee',
      className: "text-xs",
      render: (notes_fee, record) => (
        <TextArea
          value={notes_fee}
          onChange={(e) => onNotesChange(e.target.value, record.id)}
          placeholder="Nhập ghi chú"
          autoSize={{ minRows: 2, maxRows: 4 }} // Enables auto resizing
          className="text-xs"
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Typography.Title level={4}>Danh sách Tiền nộp</Typography.Title>

        {/* Filter UI */}
        <div className="flex justify-between gap-3 mb-4">
          <Input
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
            prefix={<SearchOutlined />}
            className="w-64"
          />

          <RangePicker
            onChange={setDateRange} // Set the selected date range
            className="w-60"
          />
        
          <Select
            placeholder="Chọn trạng thái"
            onChange={setSelectedStatus}
            className="w-32"
            defaultValue={"Tất cả"}
          >
            <Option value="">Tất cả</Option>
            <Option value="Chưa nộp">Chưa nộp</Option>
            <Option value="Đã nộp">Đã nộp</Option>
          </Select>
        </div>
      </div>

      <Table
        // bordered
        rowKey="id"
        columns={columns}
        dataSource={filteredStudents}
        pagination={false}
      />

      <Footer style={{ textAlign: 'center' }}>Created by KagMin © 2025</Footer>
    </div>
  );
};

export default FeeList;

import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const StudentClass = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('12A1'); // Mặc định chọn lớp 12A1
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [classes, setClasses] = useState([]);

  // Hàm để lấy dữ liệu từ localStorage
  const loadStudentsFromLocalStorage = () => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  };

  useEffect(() => {
    const loadedStudents = loadStudentsFromLocalStorage();
    setStudents(loadedStudents);

    // Lấy danh sách lớp từ localStorage
    const savedClasses = localStorage.getItem('classes');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    }
  }, []);

  // Lọc danh sách học sinh theo lớp và giáo viên
  const filteredStudents = students.filter((student) => {
    return (
      (selectedClass === '' || student.class === selectedClass) &&
      (selectedTeacher === '' || student.teacher === selectedTeacher)
    );
  });

  const handleClassChange = (value) => {
    setSelectedClass(value); // Cập nhật lớp đã chọn
  };

  const handleTeacherChange = (value) => {
    setSelectedTeacher(value); // Cập nhật giáo viên đã chọn
  };

  // Lấy danh sách giáo viên duy nhất từ dữ liệu học sinh
  const uniqueTeachers = [...new Set(students.map((student) => student.teacher))];

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
    },
  ];

  return (
    <div className="p-4 bg-white">
      <h3>Danh sách học sinh theo lớp</h3>

      {/* Bộ lọc lớp */}
      <div className="py-4">
        <Select
          value={selectedClass}
          onChange={handleClassChange}
          style={{ width: 200 }}
        >
          {classes.map((className) => (
            <Option key={className} value={className}>
              {className}
            </Option>
          ))}
        </Select>

        {/* Bộ lọc giáo viên */}
        <Select
          value={selectedTeacher}
          onChange={handleTeacherChange}
          style={{ width: 200, marginLeft: '16px' }}
        >
          {uniqueTeachers.map((teacher) => (
            <Option key={teacher} value={teacher}>
              {teacher}
            </Option>
          ))}
        </Select>
      </div>

      {/* Bảng danh sách học sinh */}
      <Table columns={columns} dataSource={filteredStudents} className="custom-table" rowKey="key" />
    </div>
  );
};

export default StudentClass;

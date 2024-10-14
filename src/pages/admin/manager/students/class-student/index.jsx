import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;

const StudentClass = () => {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(''); // Thay đổi giá trị mặc định
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
    <div>
      <h3>Danh sách học sinh theo lớp</h3>

      {/* Bộ lọc lớp */}
      <div className="py-4">
        <Select
          style={{ width: 120, marginRight: 16 }}
          placeholder="Chọn lớp"
          onChange={handleClassChange}
          value={selectedClass || undefined} // Đảm bảo không truyền null
        >
          <Option value="">Tất cả</Option>
          {classes.map((classItem, index) => (
            <Option key={index} value={classItem}>
              {classItem}
            </Option>
          ))}
        </Select>

        {/* Bộ lọc giáo viên */}
        <Select
          style={{ width: 120, marginRight: 16 }}
          placeholder="Chọn giáo viên"
          onChange={handleTeacherChange}
          value={selectedTeacher || undefined} // Đảm bảo không truyền null
        >
          <Option value="">Tất cả</Option>
          {uniqueTeachers.map((teacher, index) => (
            <Option key={index} value={teacher}>
              {teacher}
            </Option>
          ))}
        </Select>
      </div>

      {/* Bảng danh sách học sinh */}
      <Table columns={columns} dataSource={filteredStudents} rowKey="key" />
    </div>
  );
};

export default StudentClass;

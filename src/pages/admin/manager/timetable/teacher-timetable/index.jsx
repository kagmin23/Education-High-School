import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Modal, Select, notification } from 'antd';
import { useEffect, useState } from 'react';

const TeacherTimetable = () => {
  const DEFAULT_TEACHER = "Hồ Thị Hồng Liên";
  const [selectedTeacher, setSelectedTeacher] = useState(DEFAULT_TEACHER);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [timetableData, setTimetableData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tempTimetableData, setTempTimetableData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState('Chọn Lớp học');

  useEffect(() => {
    // Lấy danh sách giáo viên từ localStorage
    const storedTeachers = localStorage.getItem('teachers');
    if (storedTeachers) {
      try {
        const parsedTeachers = JSON.parse(storedTeachers);
        setTeachers(parsedTeachers);
        if (!parsedTeachers.some(t => t.id === DEFAULT_TEACHER)) {
          const updatedTeachers = [...parsedTeachers, { id: DEFAULT_TEACHER, name: 'Hồ Thị Hồng Liên' }];
          setTeachers(updatedTeachers);
          localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
        }
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể tải danh sách giáo viên' });
      }
    } else {
      const defaultTeachers = [{ id: DEFAULT_TEACHER, name: 'Hồ Thị Hồng Liên' }];
      setTeachers(defaultTeachers);
      localStorage.setItem('teachers', JSON.stringify(defaultTeachers));
    }

    // Lấy danh sách lớp học từ localStorage
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      try {
        const parsedClasses = JSON.parse(storedClasses);
        setClasses(parsedClasses);
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể tải danh sách lớp học' });
      }
    }

    // Lấy dữ liệu thời khóa biểu
    const storedTimetables = localStorage.getItem('teacherTimetablesData');
    if (storedTimetables) {
      try {
        const parsedTimetables = JSON.parse(storedTimetables);
        setTimetableData(parsedTimetables);
        setTempTimetableData(parsedTimetables);
        if (!parsedTimetables[DEFAULT_TEACHER]) {
          const newData = createEmptyData();
          const updatedTimetables = { ...parsedTimetables, [DEFAULT_TEACHER]: newData };
          setTimetableData(updatedTimetables);
          setTempTimetableData(updatedTimetables);
          localStorage.setItem('teacherTimetablesData', JSON.stringify(updatedTimetables));
        }
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể tải dữ liệu thời khóa biểu' });
      }
    } else {
      const newData = createEmptyData();
      const initialTimetables = { [DEFAULT_TEACHER]: newData };
      setTimetableData(initialTimetables);
      setTempTimetableData(initialTimetables);
      localStorage.setItem('teacherTimetablesData', JSON.stringify(initialTimetables));
    }
  }, []);

  const columns = [
    { title: 'Thời gian', dataIndex: 'time', className: 'text-center w-24' },
    { title: 'Tiết', dataIndex: 'time_details', className: 'text-center w-16' },
    { title: '', dataIndex: 'empty', className: 'w-4' },
    ...['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(day => ({
      title: day,
      className: 'text-center',
      render: (_, record) => {
        if (record.noCRUD) return null;
        const dayKey = day.toLowerCase().replace('thứ ', '');
        const value = tempTimetableData[selectedTeacher]?.find(item => item.key === record.key)?.[dayKey] || '';

        return (
          <div className="flex items-center justify-end w-32 space-x-2">
            <button
              onClick={() => handleEdit(record.key, dayKey)}
              className="text-blue-500 hover:text-blue-700"
            >
              {value || 'Thêm'}
            </button>
            {value && (
              <button
                onClick={() => handleDelete(record.key, dayKey, value, record.time, record.time_details, day)}
                className="text-red-500 hover:text-red-700"
              >
                <DeleteOutlined size={16} />
              </button>
            )}
          </div>
        );
      }
    }))
  ];

  const createEmptyData = () => {
    const initialData = [];
    for (let i = 1; i <= 10; i++) {
      if (i === 6) {
        initialData.push({
          key: i,
          time: '',
          time_details: '',
          empty: '',
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          noCRUD: true,
        });
      } else {
        initialData.push({
          key: i,
          time: i <= 5 ? 'Sáng' : 'Chiều',
          time_details: `Tiết ${i}`,
          empty: '',
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
        });
      }
    }
    return initialData;
  };

  const handleTeacherSelect = (teacherId) => {
    if (!teacherId) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn một Giáo viên để xem và chỉnh sửa thời khóa biểu' });
      setShowTable(false);
      return;
    }

    setSelectedTeacher(teacherId);
    setShowTable(true);

    if (!tempTimetableData[teacherId]) {
      const newData = createEmptyData();
      setTempTimetableData(prev => ({ ...prev, [teacherId]: newData }));
      setHasUnsavedChanges(true);
    }
  };

  const handleEdit = (key, day) => {
    if (!selectedTeacher) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn giáo viên trước khi chỉnh sửa' });
      return;
    }

    const record = tempTimetableData[selectedTeacher].find(item => item.key === key);
    setCurrentRecord({ ...record, day, value: record[day] || '' });
    setSelectedSubject(record[day] || 'Chọn Lớp học');
    setIsModalOpen(true);
  };

  const handleDelete = (key, day, value, time, time_details, dayName) => {
    if (!selectedTeacher) return;

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa Lớp học này?</p>
          <p><strong>Thời gian:</strong> {time}</p>
          <p><strong>Tiết:</strong> {time_details}</p>
          <p><strong>{dayName}:</strong> {value}</p>
        </div>
      ),
      onOk: () => {
        const updatedData = tempTimetableData[selectedTeacher].map(item => {
          if (item.key === key) {
            return { ...item, [day]: '' };
          }
          return item;
        });

        setTempTimetableData(prev => ({ ...prev, [selectedTeacher]: updatedData }));
        setHasUnsavedChanges(true);
      },
    });
  };

  const handleDeleteAll = () => {
    if (!selectedTeacher) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn Giáo viên trước khi xóa dữ liệu' });
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu của Giáo viên này?',
      onOk: () => {
        const newTimetableData = { ...tempTimetableData, [selectedTeacher]: createEmptyData() };
        setTempTimetableData(newTimetableData);
        setHasUnsavedChanges(true);
      },
    });
  };

  const handleSaveAll = () => {
    setTimetableData(tempTimetableData);
    localStorage.setItem('teacherTimetablesData', JSON.stringify(tempTimetableData));
    setHasUnsavedChanges(false);

    notification.success({
      message: 'Lưu thành công',
      description: 'Đã cập nhật và lưu thời khóa biểu.',
    });
  };

  const handleSaveSubject = () => {
    if (selectedSubject === 'Chọn Lớp học') {
      notification.warning({ message: 'Thông báo!', description: 'Vui lòng chọn Lớp học trước khi lưu.' });
      return;
    }

    const updatedData = tempTimetableData[selectedTeacher].map(item => {
      if (item.key === currentRecord.key) {
        return { ...item, [currentRecord.day]: selectedSubject };
      }
      return item;
    });

    setTempTimetableData(prev => ({ ...prev, [selectedTeacher]: updatedData }));
    setHasUnsavedChanges(true);
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => handleTeacherSelect(e.target.value)}
          value={selectedTeacher || ''}
        >
          {teachers.map(teacherItem => (
            <option key={teacherItem.id} value={teacherItem.id}>
              {teacherItem.name}
            </option>
          ))}
        </select>

        {selectedTeacher && (
          <div className="space-x-2">
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveAll}
              disabled={!hasUnsavedChanges}
              className="bg-blue-500"
            >
              Lưu thay đổi
            </Button>
            <Button danger onClick={handleDeleteAll}>
              Xoá tất cả dữ liệu
            </Button>
          </div>
        )}
      </div>

      {selectedTeacher && showTable && (
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className={`border p-2 ${column.className || ''}`}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tempTimetableData[selectedTeacher]?.map((record) => (
                <tr key={record.key}>
                  {columns.map((column, index) => (
                    <td key={index} className={`border p-2 ${column.className || ''}`}>
                      {column.render
                        ? column.render(null, record)
                        : record[column.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-lg font-bold">Chỉnh sửa Lớp học:</h2>
            <Select
              className="w-full mb-4"
              placeholder="Chọn Lớp học"
              value={selectedSubject}
              onChange={(value) => setSelectedSubject(value)}
            >
              {classes.map(classItem => (
                <Select.Option key={classItem.id} value={classItem.name}>
                  {classItem.name}
                </Select.Option>
              ))}
            </Select>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Huỷ
              </button>
              <button
                onClick={handleSaveSubject}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherTimetable;
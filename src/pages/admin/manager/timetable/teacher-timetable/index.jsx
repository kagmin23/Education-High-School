import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Modal, Select, notification } from 'antd';
import { useEffect, useState } from 'react';
import subjects from '../../../../../models/types';

const TeacherTimetable = () => {
  const DEFAULT_CLASS = "12T";
  const [selectedClass, setSelectedClass] = useState(DEFAULT_CLASS);
  const [classes, setClasses] = useState([]);
  const [timetableData, setTimetableData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tempTimetableData, setTempTimetableData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      try {
        const parsedClasses = JSON.parse(storedClasses);
        setClasses(parsedClasses);
        if (!parsedClasses.some(c => c.id === DEFAULT_CLASS)) {
          const updatedClasses = [...parsedClasses, { id: DEFAULT_CLASS, name: '12T' }];
          setClasses(updatedClasses);
          localStorage.setItem('classes', JSON.stringify(updatedClasses));
        }
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể tải danh sách lớp học' });
      }
    } else {
      const defaultClasses = [{ id: DEFAULT_CLASS, name: '12T' }];
      setClasses(defaultClasses);
      localStorage.setItem('classes', JSON.stringify(defaultClasses));
    }

    const storedTimetables = localStorage.getItem('teacherTimetablesData');
    if (storedTimetables) {
      try {
        const parsedTimetables = JSON.parse(storedTimetables);
        setTimetableData(parsedTimetables);
        setTempTimetableData(parsedTimetables);
        if (!parsedTimetables[DEFAULT_CLASS]) {
          const newData = createEmptyData();
          const updatedTimetables = { ...parsedTimetables, [DEFAULT_CLASS]: newData };
          setTimetableData(updatedTimetables);
          setTempTimetableData(updatedTimetables);
          localStorage.setItem('teacherTimetablesData', JSON.stringify(updatedTimetables));
        }
      } catch (error) {
        notification.error({ message: 'Lỗi', description: 'Không thể tải dữ liệu thời khóa biểu' });
      }
    } else {
      const newData = createEmptyData();
      const initialTimetables = { [DEFAULT_CLASS]: newData };
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
        const value = tempTimetableData[selectedClass]?.find(item => item.key === record.key)?.[dayKey] || '';

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

  const handleClassSelect = (classId) => {
    if (!classId) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn một lớp để xem và chỉnh sửa thời khóa biểu' });
      setShowTable(false);
      return;
    }

    setSelectedClass(classId);
    setShowTable(true);

    if (!tempTimetableData[classId]) {
      const newData = createEmptyData();
      setTempTimetableData(prev => ({ ...prev, [classId]: newData }));
      setHasUnsavedChanges(true);
    }
  };

  const handleEdit = (key, day) => {
    if (!selectedClass) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn lớp trước khi chỉnh sửa' });
      return;
    }

    const record = tempTimetableData[selectedClass].find(item => item.key === key);
    setCurrentRecord({ ...record, day, value: record[day] || '' });
    setIsModalOpen(true);
    setSelectedSubject(subjects[0]);
  };

  const handleDelete = (key, day, value, time, time_details, dayName) => {
    if (!selectedClass) return;

    // Show confirmation modal for deletion
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa môn học này?</p>
          <p><strong>Thời gian:</strong> {time}</p>
          <p><strong>Tiết:</strong> {time_details}</p>
          <p><strong>{dayName}:</strong> {value}</p>
        </div>
      ),
      onOk: () => {
        const updatedData = tempTimetableData[selectedClass].map(item => {
          if (item.key === key) {
            return { ...item, [day]: '' }; // Xóa môn học
          }
          return item;
        });

        setTempTimetableData(prev => ({ ...prev, [selectedClass]: updatedData }));
        setHasUnsavedChanges(true);
      },
    });
  };

  const handleDeleteAll = () => {
    if (!selectedClass) {
      notification.warning({ message: 'Thông báo', description: 'Vui lòng chọn lớp trước khi xóa dữ liệu' });
      return;
    }

    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu của lớp này?',
      onOk: () => {
        const newTimetableData = { ...tempTimetableData, [selectedClass]: createEmptyData() };
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
    if (selectedSubject === 'Chọn môn học') {
      notification.warning({ message: 'Thông báo!', description: 'Vui lòng chọn môn học trước khi lưu.' });
      return;
    }

    const updatedData = tempTimetableData[selectedClass].map(item => {
      if (item.key === currentRecord.key) {
        return { ...item, [currentRecord.day]: selectedSubject }; // Cập nhật môn học
      }
      return item;
    });

    setTempTimetableData(prev => ({ ...prev, [selectedClass]: updatedData }));
    const updatedTimetableData = { ...timetableData, [selectedClass]: updatedData };
    setTimetableData(updatedTimetableData);
    localStorage.setItem('teacherTimetablesData', JSON.stringify(updatedTimetableData));
    setIsModalOpen(false);
    setHasUnsavedChanges(true);
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => handleClassSelect(e.target.value)}
          value={selectedClass || ''}
        >
          {classes.map(classItem => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>

        {selectedClass && (
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

      {selectedClass && showTable && (
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
              {tempTimetableData[selectedClass]?.map((record) => (
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
            <h2 className="mb-4 text-lg font-bold">Chỉnh sửa môn học:</h2>

            {/* Select lựa chọn môn học */}
            <Select
              value={selectedSubject}
              onChange={setSelectedSubject}
              className="w-full mb-4"
            >
              {subjects.map((subject, index) => (
                <Select.Option key={index} value={subject}>
                  {subject}
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
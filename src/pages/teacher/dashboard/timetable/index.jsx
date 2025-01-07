import { Table } from 'antd';
import React, { useState, useEffect } from 'react';
import './main.css';

const Timetable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedData = localStorage.getItem('teacherTimetablesData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Lấy dữ liệu của giáo viên đầu tiên nếu có
        const firstTeacherData = Object.values(parsedData)[0] || createEmptyData();
        setData(firstTeacherData);
      } catch (error) {
        console.error('Không thể parse dữ liệu:', error);
        setData(createEmptyData());
      }
    } else {
      setData(createEmptyData());
    }
  }, []);

  // Hàm tạo dữ liệu trống khi không có data
  function createEmptyData() {
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
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
        });
      }
    }
    return initialData;
  }

  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: '70px',
      align: 'center',
    },
    {
      title: 'Tiết',
      dataIndex: 'time_details',
      key: 'time_details',
      width: '70px',
      align: 'center',
    },
    {
      title: '',
      dataIndex: 'empty',
      key: 'empty',
      width: '30px',
    },
    ...['THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'].map((day, index) => ({
      title: day,
      dataIndex: (index + 2).toString(),
      width: '90px',
      align: 'center',
      render: (text, record) => {
        if (record.noCRUD) {
          return null;
        }
        return <div style={{ textAlign: 'center' }}>{text || ''}</div>;
      },
    })),
  ];

  return (
    <div className="overflow-auto">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        tableLayout="fixed"
        className="custom-table"
      />
    </div>
  );
};

export default Timetable;
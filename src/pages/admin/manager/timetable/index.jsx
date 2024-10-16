import { DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, notification } from 'antd';
import React, { useState } from 'react';
import './main.css';

const TimetableManagement = () => {
  const [data, setData] = useState(generateInitialData());
  const [isModalAddClass, setIsModalAddClass] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Hàm tạo dữ liệu ban đầu
  function generateInitialData() {
    const savedData = localStorage.getItem('timetableData');
    return savedData ? JSON.parse(savedData) : createEmptyData();
  }

  // Hàm tạo dữ liệu trống
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
          monday: `Lớp ${i}`,
          tuesday: `Lớp ${i}`,
          wednesday: `Lớp ${i}`,
          thursday: `Lớp ${i}`,
          friday: `Lớp ${i}`,
          saturday: `Lớp ${i}`,
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
    ...['THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'].map(day => ({
      title: day.charAt(0).toUpperCase() + day.slice(1),
      dataIndex: day,
      width: '90px',
      align: 'center',
      render: (text, record) => {
        if (record.noCRUD) {
          return null;
        }
        return (
          <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
            <Button
              type="link"
              onClick={() => handleEdit(record.key, day)}
              style={{ cursor: 'pointer', color: text ? 'black' : '#27A4F2' }}
            >
              {text || 'Thêm'}
            </Button>
            <Button
              danger
              onClick={() => confirmDelete(record.key, day)}
              icon={<DeleteOutlined />}
              type="link"
              size="small"
              style={{ marginLeft: '5px', cursor: 'pointer' }}
            />
          </div>
        );
      },
    })),
  ];

  const handleEdit = (key, day) => {
    const record = data.find(item => item.key === key);
    setCurrentRecord({ ...record, day });
    setIsModalAddClass(true);
  };

  const confirmDelete = (key, day) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa lớp này?',
      onOk: () => handleDelete(key, day),
    });
  };

  const handleDelete = (key, day) => {
    const updatedData = data.map(item => {
      if (item.key === key) {
        return { ...item, [day]: '' };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('timetableData', JSON.stringify(updatedData));
    notification.success({
      message: 'Xóa thành công',
      description: 'Lớp học đã được xóa.',
    });
  };

  // Hàm xóa tất cả dữ liệu
  const handleDeleteAll = () => {
    Modal.confirm({
      title: 'Xác nhận xóa tất cả',
      content: 'Bạn có chắc chắn muốn xóa tất cả dữ liệu?',
      onOk: () => {
        const initialData = createEmptyData(); // Lấy dữ liệu trống
        setData(initialData); // Cập nhật state
        localStorage.setItem('timetableData', JSON.stringify(initialData)); // Cập nhật localStorage
        notification.success({
          message: 'Xóa tất cả thành công',
          description: 'Tất cả dữ liệu đã được xóa.',
        });
      },
    });
  };

  const handleOk = (values) => {
    const updatedData = data.map(item => {
      if (item.key === currentRecord.key) {
        return { ...item, [currentRecord.day]: values.className };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('timetableData', JSON.stringify(updatedData));
    setIsModalAddClass(false);
    setCurrentRecord(null);
  };

  const handleCancel = () => {
    setIsModalAddClass(false);
    setCurrentRecord(null);
  };

  const handleClearRow = (key) => {
    const updatedData = data.map(item => {
      if (item.key === key) {
        return {
          ...item,
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
        };
      }
      return item;
    });
    setData(updatedData);
    localStorage.setItem('timetableData', JSON.stringify(updatedData));
  };

  return (
    <div className="overflow-auto text-end">
      {/* Nút Xoá tất cả */}
      <div className="mb-4">
        <Button
          type="danger"
          onClick={handleDeleteAll}
          className="text-white bg-red-500 hover:bg-red-600"
        >
          Xoá tất cả dữ liệu
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        tableLayout="fixed"
        className="custom-table"
      />

      <Modal
        title="Chỉnh sửa thông tin lớp"
        visible={isModalAddClass}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleOk} layout="vertical">
          <Form.Item
            name="className"
            label="Tên lớp"
            rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
            initialValue={currentRecord ? currentRecord[currentRecord.day] : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TimetableManagement;

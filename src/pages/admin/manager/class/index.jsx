import { DeleteOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import '../main.css';

const { Option } = Select;
const { confirm } = Modal;

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const loadedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses(loadedClasses);

    const loadedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    setTeachers(loadedTeachers);
  }, []);

  const saveClassesToLocalStorage = (classes) => {
    localStorage.setItem('classes', JSON.stringify(classes));
  };

  const handleDelete = (key) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa lớp này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        const newClasses = classes.filter((classItem) => classItem.key !== key);
        setClasses(newClasses);
        saveClassesToLocalStorage(newClasses);
        message.success('Xóa lớp thành công!');
      },
    });
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setVisible(true);
  };

  const handleAdd = () => {
    setEditingClass(null);
    setVisible(true);
  };

  const handleOk = (values) => {
    const newClasses = editingClass
      ? classes.map((classItem) =>
        classItem.key === editingClass.key
          ? { ...classItem, ...values, image: imageUrl } // Thêm imageUrl vào dữ liệu
          : classItem
      )
      : [...classes, { key: Date.now().toString(), ...values, image: imageUrl }]; // Thêm imageUrl vào dữ liệu

    setClasses(newClasses);
    saveClassesToLocalStorage(newClasses);
    setVisible(false);
    setEditingClass(null);
    setImageUrl(null); // Reset URL sau khi thêm hoặc cập nhật
    message.success(editingClass ? 'Cập nhật lớp thành công!' : 'Thêm lớp thành công!');
  };


  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        resolve(reader.result);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      align: 'center',
      width: 80,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Lớp',
      dataIndex: 'name',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Số lượng học sinh tối đa',
      dataIndex: 'studentCount',
      align: 'center',
      width: 140,
      render: (text) => <span>{text || 0}</span>,
    },
    {
      title: 'Giáo viên chủ nhiệm',
      align: 'center',
      width: 330,
      dataIndex: 'teacher',
      render: (text, record) => (
        <Select
          className="w-72"
          defaultValue={text}
          onChange={(value) => {
            const updatedClasses = classes.map((classItem) =>
              classItem.key === record.key ? { ...classItem, teacher: value } : classItem
            );
            setClasses(updatedClasses);
            saveClassesToLocalStorage(updatedClasses);
          }}
        >
          {teachers.map((teacher, index) => (
            <Option key={index} value={teacher.name}>
              {teacher.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Hình ảnh Giáo viên',
      dataIndex: 'image',
      align: 'center',
      width: 200,
      render: (image) => (
        image ? (
          <div className="flex items-center justify-center">
            <img
              src={image}
              alt="Class"
              className="object-cover w-24 h-24 rounded-full"
            />
          </div>
        ) : (
          <span>Đang cập nhật</span>
        )
      ),
    },
    {
      title: 'Hành động',
      align: 'center',
      width: 180,
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}></Button>
          <Button type="link" size="small" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.key)}></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container p-5 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-xl text-center">Quản lý Lớp Học</h1>
      <Button icon={<PlusCircleOutlined />} type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm Lớp
      </Button>
      <Table columns={columns} className="custom-table" dataSource={classes} rowKey="key"
        scroll={{ y: 400 }} // Cố định chiều cao 400px
      />

      <Modal
        title={editingClass ? 'Chỉnh sửa Lớp' : 'Thêm Lớp'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }} // Cố định chiều cao modal
      >
        <Form
          layout="vertical"
          initialValues={editingClass || { name: '', studentCount: 0, teacher: '', image: '' }}
          onFinish={handleOk}
        >
          <Form.Item name="name" label="Lớp" rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}>
            <Input placeholder="Nhập tên lớp" />
          </Form.Item>
          <Form.Item name="studentCount" label="Số lượng học sinh tối đa" rules={[{ required: true, message: 'Vui lòng nhập số lượng học sinh tối đa!' }]}>
            <Input placeholder="Nhập số lượng học sinh tối đa trong lớp" type="number" min={0} />
          </Form.Item>
          <Form.Item name="teacher" label="Giáo viên chủ nhiệm" rules={[{ required: false, message: 'Vui lòng chọn giáo viên chủ nhiệm!' }]}>
            <Select placeholder="Chọn giáo viên">
              {teachers.map((teacher, index) => (
                <Option key={index} value={teacher.name}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Hình ảnh Giáo viên">
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={(file) => {
                handleImageUpload(file)
                  .then((url) => {
                    setImageUrl(url); // Cập nhật state với URL của hình ảnh
                  })
                  .catch((error) => {
                    message.error('Upload thất bại!');
                  });
                return false; // Ngăn upload mặc định
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingClass ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagement;

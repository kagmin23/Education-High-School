import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Layout, List, Modal, Select, notification } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const { Option } = Select;
const { Footer } = Layout;

const Graduate = () => {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documents, setDocuments] = useState(() => {
    const savedDocuments = localStorage.getItem('documents');
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  });

  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  const showModal = (document = null) => {
    setCurrentDocument(document);
    setEditMode(!!document);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentDocument(null);
  };

  const onFinish = (values) => {
    if (editMode) {
      // Cập nhật tài liệu
      const updatedDocuments = documents.map(doc =>
        doc.id === currentDocument.id ? { ...doc, ...values, date: values.testDate.format('YYYY-MM-DD') } : doc
      );
      setDocuments(updatedDocuments);
      notification.success({ message: 'Tài liệu đã được cập nhật thành công!' });
    } else {
      // Thêm tài liệu mới
      const newDocument = { ...values, id: documents.length + 1, date: values.testDate.format('YYYY-MM-DD') };
      setDocuments([...documents, newDocument]);
      notification.success({ message: 'Tài liệu đã được thêm thành công!' });
    }
    setVisible(false);
    setCurrentDocument(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa tài liệu này?',
      onOk: () => {
        setDocuments(documents.filter(doc => doc.id !== id));
        notification.success({ message: 'Tài liệu đã được xóa thành công!' });
      },
    });
  };

  return (
    <div className="h-screen p-4 overflow-auto">
      <h2 className="text-2xl font-semibold">Nội dung Ôn tập Tốt nghiệp THPT</h2>
      <p>
        Đây là nội dung cho việc Ôn tập Tốt nghiệp dành cho Khối 12. Bạn có thể thêm thông tin, hướng dẫn,
        và tài liệu liên quan đến việc Ôn tập ở đây.
      </p>
      {/* Nút Thêm Tài liệu */}
      <div className="mt-5 text-end">
        <Button type="primary" icon={<PlusSquareOutlined />} onClick={() => showModal()}>
            Thêm Tài liệu
        </Button>
      </div>

      {/* Modal */}
      <Modal
        title={editMode ? "Cập nhật Tài liệu Ôn tập Tốt nghiệp - THPT" : "Thêm Tài liệu Ôn tập Tốt nghiệp - THPT"}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="add_graduate_document"
          onFinish={onFinish}
          layout="vertical"
          initialValues={editMode ? { ...currentDocument, testDate: currentDocument ? moment(currentDocument.date) : null } : {}}
        >

            <Form.Item
                label="Môn học"
                name="subject"
                rules={[{ required: true, message: 'Vui lòng chọn Môn học!' }]}
            >
                <Select mode="multiple" placeholder="Chọn Môn học">
                <Option value="Toán">Toán</Option>
                <Option value="Ngữ Văn">Ngữ Văn</Option>
                <Option value="Tiếng Anh">Tiếng Anh</Option>
                <Option value="Lịch Sử">Lịch Sử</Option>
                <Option value="Địa lý">Địa lý</Option>
                <Option value="GDCD">GDCD</Option>
                <Option value="Vật Lý">Vật Lý</Option>
                <Option value="Sinh học">Sinh học</Option>
                <Option value="Hoá học">Hoá học</Option>
                </Select>
            </Form.Item>
            
          <Form.Item
            label="Lịch Kiểm tra"
            name="testDate"
            rules={[{ required: true, message: 'Vui lòng chọn lịch kiểm tra!' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="Chọn ngày kiểm tra" 
            />
          </Form.Item>

          {/* Thêm field Nội dung ôn tập */}
          <Form.Item
            label="Nội dung ôn tập"
            name="reviewContent"
            rules={[{ required: false, message: 'Vui lòng nhập nội dung ôn tập!' }]}
          >
            <Input.TextArea placeholder="Nhập nội dung ôn tập" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Danh sách tài liệu */}
      <h3 className="my-3 text-xl font-semibold">Danh sách Tài liệu - Lịch Kiểm tra Lớp</h3>
      <List
        bordered
        dataSource={documents}
        renderItem={item => (
            <List.Item className="flex flex-wrap items-center justify-between">
                <div className="flex-1 mr-4">
                <strong>Môn:</strong> {Array.isArray(item.subject) ? item.subject.join(', ') : ''} | {/* Safeguard for subject */}
                <strong> Ngày kiểm tra:</strong> {item.date} |
                <strong> Nội dung ôn tập:</strong> {item.reviewContent}
            </div>
            <div className="flex space-x-2">
                <Button type="link" onClick={() => showModal(item)}>Sửa</Button>
                <Button type="link" danger onClick={() => handleDelete(item.id)}>Xóa</Button>
            </div>
            </List.Item>
        )}
        />

        <Footer style={{ textAlign: 'center' }}>Created by KagMin © 2024</Footer>
    </div>
  );
};

export default Graduate;

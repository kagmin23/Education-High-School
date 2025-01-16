import { UploadOutlined } from '@ant-design/icons';
import { Button, Collapse, Form, Input, List, Modal, Select, TimePicker, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;
const { Option } = Select;

const TestExam = () => {
  const [foldersByClass, setFoldersByClass] = useState({}); // Store folders for each class
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isEditFolderModalVisible, setIsEditFolderModalVisible] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedClass, setSelectedClass] = useState('12A1');
  const [classes, setClasses] = useState([]);

  // Load classes from localStorage
  useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  // Load folders data for all classes from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('onlineTestByClass');
    if (storedData) {
      setFoldersByClass(JSON.parse(storedData));
    }
  }, []);

  // Save folders data whenever it changes
  useEffect(() => {
    if (Object.keys(foldersByClass).length > 0) {
      localStorage.setItem('onlineTestByClass', JSON.stringify(foldersByClass));
    }
  }, [foldersByClass]);

  const getCurrentClassFolders = () => {
    return foldersByClass[selectedClass] || [];
  };

  const openFolderModal = () => {
    form.resetFields();
    setUploadedFile(null);
    setIsFolderModalVisible(true);
  };

  const handleAddFolder = async () => {
    try {
      const values = await form.validateFields();
      const newFolder = {
        id: Date.now(),
        name: values.name,
        tests: [],
      };

      setFoldersByClass(prev => {
        const updatedFolders = {
          ...prev,
          [selectedClass]: [...(prev[selectedClass] || []), newFolder]
        };
        localStorage.setItem('onlineTestByClass', JSON.stringify(updatedFolders));
        return updatedFolders;
      });

      setIsFolderModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const openTestModal = (folderId) => {
    setSelectedFolderId(folderId);
    form.resetFields();
    setIsTestModalVisible(true);
  };

  const handleAddTest = async () => {
    try {
      const values = await form.validateFields();
      const newTest = {
        id: Date.now(),
        name: values.name,
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
        file: uploadedFile,
        link: values.link,
        completed: false,
        locked: false,
      };

      setFoldersByClass(prev => {
        const updatedFolders = {
          ...prev,
          [selectedClass]: prev[selectedClass].map(folder =>
            folder.id === selectedFolderId
              ? {
                ...folder,
                tests: [...folder.tests, newTest],
              }
              : folder
          )
        };
        localStorage.setItem('onlineTestByClass', JSON.stringify(updatedFolders));
        return updatedFolders;
      });

      setIsTestModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const handleDeleteFolder = (folderId) => {
    setFoldersByClass(prev => {
      const updatedFolders = {
        ...prev,
        [selectedClass]: prev[selectedClass].filter(folder => folder.id !== folderId)
      };
      localStorage.setItem('onlineTestByClass', JSON.stringify(updatedFolders));
      return updatedFolders;
    });
  };

  const openEditFolderModal = (folderId) => {
    setSelectedFolderId(folderId);
    const folderToEdit = getCurrentClassFolders().find(folder => folder.id === folderId);
    form.setFieldsValue({ name: folderToEdit?.name });
    setIsEditFolderModalVisible(true);
  };

  const handleEditFolder = async () => {
    try {
      const values = await form.validateFields();
      setFoldersByClass(prev => {
        const updatedFolders = {
          ...prev,
          [selectedClass]: prev[selectedClass].map(folder =>
            folder.id === selectedFolderId
              ? { ...folder, name: values.name }
              : folder
          )
        };
        localStorage.setItem('onlineTestByClass', JSON.stringify(updatedFolders));
        return updatedFolders;
      });
      setIsEditFolderModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleUpload = (file) => {
    const fileURL = URL.createObjectURL(file);
    setUploadedFile({ name: file.name, url: fileURL });
    return false;
  };

  return (
    <div className="p-4">
      <h2 className='mb-4'>Quản lý Thư mục và Bài kiểm tra</h2>
      <div className="flex flex-row justify-between">
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
        <Button type="primary" onClick={openFolderModal}>
          Thêm Thư mục
        </Button>
      </div>
      <Collapse accordion>
        {getCurrentClassFolders().map((folder) => (
          <Panel 
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{folder.name}</span>
                <div>
                  <Button
                    type="link"
                    onClick={() => openEditFolderModal(folder.id)}
                    className="mr-2"
                  >
                    Sửa
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleDeleteFolder(folder.id)}
                    danger
                  >
                    Xoá
                  </Button>
                </div>
              </div>
            } 
            key={folder.id}
          >
            <List
              bordered
              dataSource={folder.tests}
              renderItem={(test) => (
                <List.Item className='flex flex-row justify-between'>
                  <div className='w-36'>
                    <span>{test.name}</span>
                  </div>
                  <div>
                    <span>Bắt đầu: {test.startTime}</span>
                  </div>
                  <div>
                    <span>Kết thúc: {test.endTime}</span>
                  </div>
                  <div>
                    <span>File: </span>
                    {test.file ? (
                      <a
                        href={test.file.url}
                        download={test.file.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue' }}
                      >
                        {test.file.name}
                      </a>
                    ) : (
                      <span>Không có file</span>
                    )}
                  </div>
                  {test.link && (
                    <a
                      href={test.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', marginLeft: '10px' }}
                    >
                      Đi tới bài kiểm tra
                    </a>
                  )}
                </List.Item>
              )}
            />
            <Button
              type="dashed"
              onClick={() => openTestModal(folder.id)}
              className="mt-2"
            >
              Thêm bài kiểm tra
            </Button>
          </Panel>
        ))}
      </Collapse>

      {/* Folder Modal */}
      <Modal
        title="Thêm Thư mục"
        visible={isFolderModalVisible}
        onOk={handleAddFolder}
        onCancel={() => setIsFolderModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Thư mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên thư mục!' }]}
          >
            <Input placeholder="Nhập tên thư mục" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Folder Modal */}
      <Modal
        title="Sửa Thư mục"
        visible={isEditFolderModalVisible}
        onOk={handleEditFolder}
        onCancel={() => setIsEditFolderModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Thư mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên thư mục!' }]}
          >
            <Input placeholder="Nhập tên thư mục" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Test Modal */}
      <Modal
        title="Thêm Bài Kiểm Tra"
        visible={isTestModalVisible}
        onOk={handleAddTest}
        onCancel={() => setIsTestModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Bài Kiểm Tra"
            rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra!' }]}
          >
            <Input placeholder="Nhập tên bài kiểm tra" />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Giờ Bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="Giờ Kết thúc"
            rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item name="file" label="Tải lên File">
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            >
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
            {uploadedFile && (
              <div>
                <strong>{uploadedFile.name}</strong>
                <a
                  href={uploadedFile.url}
                  download={uploadedFile.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'blue', marginLeft: '10px' }}
                >
                  Tải xuống
                </a>
              </div>
            )}
          </Form.Item>

          <Form.Item name="link" label="Link Bài Kiểm Tra">
            <Input placeholder="Nhập đường dẫn bài kiểm tra" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestExam;
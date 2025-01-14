import { Button, Collapse, Form, Input, List, Modal, TimePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const TestExam = () => {
  const [folders, setFolders] = useState([]);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isEditFolderModalVisible, setIsEditFolderModalVisible] = useState(false); // For editing folder
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [form] = Form.useForm();

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('onlineTest');
    if (storedData) {
      setFolders(JSON.parse(storedData)); // Parse and load data if available
    }
  }, []); // Run only once when the component mounts

  // Save data to localStorage whenever folders change
  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem('onlineTest', JSON.stringify(folders)); // Save folders to localStorage
    }
  }, [folders]); // This will run every time folders change

  const openFolderModal = () => {
    form.resetFields();
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
      setFolders((prev) => {
        const updatedFolders = [...prev, newFolder];
        localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save new state to localStorage
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
        link: values.link,
        completed: false,
        locked: false, // Start with the test unlocked
      };

      setFolders((prev) => {
        const updatedFolders = prev.map((folder) =>
          folder.id === selectedFolderId
            ? {
              ...folder,
              tests: [...folder.tests, newTest],
            }
            : folder
        );
        localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
        return updatedFolders;
      });

      setIsTestModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  // Function to check if the test is locked
  const checkIfLocked = (test) => {
    const currentTime = moment();
    return moment(test.endTime, 'HH:mm').isBefore(currentTime); // Check if the current time is after endTime
  };

  const handleCompleteTest = (folderId, testId) => {
    setFolders((prev) => {
      const updatedFolders = prev.map((folder) =>
        folder.id === folderId
          ? {
            ...folder,
            tests: folder.tests.map((test) =>
              test.id === testId
                ? { ...test, completed: true, locked: true } // Lock the test when completed
                : test
            ),
          }
          : folder
      );
      localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
      return updatedFolders;
    });
  };

  // Function to delete a folder
  const handleDeleteFolder = (folderId) => {
    setFolders((prev) => {
      const updatedFolders = prev.filter((folder) => folder.id !== folderId);
      localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
      return updatedFolders;
    });
  };

  // Function to open edit folder modal
  const openEditFolderModal = (folderId) => {
    setSelectedFolderId(folderId);
    const folderToEdit = folders.find((folder) => folder.id === folderId);
    form.setFieldsValue({ name: folderToEdit?.name });
    setIsEditFolderModalVisible(true);
  };

  // Function to handle folder edit
  const handleEditFolder = async () => {
    try {
      const values = await form.validateFields();
      setFolders((prev) => {
        const updatedFolders = prev.map((folder) =>
          folder.id === selectedFolderId
            ? { ...folder, name: values.name }
            : folder
        );
        localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
        return updatedFolders;
      });
      setIsEditFolderModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Quản lý Thư mục và Bài kiểm tra</h2>
      <Button type="primary" onClick={openFolderModal} className="my-4">
        Thêm Thư mục
      </Button>
      <Collapse accordion>
        {folders.map((folder) => (
          <Panel header={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </div>} key={folder.id}>
            <List
              bordered
              dataSource={folder.tests}
              renderItem={(test, index) => (
                <List.Item className='flex flex-row justify-between'>
                  <div>
                    <span>{test.name}</span>
                  </div>
                  {/* Link Button */}
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
        title="Thêm Bài kiểm tra"
        visible={isTestModalVisible}
        onOk={handleAddTest}
        onCancel={() => setIsTestModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên Bài kiểm tra"
            rules={[{ required: true, message: 'Vui lòng nhập tên bài kiểm tra!' }]}
          >
            <Input placeholder="Nhập tên bài kiểm tra" />
          </Form.Item>
          <div className='flex flex-row justify-between'>
            <Form.Item
              name="startTime"
              label="Thời gian bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
            <Form.Item
              name="endTime"
              label="Thời gian kết thúc"
              rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
            >
              <TimePicker format="HH:mm" />
            </Form.Item>
          </div>
          <Form.Item
            name="link"
            label="Link bài kiểm tra"
            rules={[{ required: true, message: 'Vui lòng nhập link bài kiểm tra!' }]}
          >
            <Input placeholder="Nhập link bài kiểm tra" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TestExam;

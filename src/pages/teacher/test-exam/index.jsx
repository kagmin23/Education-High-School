import { Button, Collapse, Form, Input, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const TestExam = () => {
  const [folders, setFolders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const openModal = () => {
    form.resetFields();
    setIsModalVisible(true);
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
      setIsModalVisible(false);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const handleAddTest = (folderId) => {
    const testName = prompt('Nhập tên bài kiểm tra:');
    if (testName) {
      setFolders((prev) => {
        const updatedFolders = prev.map((folder) =>
          folder.id === folderId
            ? {
                ...folder,
                tests: [
                  ...folder.tests,
                  { id: Date.now(), name: testName, completed: false },
                ],
              }
            : folder
        );
        localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
        return updatedFolders;
      });
    }
  };

  const handleCompleteTest = (folderId, testId) => {
    setFolders((prev) => {
      const updatedFolders = prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              tests: folder.tests.map((test) =>
                test.id === testId ? { ...test, completed: true } : test
              ),
            }
          : folder
      );
      localStorage.setItem('onlineTest', JSON.stringify(updatedFolders)); // Save updated state to localStorage
      return updatedFolders;
    });
  };

  return (
    <div className="p-4">
      <h2>Quản lý Thư mục và Bài kiểm tra</h2>
      <Button type="primary" onClick={openModal} className="my-4">
        Thêm Thư mục
      </Button>
      <Collapse accordion>
        {folders.map((folder) => (
          <Panel header={folder.name} key={folder.id}>
            <List
              bordered
              dataSource={folder.tests}
              renderItem={(test, index) => (
                <List.Item>
                  <div>
                    <span>{test.name}</span>
                    {test.completed ? (
                      <span style={{ color: 'green' }}> - Hoàn thành</span>
                    ) : (
                      <Button
                        type="primary"
                        size="small"
                        disabled={
                          index > 0 && !folder.tests[index - 1].completed
                        }
                        onClick={() =>
                          handleCompleteTest(folder.id, test.id)
                        }
                      >
                        Hoàn thành
                      </Button>
                    )}
                  </div>
                </List.Item>
              )}
            />
            <Button
              type="dashed"
              onClick={() => handleAddTest(folder.id)}
              className="mt-2"
            >
              Thêm bài kiểm tra
            </Button>
          </Panel>
        ))}
      </Collapse>
      <Modal
        title="Thêm Thư mục"
        visible={isModalVisible}
        onOk={handleAddFolder}
        onCancel={() => setIsModalVisible(false)}
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
    </div>
  );
};

export default TestExam;

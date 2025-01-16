import { CloudDownloadOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Collapse, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const TestOnline = () => {
  const [folders, setFolders] = useState([]); // Initialize as an array
  const [openedLink, setOpenedLink] = useState(false); // Track the clicked link state
  const [userClass, setUserClass] = useState(null); // Store the class of the logged-in user

  // Load user data and folder data from localStorage
  useEffect(() => {
    try {
      // Load user information (e.g., class) from localStorage
      const storedUser = localStorage.getItem('loggedInUser');
      const parsedUser = storedUser ? JSON.parse(storedUser) : {};
      const userClass = parsedUser.class || null; // Assuming `class` is the key for user's class
      setUserClass(userClass);

      // Load folder data
      const storedData = localStorage.getItem('onlineTestByClass');
      const parsedData = storedData ? JSON.parse(storedData) : {};

      // Transform object to array of folder objects and filter by userClass
      const transformedData = Object.entries(parsedData)
        .filter(([key]) => key === userClass) // Filter by user's class
        .map(([key, value]) => ({
          name: key, // Use the key (e.g., "12A1", "12A3") as folder name
          tests: value, // Corresponding array of tests
        }));

      setFolders(transformedData);
    } catch (error) {
      console.error('Error loading or parsing data:', error);
      setFolders([]); // Default to empty array on error
    }
  }, []);

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: 'Tên bài kiểm tra',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center',
    },
    {
      title: 'Link bài kiểm tra',
      dataIndex: 'link',
      key: 'link',
      align: 'center',
      render: (text, record) => (
        text ? (
          <a
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!openedLink && record.id !== folders[0]?.tests[0]?.id) {
                e.preventDefault(); // Prevent default behavior if the test is locked
                message.warning('Hãy hoàn thành bài kiểm tra phía trước.');
              } else {
                setOpenedLink(true); // Mark the test as opened
              }
            }}
          >
            Đi tới bài kiểm tra <DoubleRightOutlined />
          </a>
        ) : 'Không có link'
      ),
    },
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file',
      align: 'center',
      render: (file) => (
        file && file.url ? (
          <a
            href={file.url}
            target="_blank"
            download={file.name}
            rel="noopener noreferrer"
          >
            Tải xuống {file.name} <CloudDownloadOutlined />
          </a>
        ) : 'Không có file'
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'uploadFile',
      key: 'uploadFile',
      align: 'center',
    },
  ];

  return (
    <div>
      {folders.length > 0 ? (
        <Collapse accordion>
          {folders.map((folder) => (
            <Panel header={folder.name} key={folder.name}>
              <Table
                dataSource={folder.tests}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
              />
            </Panel>
          ))}
        </Collapse>
      ) : (
        <p>{userClass ? 'Không có dữ liệu nào cho lớp của bạn.' : 'Không có thông tin lớp học.'}</p>
      )}
    </div>
  );
};

export default TestOnline;
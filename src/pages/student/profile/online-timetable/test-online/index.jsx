import { CloudDownloadOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Collapse, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const TestOnline = () => {
  const [folders, setFolders] = useState([]);
  const [openedLink, setOpenedLink] = useState(false); // Trạng thái theo dõi việc nhấn vào link

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem('onlineTest');
    if (storedData) {
      setFolders(JSON.parse(storedData)); // Parse and load data if available
    }
  }, []); // Run only once when the component mounts

  // Columns for the table
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
                e.preventDefault(); // Ngừng hành động mặc định nếu bài kiểm tra chưa được mở
                message.warning("Hãy hoàn thành bài kiểm tra phía trước.");
              } else {
                setOpenedLink(true); // Đánh dấu bài kiểm tra đã được mở
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
      render: (text) => (
        text ? (
          <a
            href={text}
            target="_blank"
            download
            rel="noopener noreferrer"
          >
            Tải xuống file <CloudDownloadOutlined />
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
    <div className="">
      <Collapse accordion>
        {folders.map((folder) => (
          <Panel header={folder.name} key={folder.id}>
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
    </div>
  );
};

export default TestOnline;

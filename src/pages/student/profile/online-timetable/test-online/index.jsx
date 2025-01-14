import { DoubleRightOutlined } from '@ant-design/icons';
import { Collapse, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;

const TestOnline = () => {
  const [folders, setFolders] = useState([]);

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
      render: (text) => (
        text ? <a href={text} target="_blank" rel="noopener noreferrer">Đi tới bài kiểm tra <DoubleRightOutlined /></a> : 'Không có link'
      ),
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
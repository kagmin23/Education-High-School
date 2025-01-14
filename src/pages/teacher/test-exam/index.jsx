import { Layout } from 'antd';
import React, { useState } from 'react';

const { Header, Content } = Layout;

const TestExam = () => {
  const [questions, setQuestions] = useState([]);

  return (
    <Layout className="min-h-screen">
      <Header className="py-4 text-xl text-center text-white bg-blue-600">
        Tạo và Chấm điểm Bài Kiểm Tra
      </Header>
      <Content className="p-4">
        Hello
      </Content>
    </Layout>
  );
};

export default TestExam;

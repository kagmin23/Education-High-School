import { Layout } from 'antd';
import React, { useState } from 'react';
import QuizCreator from './quiz-creator';
import QuizGrader from './quiz-grade';

const { Header, Content } = Layout;

const TestExam = () => {
  const [questions, setQuestions] = useState([]);

  return (
    <Layout className="min-h-screen">
      <Header className="py-4 text-xl text-center text-white bg-blue-600">
        Tạo và Chấm điểm Bài Kiểm Tra
      </Header>
      <Content className="p-4">
        <QuizCreator setQuestions={setQuestions} />
        {questions.length > 0 || localStorage.getItem('quizData') ? (
          <QuizGrader />
        ) : null}
      </Content>
    </Layout>
  );
};

export default TestExam;

import { Button, Form } from 'antd';
import React, { useState } from 'react';
import FileUploader from './file-upload-test';

const QuizCreator = () => {
  const [questions, setQuestions] = useState([]);

  // Hàm lưu dữ liệu vào localStorage
  const handleSubmit = () => {
    // Lưu dữ liệu vào localStorage
    localStorage.setItem('quizData', JSON.stringify(questions));
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <FileUploader setQuestions={setQuestions} />

      <Form className="mt-4">
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <Form.Item label={`Câu hỏi ${index + 1}`}>
              <p>{q.question}</p>
            </Form.Item>
            <Form.Item label="Đáp án">
              <ul>
                {q.options.map((option, oIndex) => (
                  <li key={oIndex}>{option}</li>
                ))}
              </ul>
            </Form.Item>
            <Form.Item label="Đáp án đúng">
              <p>{q.correctAnswer}</p>
            </Form.Item>
          </div>
        ))}
      </Form>
      
      <Button type="primary" onClick={handleSubmit} disabled={questions.length === 0}>
        Lưu bài kiểm tra
      </Button>
    </div>
  );
};

export default QuizCreator;

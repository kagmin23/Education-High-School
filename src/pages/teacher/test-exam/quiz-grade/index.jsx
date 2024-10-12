import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';

const QuizGrader = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quizData'));
    if (savedQuestions) {
      setQuestions(savedQuestions);
      setUserAnswers(Array(savedQuestions.length).fill(''));
    }
  }, []);

  const handleAnswerChange = (index, value) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = value;
    setUserAnswers(newUserAnswers);
  };

  const gradeQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === userAnswers[index]) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h2 className="mb-4 text-xl font-semibold">Chấm điểm bài kiểm tra</h2>
      <Form>
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg">{q.question}</p>
            <Form.Item>
              <Input
                placeholder="Nhập đáp án của bạn"
                value={userAnswers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </Form.Item>
          </div>
        ))}
        <Button type="primary" onClick={gradeQuiz} className="w-full">
          Chấm điểm
        </Button>
        {score !== null && (
          <p className="mt-4 text-lg font-bold">
            Điểm của bạn: {score}/{questions.length}
          </p>
        )}
      </Form>
    </div>
  );
};

export default QuizGrader;

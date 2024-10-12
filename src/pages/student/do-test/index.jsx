import { Button, Form, Modal, Radio, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng để điều hướng

const DoTest = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(600); // 600 giây = 10 phút
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Load câu hỏi từ localStorage
  useEffect(() => {
    const savedQuestions = JSON.parse(localStorage.getItem('quizData'));
    if (savedQuestions) {
      setQuestions(savedQuestions);
      setUserAnswers(Array(savedQuestions.length).fill(null)); // Khởi tạo đáp án rỗng
    }

    // Tạo timer
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Dừng timer khi nộp bài
    if (submitted) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown);
  }, [submitted]);

  // Xử lý chọn đáp án
  const handleAnswerChange = (index, value) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = value;
    setUserAnswers(newUserAnswers);
  };

  // Nộp bài và chấm điểm
  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === userAnswers[index]) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    Modal.success({
      title: 'Kết quả bài kiểm tra',
      content: `Bạn đã trả lời đúng ${correctCount}/${questions.length} câu hỏi.`,
    });
  };

  // Hàm định dạng thời gian (phút:giây)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Hiển thị modal xác nhận thoát
  const showExitModal = () => {
    setIsModalVisible(true);
  };

  // Xác nhận nộp bài và thoát
  const handleConfirmExit = () => {
    handleSubmit(); // Nộp bài trước khi thoát
    setIsModalVisible(false);
    
    // Thông báo thành công
    notification.success({
      message: 'Nộp bài thành công',
      description: 'Bạn đã nộp bài thành công!',
    });

    // Điều hướng về trang chủ
    navigate('/student');
  };

  // Hủy thoát
  const handleCancelExit = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Bài kiểm tra trắc nghiệm</h2>

      {submitted ? (
        <p className="text-lg font-semibold">Điểm của bạn: {score}/{questions.length}</p>
      ) : (
        <>
          <div className="mb-4 text-lg font-bold text-right">
            Thời gian còn lại: {formatTime(timer)}
          </div>

          <Form onFinish={handleSubmit}>
            {questions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="text-lg font-medium">{q.question}</p>
                <Form.Item>
                  <Radio.Group
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    value={userAnswers[index]}
                  >
                    {q.options.map((option, oIndex) => (
                      <Radio key={oIndex} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </div>
            ))}

            <Button type="primary" htmlType="submit" className="w-full mb-4" disabled={timer === 0}>
              Nộp bài
            </Button>
            <Button type="danger" className="w-full" onClick={showExitModal}>
              Thoát
            </Button>
          </Form>
        </>
      )}

      {/* Modal xác nhận thoát */}
      <Modal
        title="Xác nhận nộp và thoát bài làm"
        visible={isModalVisible}
        onOk={handleConfirmExit}
        onCancel={handleCancelExit}
        okText="Nộp bài và thoát"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn nộp bài và thoát?</p>
      </Modal>
    </div>
  );
};

export default DoTest;

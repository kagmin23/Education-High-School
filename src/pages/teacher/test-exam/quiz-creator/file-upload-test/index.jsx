import { Button, Modal, Upload } from 'antd';
import * as mammoth from 'mammoth';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const FileUploader = ({ setQuestions }) => {
  const [fileType, setFileType] = useState('');

  // Hàm xử lý file upload
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (fileType === 'word') {
        await handleWordFile(e);
      } else if (fileType === 'excel') {
        await handleExcelFile(e);
      }
    };
    reader.readAsArrayBuffer(file);
    return false; // Ngăn không cho Ant Design tự động upload
  };

  // Hàm xử lý file Word
  const handleWordFile = async (e) => {
    try {
      const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
      const text = result.value;
      const questions = parseQuestionsFromText(text);
      setQuestions(questions);
    } catch (error) {
      Modal.error({
        title: 'Lỗi',
        content: 'Không thể đọc file Word. Vui lòng thử lại.',
      });
    }
  };

  // Hàm xử lý file Excel
  const handleExcelFile = async (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const text = jsonData.flat().join('\n'); // Chuyển đổi dữ liệu thành chuỗi
    const questions = parseQuestionsFromText(text);
    setQuestions(questions);
  };

  // Hàm phân tích câu hỏi và đáp án từ văn bản
  const parseQuestionsFromText = (text) => {
    const lines = text.split('\n');
    const questions = [];
    for (let line of lines) {
      const parts = line.split('|'); // Giả sử mỗi câu hỏi và đáp án được phân cách bằng dấu "|"
      if (parts.length > 1) {
        questions.push({
          question: parts[0].trim(),
          options: parts.slice(1, -1).map(option => option.trim()),
          correctAnswer: parts[parts.length - 1].trim(),
        });
      }
    }
    return questions;
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <Upload 
        beforeUpload={(file) => {
          const fileType = file.type.includes('word') ? 'word' : 'excel';
          setFileType(fileType);
          return handleUpload(file);
        }} 
        accept=".docx, .xlsx, .xls"
      >
        <Button type="primary">Tải lên file câu hỏi (Word hoặc Excel)</Button>
      </Upload>
    </div>
  );
};

export default FileUploader;

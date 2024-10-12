// NotFound.js
import { ToolOutlined } from '@ant-design/icons';
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-4 text-6xl text-gray-500">
          <ToolOutlined />
        </div>
        
        <p className="mt-2 text-xl font-bold text-gray-600">Trang không tìm thấy</p>
        
        <p className="mt-1 text-gray-500">Xin vui lòng kiểm tra lại đường dẫn hoặc quay lại trang chủ.</p>
        <h2 className="relative inline-block mt-10 font-bold text-gray-800 text-8xl"> {/* Thay đổi kích thước */}
          404
          <span className="absolute inset-0 opacity-50 bg-gradient-to-r from-blue-500 to-purple-500 blur-md"></span> {/* Thêm hiệu ứng đổ bóng */}
        </h2>
      </div>
    </div>
  );
};

export default NotFound;

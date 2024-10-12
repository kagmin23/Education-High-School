import { Table } from 'antd';
import React from 'react';

const Schedule = () => {
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 120,
      align: 'center'
    },
    {
      title: '',
      dataIndex: 'empty',
      key: 'empty',
      width: 60,
    },
    {
      title: 'THỨ 2',
      dataIndex: 'monday',
      key: 'monday',
      align: 'center'
    },
    {
      title: 'THỨ 3',
      dataIndex: 'tuesday',
      key: 'tuesday',
      align: 'center'
    },
    {
      title: 'THỨ 4',
      dataIndex: 'wednesday',
      key: 'wednesday',
      align: 'center'
    },
    {
      title: 'THỨ 5',
      dataIndex: 'thursday',
      key: 'thursday',
      align: 'center'
    },
    {
      title: 'THỨ 6',
      dataIndex: 'friday',
      key: 'friday',
      align: 'center'
    },
    {
      title: 'THỨ 7',
      dataIndex: 'saturday',
      key: 'saturday',
      align: 'center'
    },
    {
      title: 'CN',
      dataIndex: 'sunday',
      key: 'sunday',
      align: 'center'
    },
  ];

  const data = [
    { key: 'morning1', time: 'Sáng - Tiết 1', monday: 'Chào cờ', tuesday: 'Môn B', wednesday: 'Môn C', thursday: 'Môn D', friday: 'Môn E', saturday: 'Môn F', sunday: 'Nghỉ' },
    { key: 'morning2', time: 'Sáng - Tiết 2', monday: 'Môn G', tuesday: 'Môn H', wednesday: 'Môn I', thursday: 'Môn J', friday: 'Môn K', saturday: 'Môn L' },
    { key: 'morning3', time: 'Sáng - Tiết 3', monday: 'Môn M', tuesday: 'Môn N', wednesday: 'Môn O', thursday: 'Môn P', friday: 'Môn Q', saturday: 'Môn R' },
    { key: 'morning4', time: 'Sáng - Tiết 4', monday: 'Môn S', tuesday: 'Môn T', wednesday: 'Môn U', thursday: 'Môn V', friday: 'Môn W', saturday: 'Môn X' },
    { key: 'morning5', time: 'Sáng - Tiết 5', monday: 'Môn Y', tuesday: 'Môn Z', wednesday: 'Môn A1', thursday: 'Môn B1', friday: 'Môn C1', saturday: 'Môn D1' },
    { key: 'break', time: 'Nghỉ trưa', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '' },
    { key: 'afternoon1', time: 'Chiều - Tiết 1', monday: 'Môn E1', tuesday: 'Môn F1', wednesday: 'Môn G1', thursday: 'Môn H1', friday: 'Môn I1', saturday: 'Môn J1', sunday: 'Nghỉ' },
    { key: 'afternoon2', time: 'Chiều - Tiết 2', monday: 'Môn K1', tuesday: 'Môn L1', wednesday: 'Môn M1', thursday: 'Môn N1', friday: 'Môn O1', saturday: 'Môn P1' },
    { key: 'afternoon3', time: 'Chiều - Tiết 3', monday: 'Môn Q1', tuesday: 'Môn R1', wednesday: 'Môn S1', thursday: 'Môn T1', friday: 'Môn U1', saturday: 'Môn V1' },
    { key: 'afternoon4', time: 'Chiều - Tiết 4', monday: 'Môn W1', tuesday: 'Môn X1', wednesday: 'Môn Y1', thursday: 'Môn Z1', friday: 'Môn A2', saturday: 'Môn B2' },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-sm">Thời Khóa Biểu Học Sinh</h1>
        <p className="mr-2">Lớp: <span className="font-bold">10A1</span></p>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false}
        bordered
        className="w-full mb-5 custom-table"
        rowClassName={(record, index) => {
          if (record.key === 'break') return 'bg-gray-200 font-bold';
          return index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        }}
      />
      <div className="text-center ">
        <p className="italic text-red-500">* Học sinh lưu ý theo dõi thông tin liên tục tại website để cập nhật nhanh chóng những thông tin mới nhất từ nhà trường</p>
      </div>
    </div>
  );
};

export default Schedule;
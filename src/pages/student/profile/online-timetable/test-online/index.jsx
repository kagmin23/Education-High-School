import { CloudDownloadOutlined } from '@ant-design/icons';
import { Card, List, message } from 'antd';
import { ArrowRight, Lock, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TestOnline = () => {
  const [folders, setFolders] = useState([]);
  const [completedTests, setCompletedTests] = useState({});
  const [userClass, setUserClass] = useState(null);
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserClass(parsedUser.class);

      const storedCompleted = localStorage.getItem(`completedTests_${parsedUser.class}`);
      if (storedCompleted) {
        setCompletedTests(JSON.parse(storedCompleted));
      }

      const storedSubmissions = localStorage.getItem(`submissions_${parsedUser.class}`);
      if (storedSubmissions) {
        setSubmissions(JSON.parse(storedSubmissions));
      }
    }

    const storedData = localStorage.getItem('onlineTestByClass');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData[userClass]) {
        setFolders(parsedData[userClass]);
      }
    }
  }, [userClass]);

  const handleTestStart = (testId) => {
    const updatedCompleted = { ...completedTests, [testId]: true };
    setCompletedTests(updatedCompleted);
    localStorage.setItem(`completedTests_${userClass}`, JSON.stringify(updatedCompleted));
  };

  const isTestAvailable = (test, index, folderTests) => {
    if (index === 0) return true;
    const previousTest = folderTests[index - 1];
    return completedTests[previousTest.id];
  };

  const handleFileUpload = (testId, file) => {
    const fileURL = URL.createObjectURL(file);
    
    // Get existing submissions for this test or initialize empty array
    const existingTestSubmissions = submissions[testId]?.files || [];
    
    // Create new submission
    const newSubmission = {
      fileName: file.name,
      fileURL: fileURL,
      uploadTime: new Date().toLocaleString(),
      id: Date.now() // Unique ID for each submission
    };

    // Update submissions with new array
    const updatedSubmissions = {
      ...submissions,
      [testId]: {
        files: [...existingTestSubmissions, newSubmission],
        testId: testId
      }
    };
    
    setSubmissions(updatedSubmissions);
    localStorage.setItem(`submissions_${userClass}`, JSON.stringify(updatedSubmissions));
    message.success('Nộp bài thành công!');
    return false;
  };

  const handleDeleteSubmission = (testId, submissionId) => {
    const updatedSubmissions = {
      ...submissions,
      [testId]: {
        ...submissions[testId],
        files: submissions[testId].files.filter(file => file.id !== submissionId)
      }
    };

    // If no files left, remove the entire test entry
    if (updatedSubmissions[testId].files.length === 0) {
      delete updatedSubmissions[testId];
    }

    setSubmissions(updatedSubmissions);
    localStorage.setItem(`submissions_${userClass}`, JSON.stringify(updatedSubmissions));
    message.success('Đã xóa bài nộp!');
  };

  const formatTime = (time) => {
    return time ? new Date(`2024-01-01T${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A';
  };

  return (
    <div className="p-4 space-y-4">
      <Card className="mb-4">
        <h2 className="text-lg font-semibold">Bài kiểm tra trực tuyến - {userClass}</h2>
      </Card>

      {folders.length > 0 ? (
        <div className="space-y-4">
          {folders.map((folder) => (
            <Card key={folder.id} className="w-full">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{folder.name}</h3>
              </div>
              <div className="space-y-4">
                {folder.tests.map((test, index) => (
                  <div
                    key={test.id}
                    className="border rounded-lg"
                  >
                    <div className="flex items-center justify-between p-4 bg-white">
                      <div className="flex-1">
                        <h3 className="font-medium">{test.name}</h3>
                        <div className="mt-1 text-sm text-gray-500">
                          <span>Bắt đầu: {formatTime(test.startTime)}</span>
                          <span className="mx-2">|</span>
                          <span>Kết thúc: {formatTime(test.endTime)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {test.file && (
                          <a
                            href={test.file.url}
                            download={test.file.name}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <CloudDownloadOutlined className="w-4 h-4 mr-1" />
                            Tải file
                          </a>
                        )}

                        {test.link && (
                          <a
                            href={isTestAvailable(test, index, folder.tests) ? test.link : '#'}
                            onClick={(e) => {
                              if (!isTestAvailable(test, index, folder.tests)) {
                                e.preventDefault();
                                alert('Vui lòng hoàn thành các bài kiểm tra trước.');
                              } else {
                                handleTestStart(test.id);
                              }
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center ${isTestAvailable(test, index, folder.tests)
                              ? 'text-green-600 hover:text-green-800'
                              : 'text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {isTestAvailable(test, index, folder.tests) ? (
                              <ArrowRight className="w-4 h-4 mr-1" />
                            ) : (
                              <Lock className="w-4 h-4 mr-1" />
                            )}
                            Làm bài
                          </a>
                        )}

                        <label className="flex items-center cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.length) {
                                handleFileUpload(test.id, e.target.files[0]);
                              }
                            }}
                            accept=".pdf,.doc,.docx,.jpg,.png"
                          />
                          <div className="flex items-center text-blue-600 hover:text-blue-800">
                            <Upload className="w-4 h-4 mr-1" />
                            Nộp bài
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Submissions List */}
                    {submissions[test.id]?.files?.length > 0 && (
                      <div className="border-t">
                        <List
                          size="small"
                          dataSource={submissions[test.id].files}
                          renderItem={item => (
                            <List.Item
                              className="flex items-center px-4"
                              actions={[
                                <button
                                  key="delete"
                                  onClick={() => handleDeleteSubmission(test.id, item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              ]}
                            >
                              <div className="flex-1">
                                <a 
                                  href={item.fileURL}
                                  download={item.fileName}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {item.fileName}
                                </a>
                                <div className="text-xs text-gray-500">
                                  Đã nộp: {item.uploadTime}
                                </div>
                              </div>
                            </List.Item>
                          )}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="p-4">
            <p className="text-center text-gray-500">
              {userClass ? 'Không có bài kiểm tra nào cho lớp của bạn.' : 'Vui lòng đăng nhập để xem bài kiểm tra.'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TestOnline;
import React, { useEffect, useState } from 'react';

const Exercises = () => {
  const [chapters, setChapters] = useState([]); // State lưu dữ liệu các chương và bài học
  const [newComment, setNewComment] = useState(""); // State lưu bình luận mới
  const [lessonComments, setLessonComments] = useState({}); // State lưu bình luận cho từng bài học theo ID

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedChapters = localStorage.getItem('chapters');
    if (storedChapters) {
      setChapters(JSON.parse(storedChapters)); // Chuyển dữ liệu từ string thành object
    }
  }, []);

  // Hàm để thêm bình luận vào bài học
  const handleCommentSubmit = (lessonId) => {
    if (newComment.trim() !== "") {
      // Cập nhật bình luận của bài học cụ thể
      const updatedLessonComments = {
        ...lessonComments,
        [lessonId]: [...(lessonComments[lessonId] || []), newComment],
      };
      setLessonComments(updatedLessonComments); // Cập nhật state bình luận của bài học
      setNewComment(""); // Xóa ô input sau khi gửi

      // Cập nhật lại chapters và localStorage
      const updatedChapters = chapters.map(chapter => {
        const updatedLessons = chapter.lessons.map(lesson => {
          if (lesson.id === lessonId) {
            return {
              ...lesson,
              comments: updatedLessonComments[lessonId] || [],
            };
          }
          return lesson;
        });
        return { ...chapter, lessons: updatedLessons };
      });

      setChapters(updatedChapters);
      localStorage.setItem('chapters', JSON.stringify(updatedChapters)); // Cập nhật lại localStorage
    }
  };

  return (
    <div className="container">
      <h1 className="mb-5 text-2xl font-bold">Danh sách bài tập</h1>
      {chapters.length === 0 ? (
        <p>Không có dữ liệu bài tập</p>
      ) : (
        chapters.map((chapter, index) => (
          <div key={index} className="chapter">
            <h2 className="text-xl font-semibold">{chapter.title} - {chapter.subject}</h2>
            <ul className="mt-4 lesson-list">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id} className="mb-2 lesson-item">
                  <h3 className="font-medium">{lesson.name}</h3>
                  <p>{lesson.content}</p>

                  {/* Hiển thị các bình luận */}
                  <div className="mt-4 chat-box">
                    <h4 className="font-semibold">Bình luận:</h4>
                    <ul className="comment-list">
                      {(lessonComments[lesson.id] && lessonComments[lesson.id].length > 0) ? (
                        lessonComments[lesson.id].map((comment, idx) => (
                          <li key={idx} className="comment-item">
                            <p>{comment}</p>
                          </li>
                        ))
                      ) : (
                        <p>Chưa có bình luận nào.</p>
                      )}
                    </ul>
                    {/* Form để thêm bình luận */}
                    <textarea
                      className="w-full p-2 mt-2 border border-gray-300"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Viết bình luận..."
                    />
                    <button
                      className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                      onClick={() => handleCommentSubmit(lesson.id)}
                    >
                      Gửi bình luận
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Exercises;

import React, { useEffect, useState } from 'react';

const ExercisesStudent = () => {
    const [chapters, setChapters] = useState([]); // State lưu dữ liệu các chương và bài học
    const [lessonComments, setLessonComments] = useState({}); // State lưu bình luận cho từng bài học theo ID
    const [inputComments, setInputComments] = useState({}); // State lưu bình luận nhập vào cho từng bài học

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedChapters = localStorage.getItem('chapters');
        if (storedChapters) {
            const parsedChapters = JSON.parse(storedChapters);
            setChapters(parsedChapters);

            // Tạo lessonComments từ dữ liệu đã lưu vào localStorage
            const comments = {};
            parsedChapters.forEach(chapter => {
                chapter.lessons.forEach(lesson => {
                    if (lesson.comments) {
                        comments[lesson.id] = lesson.comments;
                    }
                });
            });
            setLessonComments(comments);
        }
    }, []);

    // Hàm để thêm bình luận vào bài học
    const handleCommentSubmit = (lessonId) => {
        const newComment = inputComments[lessonId] || "";
        if (newComment.trim() !== "") {
            // Cập nhật bình luận của bài học cụ thể
            const updatedLessonComments = {
                ...lessonComments,
                [lessonId]: [...(lessonComments[lessonId] || []), newComment],
            };
            setLessonComments(updatedLessonComments); // Cập nhật state bình luận của bài học
            setInputComments({ ...inputComments, [lessonId]: "" }); // Xóa ô input sau khi gửi

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

    // Hàm thay đổi giá trị bình luận đang nhập vào của từng bài học
    const handleInputChange = (lessonId, event) => {
        setInputComments({
            ...inputComments,
            [lessonId]: event.target.value,
        });
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-5 text-2xl font-bold">Danh sách bài tập</h1>
            {chapters.length === 0 ? (
                <p>Không có dữ liệu bài tập</p>
            ) : (
                chapters.map((chapter, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="text-xl font-semibold">{chapter.title} - {chapter.subject}</h2>
                        <ul className="mt-4">
                            {chapter.lessons.map((lesson) => (
                                <li key={lesson.id} className="p-4 mb-4 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50">
                                    <h3 className="text-lg font-medium">{lesson.name}</h3>
                                    <p className="mt-2 text-gray-700">{lesson.content}</p>

                                    {/* Khung bình luận */}
                                    <div className="pt-4 mt-4 border-t-2 chat-box">
                                        <h4 className="text-lg font-semibold">Bình luận:</h4>
                                        <ul className="mt-2 comment-list">
                                            {(lessonComments[lesson.id] && lessonComments[lesson.id].length > 0) ? (
                                                lessonComments[lesson.id].map((comment, idx) => (
                                                    <li key={idx} className="p-2 mb-2 bg-white border border-gray-200 rounded-md shadow-sm comment-item">
                                                        <p className="text-gray-600">{comment}</p>
                                                    </li>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">Chưa có bình luận nào.</p>
                                            )}
                                        </ul>
                                        {/* Form để thêm bình luận */}
                                        <textarea
                                            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                            value={inputComments[lesson.id] || ""}
                                            onChange={(e) => handleInputChange(lesson.id, e)}
                                            placeholder="Viết bình luận..."
                                        />
                                        <button
                                            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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

export default ExercisesStudent;

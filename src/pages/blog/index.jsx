import { DislikeOutlined, DoubleLeftOutlined, LikeOutlined } from '@ant-design/icons';
import { Button, Card, Input, Layout, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;
const { Footer, Content } = Layout;

const SchoolBlog = () => {
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [likesData, setLikesData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('schoolBlogData');
        const storedComments = localStorage.getItem('comments');
        const storedLikesData = localStorage.getItem('blogLikesData');

        if (data) {
            const blogList = JSON.parse(data);
            setBlogs(blogList);
            setSelectedBlog(blogList[0]);
        }

        if (storedComments) setComments(JSON.parse(storedComments));

        if (storedLikesData) {
            setLikesData(JSON.parse(storedLikesData));
        }
    }, []);

    const handleLike = () => {
        const updatedLikesData = { ...likesData };
        const blogId = selectedBlog.id;

        if (!updatedLikesData[blogId]) {
            updatedLikesData[blogId] = { likes: 0, dislikes: 0, liked: false, disliked: false };
        }

        if (updatedLikesData[blogId].liked) {
            updatedLikesData[blogId].likes -= 1;
            updatedLikesData[blogId].liked = false;
        } else {
            updatedLikesData[blogId].likes += 1;
            updatedLikesData[blogId].liked = true;

            if (updatedLikesData[blogId].disliked) {
                updatedLikesData[blogId].dislikes -= 1;
                updatedLikesData[blogId].disliked = false;
            }
        }

        setLikesData(updatedLikesData);
        localStorage.setItem('blogLikesData', JSON.stringify(updatedLikesData));
    };

    const handleDislike = () => {
        const updatedLikesData = { ...likesData };
        const blogId = selectedBlog.id;

        if (!updatedLikesData[blogId]) {
            updatedLikesData[blogId] = { likes: 0, dislikes: 0, liked: false, disliked: false };
        }

        if (updatedLikesData[blogId].disliked) {
            updatedLikesData[blogId].dislikes -= 1;
            updatedLikesData[blogId].disliked = false;
        } else {
            updatedLikesData[blogId].dislikes += 1;
            updatedLikesData[blogId].disliked = true;

            if (updatedLikesData[blogId].liked) {
                updatedLikesData[blogId].likes -= 1;
                updatedLikesData[blogId].liked = false;
            }
        }

        setLikesData(updatedLikesData);
        localStorage.setItem('blogLikesData', JSON.stringify(updatedLikesData));
    };

    const handleCommentSubmit = () => {
        if (commentInput.trim()) {
            const newComments = [...comments, commentInput];
            setComments(newComments);
            setCommentInput('');
            localStorage.setItem('comments', JSON.stringify(newComments));
        }
    };

    const handleBlogSelection = (blog) => {
        setSelectedBlog(blog);
        setComments([]);
        setCommentInput('');

        if (likesData[blog.id]) {
            setLikesData((prevData) => ({
                ...prevData,
                [blog.id]: {
                    ...prevData[blog.id],
                },
            }));
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!selectedBlog) {
        return <div>No blog data found</div>;
    }

    const currentBlogLikes = likesData[selectedBlog.id] || { likes: 0, dislikes: 0, liked: false, disliked: false };

    return (
        <Layout className="min-h-screen">
            <Content className="flex-grow p-5 mx-auto bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="text-center">
                    <Typography.Title>Blog THPT Bà Rịa - Vũng Tàu</Typography.Title>
                </div>
                <Button
                    icon={<DoubleLeftOutlined />}
                    onClick={() => window.history.back()}
                    className="text-xs text-white bg-slate-500"
                    style={{
                        position: 'fixed',
                        top: '16px',
                        left: '16px',
                        zIndex: 1000,
                    }}
                >
                    Back
                </Button>
                <Card
                    className="w-full rounded-lg shadow-lg"
                    cover={<img alt="blog_image" src={selectedBlog.image} />}
                    title={selectedBlog.title}
                    actions={[
                        <div className="flex justify-end gap-2 mr-2">
                            <Button
                                key="like"
                                icon={<LikeOutlined />}
                                onClick={handleLike}
                                type={currentBlogLikes.liked ? 'primary' : 'default'}
                            >
                                {currentBlogLikes.likes}
                            </Button>
                            <Button
                                key="dislike"
                                icon={<DislikeOutlined />}
                                onClick={handleDislike}
                                type={currentBlogLikes.disliked ? 'primary' : 'default'}
                            >
                                {currentBlogLikes.dislikes}
                            </Button>
                        </div>
                    ]}
                >
                    <Typography.Paragraph>{selectedBlog.content}</Typography.Paragraph>
                </Card>

                <div className="mt-5">
                    <h3 className="mb-3">Bình luận</h3>
                    <TextArea
                        rows={4}
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Viết bình luận của bạn.."
                    />
                    <div className="text-center">
                        <Button type="primary" onClick={handleCommentSubmit} className="mt-2 mb-5">
                            Bình luận
                        </Button>
                    </div>

                    <List
                        bordered
                        dataSource={comments}
                        renderItem={(comment) => (
                            <List.Item>
                                {comment}
                            </List.Item>
                        )}
                        className="mt-4"
                    />
                </div>

                <div className="mt-14">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-lg font-bold">Blogs Khác..</h3>
                        <Input 
                            placeholder="Tìm kiếm..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-2 w-72"
                        />
                    </div>
                    <List
                        bordered
                        dataSource={filteredBlogs}
                        renderItem={(item) => (
                            <List.Item onClick={() => handleBlogSelection(item)} style={{ cursor: 'pointer' }}>
                                <a>{item.title}</a>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Footer className="text-center text-white bg-blue-500">
                High School ©2024 Created by KagMin
            </Footer>
        </Layout>
    );
};

export default SchoolBlog;

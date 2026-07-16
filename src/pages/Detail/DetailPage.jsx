import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import detailBg from '../../assets/detail_feed.png';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { getFeedDetail } from '../../apis/posts';
import backIcon from '../../assets/back.png';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import sendIcon from '../../assets/send.png';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [inputText, setInputText] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getFeedDetail(id);
                setPost(data);
                setLikes(data.fan_cnt);
                setDislikes(data.wood_cnt);
            } catch (error) {
                console.error('데이터 로드 실패', error);
            }
        };
        fetchDetail();
    }, [id]);

    return (
        <div
            style={{
                backgroundImage: `url(${detailBg})`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div
                style={{
                    maxWidth: '800px',
                    margin: '80px auto 0',
                    padding: '40px',
                    background: '#FDFBF7',
                    borderRadius: '12px',
                }}
            >
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <img src={backIcon} alt="뒤로가기" style={{ width: '24px' }} />
                </button>

                <h3 style={{ marginTop: '20px' }}>{post?.nickname}</h3>
                <p style={{ fontSize: '18px' }}>{post?.content}</p>

                <div style={{ marginTop: '30px' }}>
                    <button
                        onClick={() => setLikes(likes + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img src={goodIcon} alt="좋아요" style={{ width: '30px' }} /> {likes}
                    </button>
                    <button
                        onClick={() => setDislikes(dislikes + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '20px' }}
                    >
                        <img src={badIcon} alt="싫어요" style={{ width: '30px' }} /> {dislikes}
                    </button>
                </div>
            </div>

            <div
                style={{
                    maxWidth: '800px',
                    margin: '20px auto',
                    background: '#1A1D24',
                    padding: '20px',
                    borderRadius: '12px',
                    color: '#fff',
                }}
            >
                {comments.map((c, i) => (
                    <p key={i}>
                        <strong>{c.nickname}</strong>: {c.content}
                    </p>
                ))}
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        style={{ flex: 1, padding: '10px' }}
                    />
                    <button
                        onClick={() => setComments([...comments, { nickname: '나', content: inputText }])}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <img src={sendIcon} alt="전송" style={{ width: '30px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

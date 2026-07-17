import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import detail from '../../assets/detail_feed.png';
import memo from '../../assets/memo.png';
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

    const handleLike = () => {
        let myNick = localStorage.getItem('my_nickname');
        if (!myNick) {
            const input = prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
            if (!input) return;
            myNick = input.slice(0, 6);
            localStorage.setItem('my_nickname', myNick);
        }

        const likeKey = `like_${myNick}_${id}`;
        const dislikeKey = `dislike_${myNick}_${id}`;

        const currentLikes = parseInt(localStorage.getItem(likeKey) || 0);
        const currentDislikes = parseInt(localStorage.getItem(dislikeKey) || 0);

        if (currentDislikes > 0) {
            alert('이미 비공감을 누르셔서 공감을 누를 수 없습니다!');
            return;
        }

        if (currentLikes >= 3) {
            alert('공감은 최대 3번까지만 가능합니다!');
            return;
        }

        localStorage.setItem(likeKey, currentLikes + 1);
        setLikes((prev) => prev + 1);
    };

    const handleDislike = () => {
        let myNick = localStorage.getItem('my_nickname');
        if (!myNick) {
            const input = prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
            if (!input) return;
            myNick = input.slice(0, 6);
            localStorage.setItem('my_nickname', myNick);
        }

        const likeKey = `like_${myNick}_${id}`;
        const dislikeKey = `dislike_${myNick}_${id}`;

        const currentLikes = parseInt(localStorage.getItem(likeKey) || 0);
        const currentDislikes = parseInt(localStorage.getItem(dislikeKey) || 0);

        if (currentLikes > 0) {
            alert('이미 공감을 누르셔서 비공감을 누를 수 없습니다!');
            return;
        }

        if (currentDislikes >= 3) {
            alert('비공감은 최대 3번까지만 가능합니다!');
            return;
        }

        localStorage.setItem(dislikeKey, currentDislikes + 1);
        setDislikes((prev) => prev + 1);
    };

    const fillPerClick = 10;
    const leftFillWidth = Math.min(likes * fillPerClick, 50);
    const rightFillWidth = Math.min(dislikes * fillPerClick, 50);

    return (
        <div
            style={{
                backgroundImage: `url(${detail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <div
                style={{
                    maxWidth: '450px',
                    minHeight: '450px',
                    margin: '80px auto 30px',
                    padding: '40px',
                    backgroundImage: `url(${memo})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <button
                        onClick={() => navigate('/')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        <img src={backIcon} alt="뒤로가기" style={{ width: '24px' }} />
                    </button>

                    <h3 style={{ marginTop: '20px', color: '#5B5B5B', fontWeight: 700, fontSize: '16px' }}>
                        {post?.nickname || '로딩중...'}
                    </h3>

                    <p
                        style={{
                            fontFamily: "'KimjungchulScript-Regular', cursive",
                            fontSize: '22px',
                            color: '#5B5B5B',
                            marginTop: '15px',
                            lineHeight: '1.5',
                        }}
                    >
                        {post?.content}
                    </p>
                </div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                            onClick={handleLike}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                            <img src={goodIcon} alt="좋아요" style={{ width: '24px' }} />
                            <span style={{ color: '#5B5B5B', fontSize: '14px', marginLeft: '5px', fontWeight: 500 }}>
                                {likes}
                            </span>
                        </button>
                        <button
                            onClick={handleDislike}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                marginLeft: '15px',
                            }}
                        >
                            <img src={badIcon} alt="싫어요" style={{ width: '24px' }} />
                            <span style={{ color: '#5B5B5B', fontSize: '14px', marginLeft: '5px', fontWeight: 500 }}>
                                {dislikes}
                            </span>
                        </button>
                    </div>

                    <div
                        style={{
                            marginTop: '15px',
                            width: '100%',
                            height: '8px',
                            background: '#D9D9D9',
                            borderRadius: '4px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${leftFillWidth}%`,
                                background: '#1A1D24',
                                transition: 'width 0.3s ease-in-out',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                height: '100%',
                                width: `${rightFillWidth}%`,
                                background: '#FF7400',
                                transition: 'width 0.3s ease-in-out',
                            }}
                        />
                    </div>
                </div>
            </div>

            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto 40px',
                    background: '#CCB591',
                    padding: '40px 30px',
                    borderRadius: '8px',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        marginBottom: '20px',
                    }}
                >
                    {comments.map((c, i) => (
                        <div
                            key={i}
                            style={{
                                background: '#ECDEC9',
                                padding: '12px 16px',
                                marginBottom: '10px',
                                borderRadius: '8px',
                                color: '#5B5B5B',
                                fontSize: '14px',
                            }}
                        >
                            <strong style={{ fontWeight: 700, marginRight: '10px' }}>{c.nickname}</strong>
                            <span style={{ fontWeight: 400 }}>{c.content}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', marginTop: 'auto' }}>
                    <input
                        id="comment-input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="의견을 남겨보세요. 많은 의견이 쌓일수록 더 오래 노출돼요."
                        style={{
                            flex: 1,
                            padding: '15px',
                            background: '#FFFFFF',
                            borderRadius: '4px',
                            border: '1px solid #E6E6E6',
                            color: '#5B5B5B',
                            fontWeight: 400,
                        }}
                        maxLength={50}
                    />
                    <style>{`#comment-input::placeholder { color: #9A9FAB; font-weight: 400; }`}</style>
                    <button
                        onClick={() => {
                            if (!inputText) return;
                            const myNick = localStorage.getItem('my_nickname') || '익명';
                            setComments([...comments, { nickname: myNick, content: inputText }]);
                            setInputText('');
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
                    >
                        <img src={sendIcon} alt="전송" style={{ width: '40px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}

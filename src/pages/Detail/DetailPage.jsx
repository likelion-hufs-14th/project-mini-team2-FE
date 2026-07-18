import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DetailPage.module.css';

import detail from '../../assets/detail_feed.png';
import memo from '../../assets/memo.png';
import TopBar from '../../components/TopBar/TopBar';
import { getFeedDetail, addFan, addWood, getComments, createComment } from '../../apis/posts';
import backIcon from '../../assets/back.png';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import sendIcon from '../../assets/send.png';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [inputText, setInputText] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);

    const [showNicknameModal, setShowNicknameModal] = useState(false);
    const [tempNickname, setTempNickname] = useState('');

    // 초기데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [feedData, commentsData] = await Promise.all([getFeedDetail(id), getComments(id)]);

                setPost(feedData);
                setLikes(feedData.fan_cnt);
                setDislikes(feedData.wood_cnt);
                setComments(commentsData);

                if (feedData.expires_at) {
                    const safeExpires = feedData.expires_at.replace(/-/g, '/').replace('T', ' ');
                    const date = new Date(safeExpires);
                    if (!isNaN(date.getTime())) {
                        setTimeLeft(Math.max(0, Math.floor((date.getTime() - new Date().getTime()) / 1000)));
                    }
                }
            } catch (error) {
                console.error('데이터 로드 실패', error);
                alert('존재하지 않거나 이미 소각된 기록입니다.');
                navigate('/feed', { replace: true });
            }
        };
        fetchData();
    }, [id, navigate]);

    // 남은시간 타이머
    useEffect(() => {
        if (post && timeLeft <= 0) {
            alert('이 기록은 완전히 소각되었습니다.');
            navigate('/feed', { replace: true });
            return;
        }

        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, post, navigate]);

    // 투명도 계산
    let memoOpacity = 1;
    if (post?.created_at && post?.expires_at) {
        const safeCreated = post.created_at.replace(/-/g, '/').replace('T', ' ');
        const safeExpires = post.expires_at.replace(/-/g, '/').replace('T', ' ');

        const createdTime = new Date(safeCreated).getTime();
        const expiresTime = new Date(safeExpires).getTime();
        const totalDuration = expiresTime - createdTime;

        if (totalDuration > 0) {
            const ratio = (timeLeft * 1000) / totalDuration;
            memoOpacity = Math.max(0, Math.min(1, ratio));
        }
    }

    // 시간 계산
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        return `${h}H ${m}M`;
    };

    // 공감(좋아요) 버튼 클릭 이벤트
    const handleLike = async () => {
        // 1. 닉네임 확인/설정
        let myNick = localStorage.getItem('my_nickname');
        if (!myNick) {
            const input = prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
            if (!input) return;
            myNick = input.slice(0, 6);
            localStorage.setItem('my_nickname', myNick);
        }
        // 2. 투표 횟수 제한 검사
        const likeKey = `like_${myNick}_${id}`;
        const dislikeKey = `dislike_${myNick}_${id}`;
        const currentLikes = parseInt(localStorage.getItem(likeKey) || 0);
        const currentDislikes = parseInt(localStorage.getItem(dislikeKey) || 0);

        if (currentDislikes > 0) return alert('이미 비공감을 누르셔서 공감을 누를 수 없습니다!');
        if (currentLikes >= 3) return alert('공감은 최대 3번까지만 가능합니다!');
        // 3. 공감 데이터 업데이트
        localStorage.setItem(likeKey, currentLikes + 1);

        const updatedData = await addFan(id);
        setPost((prev) => ({ ...prev, ...updatedData }));
        setLikes(updatedData.fan_cnt);

        // 4. 남은 시간 재계산
        if (updatedData.expires_at) {
            const safeExpires = updatedData.expires_at.replace(/-/g, '/').replace('T', ' ');
            const newDate = new Date(safeExpires);
            setTimeLeft(Math.max(0, Math.floor((newDate.getTime() - new Date().getTime()) / 1000)));
        }
    };

    // 비공감(싫어요) 버튼 클릭 이벤트
    const handleDislike = async () => {
        // 1. 닉네임 확인/설정
        let myNick = localStorage.getItem('my_nickname');
        if (!myNick) {
            const input = prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
            if (!input) return;
            myNick = input.slice(0, 6);
            localStorage.setItem('my_nickname', myNick);
        }
        // 2. 투표 횟수 제한 검사
        const likeKey = `like_${myNick}_${id}`;
        const dislikeKey = `dislike_${myNick}_${id}`;
        const currentLikes = parseInt(localStorage.getItem(likeKey) || 0);
        const currentDislikes = parseInt(localStorage.getItem(dislikeKey) || 0);

        if (currentLikes > 0) return alert('이미 공감을 누르셔서 비공감을 누를 수 없습니다!');
        if (currentDislikes >= 3) return alert('비공감은 최대 3번까지만 가능합니다!');

        // 3. 공감 데이터 업데이트
        localStorage.setItem(dislikeKey, currentDislikes + 1);

        const updatedData = await addWood(id);
        setPost((prev) => ({ ...prev, ...updatedData }));
        setDislikes(updatedData.wood_cnt);

        // 4. 남은 시간 재계산
        if (updatedData.expires_at) {
            const safeExpires = updatedData.expires_at.replace(/-/g, '/').replace('T', ' ');
            const newDate = new Date(safeExpires);
            setTimeLeft(Math.max(0, Math.floor((newDate.getTime() - new Date().getTime()) / 1000)));
        }
    };

    // 댓글창 관련
    const handleToggleComments = () => {
        setShowComments(!showComments);
    };

    const handleSendComment = async () => {
        if (!inputText.trim()) return;

        let userNick = localStorage.getItem('my_nickname');
        if (!userNick) {
            setShowNicknameModal(true);
            return;
        }

        const newComment = await createComment(id, inputText, userNick);
        setComments([newComment, ...comments]);
        setInputText('');
    };

    // 닉네임 저장용
    const handleSaveNickname = () => {
        if (!tempNickname.trim()) return alert('닉네임을 입력해주세요.');
        const slicedNick = tempNickname.trim().slice(0, 6);
        localStorage.setItem('my_nickname', slicedNick);
        setShowNicknameModal(false);
        alert('닉네임이 설정되었습니다! 다시 전송 버튼을 눌러주세요.');
    };

    // 공감&비공감 비율계산
    const totalVotes = likes + dislikes;
    const leftFillWidth = totalVotes === 0 ? 50 : (likes / totalVotes) * 100;
    const rightFillWidth = totalVotes === 0 ? 50 : (dislikes / totalVotes) * 100;

    return (
        /* 화면렌더링(전체,상단,사이드,뒤로가기,메모,공감비율,댓글 및 닉네임) */
        <div className={styles.pageContainer} style={{ backgroundImage: `url(${detail})` }}>
            <TopBar />

            <div className={styles.contentWrapper}>
                <div className={styles.topNav}>
                    <button className={styles.backButton} onClick={() => navigate('/feed')}>
                        <img src={backIcon} alt="뒤로가기" className={styles.backIcon} />
                    </button>
                </div>

                <div className={styles.memoContainer} style={{ backgroundImage: `url(${memo})`, opacity: memoOpacity }}>
                    <div>
                        <div className={styles.header}>
                            <h3 className={styles.nickname}>{post?.nickname || '로딩중...'}</h3>
                            <div className={styles.timerBox}>🔥 {formatTime(timeLeft)}</div>
                        </div>
                        <p className={styles.content}>{post?.content}</p>
                    </div>

                    <div>
                        <div className={styles.reactionRow}>
                            <div className={styles.reactionGroup}>
                                <button className={styles.actionButton} onClick={handleLike}>
                                    <img src={goodIcon} alt="좋아요" className={styles.buttonIcon} />
                                    <span className={styles.countText}>{likes}</span>
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.dislikeButton}`}
                                    onClick={handleDislike}
                                >
                                    <img src={badIcon} alt="싫어요" className={styles.buttonIcon} />
                                    <span className={styles.countText}>{dislikes}</span>
                                </button>
                            </div>

                            <button className={styles.commentToggleBtn} onClick={handleToggleComments}>
                                댓글 {comments.length}
                            </button>
                        </div>

                        <div className={styles.progressContainer}>
                            <div className={styles.progressLeft} style={{ width: `${leftFillWidth}%` }} />
                            <div className={styles.progressRight} style={{ width: `${rightFillWidth}%` }} />
                        </div>
                    </div>
                </div>

                {showComments && (
                    <div className={styles.commentsSection}>
                        <div className={styles.commentsList}>
                            {comments.map((c, i) => (
                                <div key={i} className={styles.commentItemWrapper}>
                                    <strong className={styles.commentAuthor}>{c.nickname}</strong>
                                    <span className={styles.commentText}>{c.content}</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.inputWrapper}>
                            <input
                                className={styles.commentInput}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="의견을 남겨보세요. 많은 의견이 쌓일수록 더 오래 노출돼요."
                                maxLength={50}
                            />
                            <button className={styles.iconButton} onClick={handleSendComment}>
                                <img src={sendIcon} alt="전송" className={styles.sendIcon} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showNicknameModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3 className={styles.modalTitle}>닉네임 설정</h3>
                        <p className={styles.modalSubtitle}>댓글을 작성하려면 닉네임이 필요합니다.</p>
                        <input
                            type="text"
                            placeholder="활동할 닉네임 (최대 6자)"
                            value={tempNickname}
                            onChange={(e) => setTempNickname(e.target.value)}
                            maxLength={6}
                            className={styles.modalInput}
                        />
                        <div className={styles.modalButtonGroup}>
                            <button onClick={() => setShowNicknameModal(false)} className={styles.cancelButton}>
                                취소
                            </button>
                            <button onClick={handleSaveNickname} className={styles.saveButton}>
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

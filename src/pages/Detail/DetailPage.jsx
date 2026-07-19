import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './DetailPage.module.css';

import detail from '../../assets/detail_feed.png';
import memo from '../../assets/memo.png';
import TopBar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import CommentItem from './CommentItem';
import { getFeedDetail, addFan, addWood, getComments, createComment } from '../../apis/posts';
import backIcon from '../../assets/back.png';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import sendIcon from '../../assets/send.png';

import goodPressIcon from '../../assets/good_press.png';
import badPressIcon from '../../assets/bad_press.png';
import { calcTimeLeft, calcOpacity, formatTime } from '../../utils/time';

const REACTION_LABEL = { fan: '공감', wood: '비공감' };

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [inputText, setInputText] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const [showNicknameModal, setShowNicknameModal] = useState(false);
    const [tempNickname, setTempNickname] = useState('');

    const [reactionType, setReactionType] = useState(null);

    // 초기데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [feedData, commentsData] = await Promise.all([getFeedDetail(id), getComments(id)]);

                setPost(feedData);
                setLikes(feedData.fan_cnt);
                setDislikes(feedData.wood_cnt);
                setComments(commentsData);
                setTimeLeft(calcTimeLeft(feedData.expires_at));
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
    const memoOpacity =
        post?.created_at && post?.expires_at ? calcOpacity(post.created_at, post.expires_at, timeLeft) : 1;

    const getOrPromptNickname = () => {
        let myNick = localStorage.getItem('my_nickname');
        if (!myNick) {
            const input = prompt('활동할 닉네임을 입력해주세요! (최대 6자)');
            if (!input) return null;
            myNick = input.slice(0, 6);
            localStorage.setItem('my_nickname', myNick);
        }
        return myNick;
    };

    // 공감/비공감
    const handleReaction = async (type) => {
        const myNick = getOrPromptNickname();
        if (!myNick) return;

        const isFan = type === 'fan';
        const oppositeType = isFan ? 'wood' : 'fan';
        const myKey = `${type}_${myNick}_${id}`;
        const oppositeKey = `${oppositeType}_${myNick}_${id}`;

        const currentCount = parseInt(localStorage.getItem(myKey) || 0);
        const oppositeCount = parseInt(localStorage.getItem(oppositeKey) || 0);

        if (oppositeCount > 0) {
            return alert(`이미 ${REACTION_LABEL[oppositeType]}을 누르셔서 ${REACTION_LABEL[type]}을 누를 수 없습니다!`);
        }
        if (currentCount >= 3) {
            return alert(`${REACTION_LABEL[type]}은 최대 3번까지만 가능합니다!`);
        }

        localStorage.setItem(myKey, currentCount + 1);

        // 클릭시 활성화 > 2초후 원상복구
        setReactionType(type);
        setTimeout(() => setReactionType(null), 2000);

        try {
            const updatedData = await (isFan ? addFan(id) : addWood(id));
            setPost((prev) => ({ ...prev, ...updatedData }));

            if (isFan) {
                setLikes(updatedData?.fan_cnt !== undefined ? updatedData.fan_cnt : likes + 1);
            } else {
                setDislikes(updatedData?.wood_cnt !== undefined ? updatedData.wood_cnt : dislikes + 1);
            }

            if (updatedData?.expires_at) {
                setTimeLeft(calcTimeLeft(updatedData.expires_at));
            }
        } catch (error) {
            console.error(`${REACTION_LABEL[type]} 처리 실패:`, error);
        }
    };

    // 댓글 토글 및 전송
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

        try {
            const newComment = await createComment(id, inputText, userNick);
            const commentToRender = newComment?.content ? newComment : { nickname: userNick, content: inputText };
            setComments([commentToRender, ...comments]);
            setInputText('');
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    // 닉네임 저장(바로피드로 갈수 있을 경우:임시)
    const handleSaveNickname = () => {
        if (!tempNickname.trim()) return alert('닉네임을 입력해주세요.');
        const slicedNick = tempNickname.trim().slice(0, 6);
        localStorage.setItem('my_nickname', slicedNick);
        setShowNicknameModal(false);
        alert('닉네임이 설정되었습니다! 다시 시도해주세요.');
    };

    // 게이지바 계산
    const totalVotes = likes + dislikes;
    const leftFillWidth = totalVotes === 0 ? 50 : (likes / totalVotes) * 100;
    const rightFillWidth = totalVotes === 0 ? 50 : (dislikes / totalVotes) * 100;

    return (
        <div className={styles.pageContainer} style={{ backgroundImage: `url(${detail})` }}>
            <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

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
                                <button className={styles.actionButton} onClick={() => handleReaction('fan')}>
                                    <img
                                        src={reactionType === 'fan' ? goodPressIcon : goodIcon}
                                        alt="좋아요"
                                        className={styles.buttonIcon}
                                    />
                                    <span className={styles.countText}>{likes}</span>
                                </button>
                                <button
                                    className={`${styles.actionButton} ${styles.dislikeButton}`}
                                    onClick={() => handleReaction('wood')}
                                >
                                    <img
                                        src={reactionType === 'wood' ? badPressIcon : badIcon}
                                        alt="싫어요"
                                        className={styles.buttonIcon}
                                    />
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
                            {comments.map((c) => (
                                <CommentItem key={c.cmt_id} comment={c} />
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

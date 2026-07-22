import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeedCard.module.css';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import goodPressIcon from '../../assets/good_press.png';
import badPressIcon from '../../assets/bad_press.png';
import memoImg from '../../assets/memo.png';
import { addFan, addWood } from '../../apis/posts';
import { calcTimeLeft, calcOpacity, formatTime } from '../../utils/time';
import { canReact } from '../../utils/reaction';

export default function FeedCard({ data }) {
    const { feed_id, nickname, content, created_at, expires_at, fan_cnt, wood_cnt, comment_cnt } = data;
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(expires_at));
    const [likes, setLikes] = useState(fan_cnt || 0);
    const [dislikes, setDislikes] = useState(wood_cnt || 0);
    const [reactionType, setReactionType] = useState(null);

    // 남은시간 타이머
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // 공감/비공감
    const handleReaction = async (e, type) => {
        e.stopPropagation(); // 카드 클릭(상세 이동) 막기

        if (!canReact(feed_id, type)) return;

        const isFan = type === 'fan';

        // 클릭시 활성화 > 2초후 원상복구
        setReactionType(type);
        setTimeout(() => setReactionType(null), 2000);

        try {
            const updatedData = await (isFan ? addFan(feed_id) : addWood(feed_id));

            if (isFan) {
                setLikes(updatedData?.fan_cnt !== undefined ? updatedData.fan_cnt : likes + 1);
            } else {
                setDislikes(updatedData?.wood_cnt !== undefined ? updatedData.wood_cnt : dislikes + 1);
            }

            if (updatedData?.expires_at) {
                setTimeLeft(calcTimeLeft(updatedData.expires_at));
            }
        } catch (error) {
            console.error('공감/비공감 처리 실패:', error);
        }
    };

    // 시간 초과시 소각 (화면에서 숨김)
    if (timeLeft <= 0) return null;

    // 공감 vs 비공감 비율 계산
    const totalReactions = likes + dislikes;
    const fanRatio = totalReactions === 0 ? 50 : (likes / totalReactions) * 100;
    const woodRatio = totalReactions === 0 ? 50 : (dislikes / totalReactions) * 100;

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/feed/${feed_id}`)}
            style={{
                opacity: calcOpacity(timeLeft),
                backgroundImage: `url(${memoImg})`,
            }}
        >
            <div className={styles.header}>
                <strong className={styles.nickname}>{nickname}</strong>
                <div className={styles.timerBox}>🔥 {formatTime(timeLeft)}</div>
            </div>

            <div className={styles.contentBox}>
                <p className={styles.content}>{content}</p>
            </div>

            <div className={styles.footerWrapper}>
                <div className={styles.footer}>
                    <div className={styles.reactionGroup}>


                        <button className={styles.actionDisplay} onClick={(e) => handleReaction(e, 'fan')}>
                            <img
                                src={reactionType === 'fan' ? goodPressIcon : goodIcon}
                                alt="공감"
                                className={styles.actionIcon}
                            />
                            <span className={styles.actionText}>{likes}</span>
                        </button>


                        <button className={styles.actionDisplay} onClick={(e) => handleReaction(e, 'wood')}>
                            <img
                                src={reactionType === 'wood' ? badPressIcon : badIcon}
                                alt="비공감"
                                className={styles.actionIcon}
                            />
                            <span className={styles.actionText}>{dislikes}</span>
                        </button>

                        
                    </div>

                    <button
                        className={styles.commentBtn}
                        onClick={(e) => {
                            e.stopPropagation(); // 카드 클릭 막고
                            navigate(`/feed/${feed_id}?comments=open`); // 댓글 열린 채로 이동
                        }}
                    >
                        댓글 {comment_cnt || 0}
                    </button>
                </div>

                <div className={styles.progressContainer}>
                    <div className={styles.progressLeft} style={{ width: `${fanRatio}%` }} />
                    <div className={styles.progressRight} style={{ width: `${woodRatio}%` }} />
                </div>
            </div>
        </div>
    );
}

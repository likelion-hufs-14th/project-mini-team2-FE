import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeedCard.module.css';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import memoImg from '../../assets/memo.png';
import { calcTimeLeft, calcOpacity, formatTime } from '../../utils/time';

export default function FeedCard({ data }) {
    const { feed_id, nickname, content, created_at, expires_at, fan_cnt, wood_cnt, comment_cnt } = data;
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(expires_at));

    // 남은시간 타이머
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // 시간 초과시 소각 (화면에서 숨김)
    if (timeLeft <= 0) return null;

    // 공감 vs 비공감 비율 계산
    const totalReactions = (fan_cnt || 0) + (wood_cnt || 0);
    const fanRatio = totalReactions === 0 ? 50 : ((fan_cnt || 0) / totalReactions) * 100;
    const woodRatio = totalReactions === 0 ? 50 : ((wood_cnt || 0) / totalReactions) * 100;

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/feed/${feed_id}`)}
            style={{
                opacity: calcOpacity(created_at, expires_at, timeLeft),
                backgroundImage: `url(${memoImg})`,
            }}
        >
            <div className={styles.header}>
                <strong className={styles.nickname}>{nickname}</strong>
                <div className={styles.timerBox}>🔥 {formatTime(timeLeft)}</div>
            </div>

            <p className={styles.content}>{content}</p>

            <div className={styles.footerWrapper}>
                <div className={styles.footer}>
                    <div className={styles.reactionGroup}>
                        <div className={styles.actionDisplay}>
                            <img src={goodIcon} alt="좋아요" className={styles.actionIcon} />
                            <span className={styles.actionText}>{fan_cnt || 0}</span>
                        </div>
                        <div className={styles.actionDisplay}>
                            <img src={badIcon} alt="싫어요" className={styles.actionIcon} />
                            <span className={styles.actionText}>{wood_cnt || 0}</span>
                        </div>
                    </div>

                    <button className={styles.commentBtn} onClick={(e) => e.stopPropagation()}>
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

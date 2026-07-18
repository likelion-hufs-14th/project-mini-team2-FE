import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeedCard.module.css';
import goodIcon from '../../assets/good.png';
import badIcon from '../../assets/bad.png';
import memoImg from '../../assets/memo.png';
import { getComments } from '../../apis/posts';

export default function FeedCard({ data }) {
    const { feed_id, nickname, content, created_at, expires_at, fan_cnt, wood_cnt } = data;
    const navigate = useNavigate();

    const [commentCount, setCommentCount] = useState(0);

    // 댓글 개수 불러오기
    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const commentsData = await getComments(feed_id);
                setCommentCount(commentsData.length);
            } catch (error) {
                console.error(`Feed ${feed_id} 댓글 수 로드 실패:`, error);
            }
        };
        fetchCommentCount();
    }, [feed_id]);

    // 남은시간 계산
    const calculateRemainingSeconds = (expireString) => {
        if (!expireString) return 0;
        const safeExpires = expireString.replace(/-/g, '/').replace('T', ' ');
        const date = new Date(safeExpires);
        if (isNaN(date.getTime())) return 0;
        return Math.max(0, Math.floor((date.getTime() - new Date().getTime()) / 1000));
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateRemainingSeconds(expires_at));

    // 남은시간 타이머
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // 투명도 계산
    const calculateOpacity = () => {
        if (!created_at || !expires_at) return 1;

        const safeCreated = created_at.replace(/-/g, '/').replace('T', ' ');
        const safeExpires = expires_at.replace(/-/g, '/').replace('T', ' ');

        const createdTime = new Date(safeCreated).getTime();
        const expiresTime = new Date(safeExpires).getTime();

        if (isNaN(createdTime) || isNaN(expiresTime)) {
            return 1;
        }

        const totalDuration = expiresTime - createdTime;

        if (totalDuration <= 0) return 0;

        let ratio = (timeLeft * 1000) / totalDuration;

        return Math.max(0, Math.min(1, ratio));
    };

    // 시간 초과시 소각
    if (timeLeft <= 0) return null;

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600)
            .toString()
            .padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60)
            .toString()
            .padStart(2, '0');
        return `${h}H ${m}M`;
    };

    // 화면 렌더링 (상세페이지)
    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/feed/${feed_id}`)}
            style={{
                opacity: calculateOpacity(),
                backgroundImage: `url(${memoImg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
            }}
        >
            <div className={styles.header}>
                <strong className={styles.nickname}>{nickname}</strong>
                <div className={styles.timerBox}>🔥 {formatTime(timeLeft)}</div>
            </div>
            <p className={styles.content}>{content}</p>
            <div className={styles.footer}>
                <div className={styles.reactionGroup}>
                    <div className={styles.actionDisplay}>
                        <img src={goodIcon} alt="좋아요" className={styles.actionIcon} />
                        <span className={styles.actionText}>{fan_cnt}</span>
                    </div>
                    <div className={styles.actionDisplay}>
                        <img src={badIcon} alt="싫어요" className={styles.actionIcon} />
                        <span className={styles.actionText}>{wood_cnt}</span>
                    </div>
                </div>

                <button className={styles.commentBtn} onClick={(e) => e.stopPropagation()}>
                    댓글 {commentCount}
                </button>
            </div>
        </div>
    );
}

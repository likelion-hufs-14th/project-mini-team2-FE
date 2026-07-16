import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFan, addWood } from '../../apis/posts';

export default function FeedCard({ data }) {
    const { feed_id, nickname, content, expires_at, fan_cnt, wood_cnt } = data;
    const navigate = useNavigate();

    const calculateRemainingSeconds = (expireString) => {
        if (!expireString) return 0;
        const expireTime = new Date(expireString).getTime();
        const nowTime = new Date().getTime();
        return Math.max(0, Math.floor((expireTime - nowTime) / 1000));
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateRemainingSeconds(expires_at));
    const [fans, setFans] = useState(fan_cnt);
    const [woods, setWoods] = useState(wood_cnt);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const calculateOpacity = () => {
        const hoursLeft = timeLeft / 3600;
        if (hoursLeft > 12) return 1.0;
        if (hoursLeft > 6) return 0.7;
        if (hoursLeft > 3) return 0.5;
        if (hoursLeft > 1) return 0.3;
        return 0.1;
    };

    const handleLike = async (e) => {
        e.stopPropagation();
        try {
            const updated = await addFan(feed_id);
            setFans(updated.fan_cnt);
            setWoods(updated.wood_cnt);
            setTimeLeft(calculateRemainingSeconds(updated.expires_at));
        } catch (error) {
            console.error('부채질 실패', error);
        }
    };

    const handleDislike = async (e) => {
        e.stopPropagation();
        try {
            const updated = await addWood(feed_id);
            setFans(updated.fan_cnt);
            setWoods(updated.wood_cnt);
            setTimeLeft(calculateRemainingSeconds(updated.expires_at));
        } catch (error) {
            console.error('장작 실패', error);
        }
    };

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    const totalVotes = fans + woods;
    const likeRatio = totalVotes === 0 ? 0 : Math.round((fans / totalVotes) * 100);
    const dislikeRatio = totalVotes === 0 ? 0 : 100 - likeRatio;

    if (timeLeft <= 0) return null;

    return (
        <div
            onClick={() => navigate(`/feed/${feed_id}`)}
            style={{
                background: '#FDFBF7',
                padding: '24px',
                borderRadius: '12px',
                color: '#5B5B5B',
                opacity: calculateOpacity(),
                transition: 'opacity 0.5s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                marginBottom: '20px',
            }}
        >
            <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' }}
            >
                <strong style={{ fontFamily: '"Kimjungchul Script", cursive', fontSize: '22px', color: '#1A1D24' }}>
                    {nickname}
                </strong>
                <span
                    style={{
                        background: '#E6E6E6',
                        color: '#FF7400',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: '800',
                        fontSize: '14px',
                    }}
                >
                    {formatTime(timeLeft)}
                </span>
            </div>

            <div style={{ marginBottom: '25px', minHeight: '60px', fontSize: '16px', lineHeight: '1.6' }}>
                <p style={{ margin: 0 }}>{content}</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                    onClick={handleLike}
                    style={{
                        cursor: 'pointer',
                        padding: '6px 12px',
                        background: '#CCB591',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#1A1D24',
                        fontWeight: 'bold',
                    }}
                >
                    👍 {fans}
                </button>
                <button
                    onClick={handleDislike}
                    style={{
                        cursor: 'pointer',
                        padding: '6px 12px',
                        background: '#CCB591',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#1A1D24',
                        fontWeight: 'bold',
                    }}
                >
                    👎 {woods}
                </button>
                <span style={{ fontSize: '13px', color: '#9A9FAB', marginLeft: 'auto', fontWeight: '500' }}>
                    화력({likeRatio}% : {dislikeRatio}%)
                </span>
            </div>
        </div>
    );
}

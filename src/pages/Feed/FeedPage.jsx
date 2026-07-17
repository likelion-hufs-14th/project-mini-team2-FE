import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import styles from './FeedPage.module.css';
import feedBg from '../../assets/feed.png';
import { getFeeds } from '../../apis/posts';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import detail from '../../assets/feed.png';

export default function FeedPage() {
    const [feeds, setFeeds] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const data = await getFeeds();
                setFeeds(data);
            } catch (error) {
                console.error('서버 연동 실패:', error);
            }
        };
        fetchFeeds();
    }, []);

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

            <div style={{ maxWidth: '800px', margin: '80px auto' }}>
                {feeds.length === 0 ? (
                    <div style={{ color: '#E0CDCD', textAlign: 'center', marginTop: '100px' }}>
                        <h2 style={{ color: '#FF7400', fontWeight: '800' }}>아직 이야기가 없습니다.</h2>
                        <p style={{ color: '#9A9FAB' }}>첫 번째 이야기의 주인공이 되어보세요 🪵</p>
                    </div>
                ) : (
                    feeds.map((data) => <FeedCard key={data.feed_id} data={data} />)
                )}
            </div>
        </div>
    );
}

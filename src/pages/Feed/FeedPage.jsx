import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import styles from './FeedPage.module.css';
import { getFeeds } from '../../apis/posts';
import TopBar from '../../components/TopBar/TopBar';
import memo from '../../assets/memo.png';
import backIcon from '../../assets/back.png';

export default function FeedPage() {
    const [pageData, setPageData] = useState({ results: [], next: null });
    const [page, setPage] = useState(1);

    // 피드 목록 불러오기
    useEffect(() => {
        const loadFeeds = async () => {
            const data = await getFeeds(page);
            setPageData(data);
        };
        loadFeeds();
    }, [page]);

    // 방문 기록 API
    useEffect(() => {
        /*
        const recordVisit = async () => {
            try {
                await fetch('http://백엔드주소/feeds/visit/', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (error) {
                console.error('방문 기록 전송 실패:', error);
            }
        };
        recordVisit();
        */
    }, []);

    // 화면 렌더링(그리드형태, 페이지네이션)
    return (
        <div className={styles.pageContainer}>
            <TopBar />
            <div className={styles.feedGrid}>
                {pageData.results.map((data) => (
                    <FeedCard key={data.feed_id} data={data} />
                ))}
            </div>
            <div className={styles.pagination}>
                <button className={styles.pageButton} disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                    <img src={backIcon} alt="이전" className={styles.arrowIcon} />
                </button>

                <span className={styles.pageNumber}>{page} 페이지</span>

                <button
                    className={styles.pageButton}
                    disabled={!pageData.next}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    <img src={backIcon} alt="다음" className={`${styles.arrowIcon} ${styles.rotatedArrow}`} />
                </button>
            </div>
        </div>
    );
}

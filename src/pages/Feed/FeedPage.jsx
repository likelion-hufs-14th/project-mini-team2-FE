import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import styles from './FeedPage.module.css';
import { getFeeds } from '../../apis/posts';
import TopBar from '../../components/TopBar/TopBar';
import backIcon from '../../assets/back.png';

export default function FeedPage() {
    const [pageData, setPageData] = useState({ results: [], next: null, previous: null });
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // 피드 목록 불러오기
    useEffect(() => {
        const loadFeeds = async () => {
            setIsLoading(true);
            try {
                const data = await getFeeds(page);
                setPageData(data || { results: [], next: null, previous: null });
            } catch (error) {
                console.error('데이터 불러오기 에러:', error);
                setPageData({ results: [], next: null, previous: null });
            } finally {
                setIsLoading(false);
            }
        };
        loadFeeds();
    }, [page]);

    const displayData = pageData.results || [];

    return (
        <div className={styles.pageContainer}>
            <TopBar />

            {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
            ) : displayData.length === 0 ? (
                <div className={styles.emptyState}>표시할 피드가 없습니다.</div>
            ) : (
                <div className={styles.feedGrid}>
                    {displayData.map((data) => (
                        <FeedCard key={data.feed_id} data={data} />
                    ))}
                </div>
            )}

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={!pageData.previous || isLoading}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    <img src={backIcon} alt="이전" className={styles.arrowIcon} />
                </button>

                <span className={styles.pageNumber}>{page} 페이지</span>

                <button
                    className={styles.pageButton}
                    disabled={!pageData.next || isLoading}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    <img src={backIcon} alt="다음" className={`${styles.arrowIcon} ${styles.rotatedArrow}`} />
                </button>
            </div>
        </div>
    );
}

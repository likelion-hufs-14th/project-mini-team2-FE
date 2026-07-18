import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import styles from './NoticePage.module.css';

// 공지사항 목록
function NoticePage() {
    return (
        <div className={styles.page}>
            <TopBar />

            <div className={styles.content}>
                <h1 className={styles.title}>공지사항</h1>
                <p className={styles.subtitle}>서비스 소식과 업데이트를 확인하세요</p>

                <div className={styles.list}>
                    <Link to="/notice/1" className={styles.item}>
                        <span className={styles.itemTitle}>공지 제목이 여기 표시됩니다</span>
                        <span className={styles.itemDate}>2026.00.00</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NoticePage;

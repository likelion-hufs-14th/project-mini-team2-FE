import { Link } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import styles from './NoticeDetailPage.module.css';

// 공지사항 상세
function NoticeDetailPage() {
    return (
        <div className={styles.page}>
            <TopBar />

            <div className={styles.content}>
                <Link to="/notice" className={styles.back}>
                    ← 공지사항 목록
                </Link>

                <h1 className={styles.title}>공지 제목이 여기 표시됩니다</h1>
                <p className={styles.body}>공지 내용은 준비 중입니다.</p>
            </div>
        </div>
    );
}

export default NoticeDetailPage;

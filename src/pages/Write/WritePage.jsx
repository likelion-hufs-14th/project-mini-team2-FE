import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { createFeed } from '../../apis/posts';
import { getNickname } from '../../utils/nickname';
import { createVisitLog } from '../../apis/posts';
import redCircle from '../../assets/redcircle.png';
import blueCircle from '../../assets/bluecircle.png';
import firePaper from '../../assets/firepaper.png';
import styles from './WritePage.module.css';

// 2) 작성 페이지
function WritePage() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [burning, setBurning] = useState(false);



    // 소각 버튼
    async function handleBurn() {
        if (!text) {
            window.alert('소각할 내용을 입력해주세요.');
            return;
        }


        setBurning(true);

        try {
            await createVisitLog();
        } catch (error) {
            console.log(error);
        }

        setTimeout(() => navigate('/end'), 2000);
    }


    // 피드 저장
    async function handleFeed() {
        if (!text) {
            window.alert('피드에 올릴 내용을 입력해주세요.');
            return;
        }

        try {
            await createFeed(text, getNickname());
            navigate('/feed');
        } catch (error) {
            console.log(error);
            window.alert('피드에 올리지 못했어요. 서버를 확인해주세요.');
        }
    }

    return (
        <div className={styles.page}>
            <TopBar />

            <h2 className={styles.title}>태워 버리고 싶은 당신의 속마음을 말해보세요.</h2>

            <div className={styles.paper}>
                <textarea
                    className={styles.input}
                    maxLength={300}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <span className={styles.counter}>{text.length}/300</span>
            </div>

            <div className={styles.actions}>
                <button className={styles.circleBtn} onClick={handleBurn}>
                    <img src={redCircle} />
                    <span>소각</span>
                </button>

                <button className={styles.circleBtn} onClick={handleFeed}>
                    <img src={blueCircle} />
                    <span>피드</span>
                </button>
            </div>

            {burning && (
                <div className={styles.burnOverlay}>
                    <img className={styles.burnPaper} src={firePaper} />
                </div>
            )}
        </div>
    );
}

export default WritePage;

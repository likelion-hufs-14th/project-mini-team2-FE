import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { createFeed } from '../../apis/posts';
import { getNickname, saveNickname } from '../../utils/nickname';
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
    const [askName, setAskName] = useState(false);
    const [tempName, setTempName] = useState('');     // 입력 중인 닉네임
    const [sending, setSending] = useState(false);   // 전송 중인지




    // 소각 버튼
    async function handleBurn() {
        if (!text.trim()) {
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


    // 피드 버튼_닉네임 있는지 판단
    function handleFeed() {
        if (!text.trim()) {
            window.alert('피드에 올릴 내용을 입력해주세요.');
            return;
        }

        const name = getNickname();

        if (!name) {
            setAskName(true);
            return;
        }
        sendFeed(name);
    }

    // 메모 피드에 보내기
    async function sendFeed(name) {
        if (sending) return
        setSending(true);

        try {
            await createFeed(text.trim(), name);
            navigate('/feed');
        } catch (error) {
            console.log(error);
            window.alert('피드에 올리지 못했어요. 서버를 확인해주세요.');
            setSending(false);
        }
    }

    // 닉네임 저장
    function handleSaveName() {
        const name = saveNickname(tempName);

        if (!name) return;

        setAskName(false);
        sendFeed(name);
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
                <button className={styles.circleBtn} onClick={handleBurn} disabled={burning}>
                    <img src={redCircle} />
                    <span>소각</span>
                </button>

                <button className={styles.circleBtn} onClick={handleFeed} disabled={sending}>
                    <img src={blueCircle} />
                    <span>피드</span>
                </button>
            </div>


            {burning && (
                <div className={styles.burnOverlay}>
                    <img className={styles.burnPaper} src={firePaper} />
                </div>
            )}


            {askName && (
                <div className={styles.nameOverlay}>
                    <div className={styles.nameBox}>
                        <h3 className={styles.nameTitle}>닉네임을 입력해주세요</h3>
                        <input
                            className={styles.nameInput}
                            maxLength={6}
                            value={tempName}
                            placeholder="최대 6글자"
                            onChange={(e) => setTempName(e.target.value)}
                        />
                        <div className={styles.nameButtons}>
                            <button className={styles.nameBtn} onClick={() => setAskName(false)}>취소</button>
                            <button className={styles.nameBtn} onClick={handleSaveName} disabled={sending}>
                                {sending ? '올리는 중...' : '저장'}
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}

export default WritePage;

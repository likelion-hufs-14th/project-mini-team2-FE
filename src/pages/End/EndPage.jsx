import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import blackCircle from "../../assets/blackcircle.png";
import styles from "./EndPage.module.css";

// 3) 마지막 화면
function EndPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <TopBar />

      <div className={styles.center}>
        <h1 className={styles.message}>
          당신의 이야기는
          <br />
          재가 되어 사라졌습니다
        </h1>

        <p className={styles.count}>오늘 000명이 소각했습니다</p>

        <div className={styles.actions}>

          <button className={styles.circleBtn} onClick={() => navigate("/write")}>
            <img src={blackCircle} />
            <span>더 쓰기</span>
          </button>

          <button className={styles.circleBtn} onClick={() => navigate("/feed")}>
            <img src={blackCircle} />
            <span>
              피드
              <br />
              보기
            </span>
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default EndPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import redCircle from "../../assets/redcircle.png";
import blueCircle from "../../assets/bluecircle.png";
import firePaper from "../../assets/firepaper.png";
import styles from "./WritePage.module.css";



// 2) 작성 페이지
function WritePage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [burning, setBurning] = useState(false);

  function handleBurn() {
    setBurning(true);
    setTimeout(() => navigate("/end"), 2000);
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


        <button className={styles.circleBtn} onClick={() => navigate("/feed")}>
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

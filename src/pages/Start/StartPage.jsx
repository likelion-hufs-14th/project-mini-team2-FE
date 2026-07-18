import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/INCINER.png";
import fireImg from "../../assets/fire.png";
import paperImg from "../../assets/paper.png";
import styles from "./StartPage.module.css";

// 1) 시작 화면
function StartPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.stage}>

        <img className={styles.logo} src={logoImg} alt="INCINER" />

        <img className={styles.fire} src={fireImg} />

        <img
          className={styles.paper}
          src={paperImg}
          onClick={() => navigate("/write")}
        />

        <button className={styles.cta} onClick={() => navigate("/write")}>
          종이를 드래그해 불태우세요!
        </button>
        
      </div>
    </div>
  );
}

export default StartPage;

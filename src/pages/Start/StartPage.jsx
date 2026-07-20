import { useRef, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../assets/INCINER.png';
import fireImg from '../../assets/fire.png';
import paperImg from '../../assets/paper.png';
import styles from './StartPage.module.css';

// 1) 시작 화면
function StartPage() {
    const navigate = useNavigate();

    const [paperPosition, setPaperPosition] = useState({ x: 0, y: 0 });

    const fireref = useRef(null);
    const paperref = useRef(null);

    const bindpaper = useDrag((params) => {
        setPaperPosition({
            x: params.offset[0],
            y: params.offset[1],
        });

        if (params.last) {
            const paper = paperref.current.getBoundingClientRect();
            const fire = fireref.current.getBoundingClientRect();

            const paperX = paper.x + paper.width / 2;
            const paperY = paper.y + paper.height / 2;

            const isOnFire = 
                paperX >= fire.left && paperX <= fire.right && 
                paperY >= fire.top && paperY <= fire.bottom;

            if (isOnFire) {
                navigate('/write');
            }
        }
    });

    return (
        <div className={styles.page}>
            <div className={styles.stage}>
                <img className={styles.logo} src={logoImg} alt="INCINER" />

                <img ref={fireref} className={styles.fire} src={fireImg} />

                <div
                    {...bindpaper()}
                    className={styles.paperContainer}
                    ref={paperref}
                    style={{ transform: `translate(${paperPosition.x}px, ${paperPosition.y}px)` }}
                >
                    <img className={styles.paper} src={paperImg} draggable={false} />
                </div>

                <div className={styles.cta}>종이를 드래그해 불태우세요!</div>
            </div>
        </div>
    );
}

export default StartPage;

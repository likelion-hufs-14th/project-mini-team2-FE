import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import Sidebar from '../Sidebar/Sidebar';
import logoIcon from '../../assets/INCINER_LOGO.png';
import listIcon from '../../assets/list.png';
import styles from './TopBar.module.css';

function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className={styles.bar}>
                <Link to={PATHS.START} className={styles.logo}>
                    <img src={logoIcon} alt="INCINER" />
                </Link>

                <p className={styles.notice}>
                    본 서비스는 어떠한 데이터도 백업하지 않으며, 소각 즉시 서버에서 완전히 영구 삭제됩니다.
                </p>

                <button type="button" className={styles.menu} onClick={() => setMenuOpen(true)}>
                    <img src={listIcon} alt="메뉴" />
                </button>
            </header>

            <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}

export default TopBar;

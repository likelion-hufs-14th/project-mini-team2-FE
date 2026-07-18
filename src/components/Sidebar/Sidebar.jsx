import { NavLink } from 'react-router-dom';
import { FiEdit3, FiList, FiBell, FiInfo } from 'react-icons/fi';
import { PATHS } from '../../routes/paths';
import backIcon from '../../assets/back.png';
import styles from './Sidebar.module.css';

const MENU = [
    { icon: FiEdit3, label: '글쓰기', to: PATHS.WRITE },
    { icon: FiList, label: '피드', to: PATHS.FEED },
];

function Sidebar({ open, onClose }) {
    return (
        <>
            <div className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`} onClick={onClose} />

            <aside className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
                <button type="button" className={styles.close} onClick={onClose} aria-label="사이드바 닫기">
                    <img src={backIcon} alt="닫기" />
                </button>

                <nav className={styles.nav}>
                    {MENU.map(({ icon: Icon, label, to }) =>
                        to ? (
                            <NavLink key={label} to={to} className={styles.item} onClick={onClose}>
                                <Icon className={styles.icon} />
                                {label}
                            </NavLink>
                        ) : (
                            <span key={label} className={`${styles.item} ${styles.disabled}`} title="준비 중">
                                <Icon className={styles.icon} />
                                {label}
                            </span>
                        )
                    )}
                </nav>

                <footer className={styles.footer}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Cookie Policy</a>
                    <a href="#">Contact</a>
                </footer>
            </aside>
        </>
    );
}

export default Sidebar;

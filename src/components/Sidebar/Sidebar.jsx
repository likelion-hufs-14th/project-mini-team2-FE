import { NavLink } from 'react-router-dom';
import { FiEdit3, FiList } from 'react-icons/fi';
import { PATHS } from '../../routes/paths';
import backIcon from '../../assets/back.png';
import styles from './Sidebar.module.css';

const MENU = [
    { icon: FiEdit3, label: '글쓰기', to: PATHS.WRITE },
    { icon: FiList, label: '피드', to: PATHS.FEED },
];

function Sidebar({ open, onClose }) {
    let backdropClass = styles.backdrop;
    let panelClass = styles.panel;

    if (open) {
        backdropClass = styles.backdrop + ' ' + styles.backdropOpen;
        panelClass = styles.panel + ' ' + styles.panelOpen;
    }

    return (
        <>
            <div className={backdropClass} onClick={onClose} />

            <aside className={panelClass}>
                <button type="button" className={styles.close} onClick={onClose}>
                    <img src={backIcon} alt="닫기" />
                </button>

                <nav className={styles.nav}>
                    {MENU.map(({ icon: Icon, label, to }) => (
                        <NavLink key={label} to={to} className={styles.item} onClick={onClose}>
                            <Icon className={styles.icon} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

            </aside>
        </>
    );
}

export default Sidebar;

import React from 'react';
import logo from '../assets/insiner_logo_icon.png';

export default function Header({ onMenuClick }) {
    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: '#121212',
            }}
        >
            <div style={{ width: '40px', height: '40px' }}>
                <img src={logo} alt="Insiner Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <p
                style={{
                    color: '#FF7400',
                    fontSize: '12px',
                    fontWeight: '700',
                    margin: 0,
                    textAlign: 'center',
                    flex: 1,
                    padding: '0 15px',
                }}
            >
                ※ 본 서비스는 어떠한 데이터도 백업하지 않으며, 소각 즉시 서버에서 완전히 영구 삭제됩니다 ※
            </p>

            <button
                onClick={onMenuClick}
                style={{
                    background: 'transparent',
                    border: '1px solid #9A9FAB',
                    color: '#9A9FAB',
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '22px',
                }}
            >
                ≡
            </button>
        </header>
    );
}

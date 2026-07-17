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
                background: 'transparent',
            }}
        >
            <div style={{ width: '40px', height: '40px' }}>
                <img src={logo} alt="Insiner Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div
                style={{
                    color: '#FF7A00',
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: '-0.5px',
                    textAlign: 'center',
                    flex: 1,
                }}
            >
                ※ 본 서비스는 어떠한 데이터도 백업하지 않으며, 소각 즉시 서버에서 완전히 영구 삭제됩니다 ※
            </div>

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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '4px',
                }}
            >
                ≡
            </button>
        </header>
    );
}

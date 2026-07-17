import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                    }}
                />
            )}

            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isOpen ? 0 : '-300px',
                    width: '250px',
                    height: '100vh',
                    backgroundColor: '#1A1D24',
                    color: '#9A9FAB',
                    transition: 'right 0.3s ease-in-out',
                    zIndex: 1000,
                    padding: '30px 20px',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    onClick={onClose}
                    style={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        marginBottom: '40px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    &gt;
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div
                        onClick={() => handleNavigation('/write')}
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span>✏️</span>
                        <span>글쓰기</span>
                    </div>

                    <div
                        onClick={() => handleNavigation('/')}
                        style={{
                            cursor: 'pointer',
                            fontSize: '18px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span>🗂️</span>
                        <span>피드</span>
                    </div>
                </div>
            </div>
        </>
    );
}

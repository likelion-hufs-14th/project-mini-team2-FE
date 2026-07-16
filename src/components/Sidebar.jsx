import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 999,
                }}
            />

            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '260px',
                    backgroundColor: '#1A1D24',
                    zIndex: 1000,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#9A9FAB',
                    boxShadow: '-4px 0 15px rgba(0,0,0,0.5)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#9A9FAB',
                            fontSize: '20px',
                            cursor: 'pointer',
                        }}
                    >
                        〉
                    </button>
                </div>

                <div
                    onClick={() => {
                        navigate('/write');
                        onClose();
                    }}
                    style={{
                        padding: '15px 0',
                        borderBottom: '1px solid #333',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ fontSize: '18px' }}>✏️</span> 글쓰기
                </div>

                <div
                    onClick={() => {
                        navigate('/feed');
                        onClose();
                    }}
                    style={{
                        padding: '15px 0',
                        borderBottom: '1px solid #333',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <span style={{ fontSize: '18px' }}>🧱</span> 피드
                </div>

                <div style={{ marginTop: 'auto', fontSize: '11px', color: '#5B5B5B', lineHeight: '1.8' }}>
                    Privacy Policy
                    <br />
                    Terms & Conditions
                    <br />
                    Cookie Policy
                    <br />
                    Contact
                </div>
            </div>
        </>
    );
}

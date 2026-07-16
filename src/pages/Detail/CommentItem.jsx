import React from 'react';

export default function CommentItem({ comment }) {
    const { nickname, content } = comment;

    return (
        <div
            style={{
                display: 'flex',
                gap: '16px',
                padding: '16px',
                background: '#ECDEC9',
                borderRadius: '8px',
                marginBottom: '10px',
            }}
        >
            <strong style={{ color: '#9A9FAB', minWidth: '80px', fontWeight: '600' }}>{nickname || '익명'}</strong>
            <p style={{ margin: 0, color: '#5B5B5B', lineHeight: '1.5' }}>{content || '내용이 없습니다.'}</p>
        </div>
    );
}

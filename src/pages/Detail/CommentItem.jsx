import React from 'react';
import styles from './CommentItem.module.css';

// 개별 댓글 1개를 화면에 보여줌
export default function CommentItem({ comment }) {
    if (!comment) return null;

    const { nickname, content } = comment;

    return (
        <div className={styles.container}>
            <strong className={styles.nickname}>{nickname || '익명'}</strong>
            <p className={styles.content}>{content || '내용이 없습니다.'}</p>
        </div>
    );
}

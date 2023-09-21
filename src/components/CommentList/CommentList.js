import { useMemo } from 'react';
import styles from './CommentList.module.css';

const CommentList = ({ comments }) => {
    const renderedComments = useMemo(() => comments.map((comment) => (
        <div key={comment.id} className={styles.reactComment}>
            <div className={styles.card}>
                <div className={styles.cardColor} style={{ background: comment.color }}></div>
                <div className={styles.cardBody}>
                    <pre className={styles.cardText}>{comment.text}</pre>
                </div>
            </div>
        </div>
    )), [comments]);

    return <>{renderedComments}</>;
};

export default CommentList;

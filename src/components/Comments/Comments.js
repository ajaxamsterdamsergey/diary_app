import { useState, memo } from 'react';
import CommentList from '../CommentList/CommentList';
import Button from '../Button/Button';
import styles from '../Comments/Comments.module.css';

const Comments = memo(({ activeItem, onAddComment, items, isDisabled }) => {
    const [color, setColor] = useState('#000000');
    const [text, setText] = useState('');

    const activeItemComments = activeItem && items[activeItem]
        ? items[activeItem].comments || []
        : [];

    const handleAddCommentSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAddComment(color, text);
            setText('');
            setColor('#000000');
        }
        setColor('#000000');
    };

    return (
        <div className={styles.reactComments}>
           <h1 className={styles.titleId}>
                  Comments #{activeItem ? String(activeItem).substring(0, 8) : ''}
          </h1>

            
            <CommentList comments={activeItemComments} />
            
            <form onSubmit={handleAddCommentSubmit} className={styles.form}>
                <input type="color" className={styles.formControl} value={color} onChange={(e) => setColor(e.target.value)} />
                <textarea
                    className={`${styles.formControl} ${styles.textarea}`}
                    placeholder="Type comment here..."
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <Button type="submit" disabled={isDisabled} className={styles.btnPrimary}>
                   Add New
                </Button>
            </form>
        </div>
    );
});

export default Comments;
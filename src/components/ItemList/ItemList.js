import {memo} from 'react';
import Button from '../Button/Button';
import styles from './ItemList.module.css';

const ItemList = memo(({ id, text, isActive, onDelete, onClick, count }) => {
    const itemClass = isActive 
    ? `${styles.listGroupItem} ${styles.activeItem}`
    : styles.listGroupItem;
    
    return (
        <li className={itemClass} onClick={() => onClick(id)}>
            {text}
            <span className={`${styles.badge} ${styles.badgeInfo} ${styles.badgePill}`}>{count}</span>
            <Button type="button" onClick={(e) => {
                    e.stopPropagation();
                    onDelete(id);
                }} className={styles.btnOutlineDanger}>
                   Delete
           </Button>
        </li>
    );
});

export default ItemList;
import {useMemo} from 'react';
import Item from '../ItemList/ItemList';
import Button from '../Button/Button';
import styles from './Items.module.css';

const Items = ({ items, inputValue, onInputChange, onAddNewItem, onDeleteItem, activeItem, onItemClicked }) => {
    const renderedItems = useMemo(() => 
    Object.values(items).map((item) => (
        <Item
            key={item.id}
            id={item.id}
            text={item.text}
            isActive={item.id === activeItem}
            onDelete={() => onDeleteItem(item.id)}
            onClick={() => onItemClicked(item.id)}
            count={item.comments.length}
        />
    )), [items, activeItem, onDeleteItem, onItemClicked]);
   const containerStyle = Object.keys(items).length > 0 ? { height: 'fit-content' } : {};
    return (
        <div className={styles.reactItems} style={containerStyle}>
            <h1>Items</h1>
            <form className={styles.reactItemsInputGroup} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className={styles.formControl}
                    placeholder="Type name here..."
                    required
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                />
          <Button type="button" onClick={onAddNewItem} disabled={!inputValue.trim()} className={styles.btnInfo}>
                   Add New
         </Button>
            </form>
            <ul className={styles.listGroup}>
            {renderedItems}
            </ul>
        </div>
    );
};

export default Items;
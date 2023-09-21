import { useEffect  } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import Items from "./components/Items/Items";
import Comments from "./components/Comments/Comments";
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  const [state, setState] = useLocalStorage('appState', {
    items: {},
    inputValue: '',
    activeItem: null,
    color: '#000000'
});
useEffect(() => {
  window.localStorage.setItem('appState', JSON.stringify(state));
}, [state]);
    const handleAddNewItem = () => {
      if (!state.inputValue.trim()) return;
      
      const id = nanoid();
      const newItem = { id, text: state.inputValue, comments: [] };
      
      setState(prevState => {
          const newItems = { ...prevState.items, [id]: newItem };
          
          let newActiveItem = prevState.activeItem; // Оставляем текущий активный элемент
          
          // Если новый список содержит только один элемент, 
          // то устанавливаем его как активный
          if (Object.keys(newItems).length === 1) {
              newActiveItem = id;
          }
  
          return {
              ...prevState,
              items: newItems,
              inputValue: '',
              activeItem: newActiveItem
          };
      });
  };
  
    const handleAddComment = (color, text) => {
      if (state.activeItem) {
          setState(prevState => ({
              ...prevState,
              items: {
                  ...prevState.items,
                  [state.activeItem]: {
                      ...prevState.items[state.activeItem],
                      comments: [
                          ...(prevState.items[state.activeItem].comments || []),
                          { id: nanoid(), color, text }
                      ]
                  }
              }
          }));
      }
  };

    
  const handleDeleteItem = (id) => {
    setState(prevState => {
        const { [id]: deletedItem, ...remainingItems } = prevState.items;
        let newActiveItem = prevState.activeItem;

        // Если удаляемый элемент активный, нужно определить новый активный элемент
        if (id === prevState.activeItem) {
            const remainingIds = Object.keys(remainingItems);
            const deletedIndex = remainingIds.indexOf(id);
            if (deletedIndex < remainingIds.length - 1) {
                // Если удаляемый элемент не последний, активируем следующий
                newActiveItem = remainingIds[deletedIndex + 1];
            } else if (remainingIds.length > 0) {
                // Иначе активируем предыдущий, если он есть
                newActiveItem = remainingIds[remainingIds.length - 1];
            } else {
                // Если других элементов нет, сбрасываем активный элемент
                newActiveItem = null;
            }
        }

        return { ...prevState, items: remainingItems, activeItem: newActiveItem };
    });
};

    
    const handleItemClick = (id) => {
        setState(prevState => ({ ...prevState, activeItem: id }));
    };
    
    const handleInputChange = (value) => {
        setState(prevState => ({ ...prevState, inputValue: value }));
    };
  
    return (
      <div className={styles.App}>
        <div className={styles.Wrapper}>
          <div className={styles.asideWrapper}>
            <aside className={styles.reactAside}>
                        <h2>DIARY APP</h2>
                        <div>Comment with no sense</div>
                    </aside>
                </div>
          <div className={styles.mainWrapper}>
                    <main className={`${styles.mainContainer} ${styles.container}`}>
                        <div className={`${styles.wrapperComponents} ${styles.row}`}>
                            <Items
                                items={state.items}
                                inputValue={state.inputValue}
                                onInputChange={handleInputChange}
                                onAddNewItem={handleAddNewItem}
                                onDeleteItem={handleDeleteItem}
                                activeItem={state.activeItem}
                                onItemClicked={handleItemClick}
                            />
                            <Comments
                activeItem={state.activeItem}
                onAddComment={handleAddComment}
                items={state.items}
                isDisabled={!state.activeItem}
            />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
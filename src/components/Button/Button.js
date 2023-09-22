import { useState } from 'react';
import styles from './Button.module.css'; 

const Button = ({ children, type, onClick, disabled, className, ...props }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  const btnClass = `${styles.btn} ${isRotating ? styles.btnRotate : ''} ${className}`;

  return (
    <button
      type={type || 'button'}
      onClick={handleClick}
      disabled={disabled}
      className={btnClass} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

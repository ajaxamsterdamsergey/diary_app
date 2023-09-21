import styles from'./Button.module.css'; 

const Button = ({ children, type, onClick, disabled, className, ...props }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
    disabled={disabled}
    className={`${styles.btn} ${className}`} 
    {...props}
  >
    {children}
  </button>
);

export default Button;

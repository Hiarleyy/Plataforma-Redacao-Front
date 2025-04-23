import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({
  title,
  content,
  image,
  imageAlt,
  actions,
  variant = 'default',
  className,
  onClick,
  children,
}) => {
  return (
    <div 
      className={`${styles.card} ${styles[variant]} ${className || ''}`} 
      onClick={onClick}
    >     
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {content && <p className={styles.text}>{content}</p>}
        {children}
      </div>
      
      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Card;
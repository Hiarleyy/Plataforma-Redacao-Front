import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({
  title,
  content,
  image,
  imageAlt,
  icon,
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
        {/* Modified: Title and icon in same container */}
        {title && (
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>{title}</h3>
            {icon && <div className={styles.iconContainer}>{icon}</div>}
          </div>
        )}
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
  icon: PropTypes.node,
  actions: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Card;
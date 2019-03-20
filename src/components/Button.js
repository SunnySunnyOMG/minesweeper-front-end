import React from 'react';
import styles from './styles/Button.module.scss'
export default function Button({ children, disabled, id, className, ...rest }) {
  id = disabled ? 'disabled' : id
  return <button id={id} disabled={disabled} className={[styles.container, className, disabled && styles.disabled].join(' ')} {...rest}>{children}</button>
}

Button.defaultProps = {
  id: 'opacity'
}

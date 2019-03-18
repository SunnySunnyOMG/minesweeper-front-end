import React from 'react';
import styles from './styles/Loading.module.scss';
import Text from './Text';
  
export function Loading(){
  return <div className={styles.overlay}>
    <Text type="white bold xl">Loading...</Text>
  </div>
}
import React, { Component } from 'react';

import styles from './styles/TextInput.module.scss';

export default class TextInput extends Component {
  render() {
    const { style, className, ...rest } = this.props;

    return (
      <div className={[styles.container, className].join(' ')}>
          <input {...rest} className={styles.input} />
      </div>
    );
  }

}

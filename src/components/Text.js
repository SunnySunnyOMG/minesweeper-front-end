import React from 'react';
import './styles/Text.scss';

export default function Text({ type, children, ...rest }) {
  return <p {...rest} className={'text-base ' + type}>{children}</p>
}

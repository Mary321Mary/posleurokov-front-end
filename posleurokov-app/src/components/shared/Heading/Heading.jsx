import React from 'react';
import styles from './Heading.module.scss';

const Heading = ({ tag, center = false, children, ...rest }) => {
  const Tag = tag;
  return (
    <Tag
      className={`${styles[Tag]} ${center ? styles.center : ''}`}
      style={{ ...rest }}
    >
      {children}
    </Tag>
  );
};

export { Heading };

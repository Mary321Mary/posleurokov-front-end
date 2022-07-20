import React from 'react';
import styles from './Heading.module.scss';

const Heading = ({ tag, center = false, children, ...rest }) => {
  const Tag = tag;
  return (
    <Tag
      className={`${styles[Tag]} ${center ? styles.center : ''}`}
      styles={{ ...rest }}
    >
      {children}
    </Tag>
  );
};

export default Heading;

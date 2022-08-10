import React from 'react';
import styles from './Courses.module.scss';
import { Course } from 'components/shared';

const Courses = ({ list, ...rest }) => {
  return (
    <div style={{ ...rest }} className={styles.courses}>
      <Course list={list}/>
    </div>
  );
};

export { Courses };
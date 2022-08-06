import {
  Heading,
  Sheet,
  Courses
} from 'components/shared';
import { VkBlock } from 'components';

import styles from './Catalogue.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const Catalogue = () => {
  const [courses, setCourses] = useState(null);

  const getCourses = async () => {
    const result = await axiosAPI.getCourses();
    setCourses(result);
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className={styles.container}>
      <Heading tag='h1'>
        Каталог кружков, секций и курсов в Гомеле
      </Heading>
      <div className={styles['section-list']}>
        <div className={styles['section-categories']}>
          <Sheet>
            {courses !== null ? (
              typeof courses !== 'string' ? (
                <Courses list={courses.result} />
              ) : (
                <div>{courses}</div>
              )
            ) : (
              <div>Loading post...</div>
            )}
          </Sheet>
        </div>
        <div className={styles['section-categories']}>
          <VkBlock heigth='auto' width='220px' />
        </div>
      </div>
    </section>
  );
};

export { Catalogue };
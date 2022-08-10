import {
  Heading,
  Sheet,
  Courses,
  Pagination,
  VkBlock
} from 'components';

import styles from './Catalogue.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const Catalogue = () => {
  const [courses, setCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
          {courses !== null ? (
            typeof courses !== 'string' ? (
              <Sheet>
                <Courses list={courses.result} />
                <Pagination
                  currentPage={currentPage}
                  totalPageCount={courses.counts.countOfPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </Sheet>
            ) : (
              <div>{courses}</div>
            )
          ) : (
            <div>Loading post...</div>
          )}
        </div>
        <div className={styles['section-categories']}>
          <VkBlock heigth='auto' width='220px' />
        </div>
      </div>
    </section>
  );
};

export { Catalogue };
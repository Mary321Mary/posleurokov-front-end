import {
  Heading,
  Sheet
} from 'components/shared';

import styles from './LessonPage.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';
import { useParams } from "react-router-dom";
import { ImageCarousel } from 'components';

const LessonPage = () => {
  const [lesson, setLesson] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState('');

  const getLesson = async () => {
    let result = await axiosAPI.getLessonInfo(id);
    setLesson(result.lesson);
    setImages(result.images);
  }

  useEffect(() => {
    getLesson()

    function handleWindowResize() {
      setWindowWidth(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const getWindowSize = () => {
    let { innerWidth, _ } = window;

    if (innerWidth > 1024) {
      return '895px';
    }
    else if (innerWidth > 320 && innerWidth < 1025) {
      return '723px';
    }
    else {
      return '288px';
    }
  }

  return (
    <section className={styles.section}>
      <Sheet
        margin="3vh 30vw 0 2vw" padding='2vh 0 0 0' width={windowWidth}>
        <Heading tag='h1' margin='2vh 3vw 0 2.5vw' color='#6D80D8' font-size='1.6rem' font-style='normal' font-weight='500'>
          {lesson.name}
        </Heading>
        <ImageCarousel images={images ?? []} margin='1.5vh 3.5vw 0 2.5vw' />
      </Sheet>
    </section>
  );
};

export { LessonPage };
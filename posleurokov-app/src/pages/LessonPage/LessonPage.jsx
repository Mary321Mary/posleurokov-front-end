import {
  Heading,
  Sheet,
  ImageCarousel,
  LessonDescription
} from 'components';

import styles from './LessonPage.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const [lesson, setLesson] = useState({});
  const [images, setImages] = useState([]);
  const [organization, setOrganization] = useState({})
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState('');
  const [sheetMargin, setSheetMargin] = useState('');

  useEffect(() => {
    getLesson()
    getOrganization()
    getWindowSize()

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const getLesson = async () => {
    let result = await axiosAPI.getLessonInfo(id);
    setLesson(result.lesson);
    setImages(result.images);
  }

  const getOrganization = async () => {
    let result = await axiosAPI.getLessonOrganization(id)
    setOrganization(result)
  }

  const getWindowSize = () => {
    let { innerWidth, _ } = window;

    if (innerWidth > 1024) {
      setWindowWidth('895px')
      setSheetMargin('49px 33px 10px 52px')
    }
    else if (innerWidth > 700 && innerWidth <= 1024) {
      setWindowWidth('723px')
      setSheetMargin('31px 24px 10px 32px')
    }
    else {
      setWindowWidth('288px')
      setSheetMargin('20px 16px 10px 16px')
    }
  }

  return (
    <section className={styles.section}>
      <Sheet
        margin={sheetMargin} width={windowWidth}>
        <Heading tag='h1' margin='2vh 3vw 10px 5.5vw' padding='0' color='#6D80D8' font-size='1.6rem' font-style='normal' font-weight='500'>
          {lesson.name}
        </Heading>
        <ImageCarousel images={images ?? []} />
        <LessonDescription lesson={lesson} organization={organization} />
      </Sheet>
    </section>
  );
};

export { LessonPage };
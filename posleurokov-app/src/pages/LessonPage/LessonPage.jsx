import {
  Heading,
  Sheet,
  ImageCarousel,
  LessonDescription,
  Similar,
  Additional,
  RandomLessons,
  VkBlock
} from "components";

import styles from "./LessonPage.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import { useParams } from "react-router-dom";
import { Loader } from "components";

const LessonPage = () => {
  const [lesson, setLesson] = useState({});
  const [images, setImages] = useState([]);
  const [organization, setOrganization] = useState({});
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState("");
  const [sheetMargin, setSheetMargin] = useState("");
  const [panelMargin, setPanelMargin] = useState('initial')
  const [headingParams, setHeadingParams] = useState({});
  const [loading, setLoading] = useState(false)

  const getLesson = async () => {
    setLoading(true);
    let result = await axiosAPI.getLessonInfo(id);
    if (result == 'Ошибка сервера') {
      window.location.replace('/login')
    }
    setLesson(result.lesson);
    setImages(result.images);
  };

  const getOrganization = async () => {
    let result = await axiosAPI.getLessonOrganization(id);
    setOrganization(result);
    setLoading(false)
  };

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setWindowWidth('910px')
      setSheetMargin('49px 33px 10px 52px')
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '38px 0 29px 49px',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
      setPanelMargin('initial')
    }
    else if (innerWidth > 700 && innerWidth <= 1024) {
      setWindowWidth('723px')
      setSheetMargin('10px auto')
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '38px 0 12.5px 40px',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
      setPanelMargin('initial')
    }
    else {
      setWindowWidth('312px')
      setSheetMargin('10px auto')
      setHeadingParams({
        'width': '288px',
        'height': 'auto',
        'margin': '16px 0 14px 15px',
        'color': '#6D80D8',
        'font-size': '22px',
        'line-height': '26px',
        'font-style': 'normal',
        'font-weight': '500'
      })
      setPanelMargin('10px 0 10px 43%')
    }
  };

  useEffect(() => {
    let getResults = async () => {
      await getLesson();
      await getOrganization();
    }
    getResults();
    getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  return (
    <section className={styles.section}>
      {loading ? <Loader margin-left={'35%'} /> : <div className={styles.table}>
        <div className={styles.table_row}>
          <Sheet margin={sheetMargin} width={windowWidth}>
            <Heading
              tag="h1"
              margin={headingParams["margin"]}
              width={headingParams["width"]}
              height={headingParams["height"]}
              color={headingParams["color"]}
              fontSize={headingParams["font-size"]}
              lineHeight={headingParams["line-height"]}
              fontWeight={headingParams["font-weight"]}
            >
              {lesson.name}
            </Heading>
            <ImageCarousel images={images ?? []} />
            <LessonDescription lesson={lesson} organization={organization} />
          </Sheet>
          <div className={styles.table_cell}>
            <Additional price />
            <RandomLessons label='Другие занятия' number="3" width="220px" />
            <VkBlock heigth={"auto"} width={"220px"} />
          </div>
        </div>
        <div className={styles.table_row}>
          <Similar id={id} margin={sheetMargin} width={windowWidth} marginTop={'10px'} />
        </div>
      </div>}
    </section>
  );
};

export { LessonPage };

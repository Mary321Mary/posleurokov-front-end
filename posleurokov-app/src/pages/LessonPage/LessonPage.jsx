import {
  Heading,
  Sheet,
  ImageCarousel,
  LessonDescription,
  Similar,
  Additional,
  RandomLessons,
  VkBlock,
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
  const [headingParams, setHeadingParams] = useState({});
  const [loading, setLoading] = useState(false);

  const getLesson = async () => {
    setLoading(true);
    let result = await axiosAPI.getLessonInfo(id);
    if (result == "Ошибка сервера") {
      window.location.replace("/login");
    }
    setLesson(result.lesson);
    setImages(result.images);
  };

  const getOrganization = async () => {
    let result = await axiosAPI.getLessonOrganization(id);
    setOrganization(result);
    setLoading(false);
  };

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1200) {
      setHeadingParams({
        margin: "38px 0 29px 49px",
        "font-size": "30px",
        "line-height": "35px",
      });
    } else if (innerWidth > 760 && innerWidth <= 1200) {
      setHeadingParams({
        margin: "38px 0 12.5px 40px",
        "font-size": "30px",
        "line-height": "35px",
      });
    } else {
      setHeadingParams({
        margin: "16px 0 14px 15px",
        "font-size": "22px",
        "line-height": "26px",
      });
    }
  };

  useEffect(() => {
    let getResults = async () => {
      await getLesson();
      await getOrganization();
    };
    getResults();
    getWindowSize();
    function handleWindowResize() {
      getWindowSize();
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <section className={styles.section}>
      {loading ? (
        <Loader marginLeft={"35%"} />
      ) : (
        <div className={styles["section-list"]}>
          <div className={styles["section-categories"]}>
            <Sheet className={styles.sheet}>
              <Heading
                tag="h1"
                margin={headingParams["margin"]}
                color="#6D80D8"
                fontSize={headingParams["font-size"]}
                lineHeight={headingParams["line-height"]}
                fontWeight="500"
              >
                {lesson.name}
              </Heading>
              <ImageCarousel images={images ?? []} />
              <LessonDescription lesson={lesson} organization={organization} />
            </Sheet>
            <Similar id={id} marginTop={"10px"} className={styles.sheet} />
          </div>
          <div className={styles["section-categories"]}>
            <Additional />
            <RandomLessons label="Другие занятия" number="3" width="220px" />
            <VkBlock heigth={"auto"} width={"220px"} />
          </div>
        </div>
      )}
    </section>
  );
};

export { LessonPage };

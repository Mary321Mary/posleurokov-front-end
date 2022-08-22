import {
  Heading,
  Sheet,
  ImageCarousel,
  LessonDescription,
  Similar,
} from "components";

import styles from "./LessonPage.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const [lesson, setLesson] = useState({});
  const [images, setImages] = useState([]);
  const [organization, setOrganization] = useState({});
  const { id } = useParams();
  const [windowWidth, setWindowWidth] = useState("");
  const [sheetMargin, setSheetMargin] = useState("");
  const [headingParams, setHeadingParams] = useState({});

  useEffect(() => {
    getLesson();
    getOrganization();
    getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getLesson = async () => {
    let result = await axiosAPI.getLessonInfo(id);
    setLesson(result.lesson);
    setImages(result.images);
  };

  const getOrganization = async () => {
    let result = await axiosAPI.getLessonOrganization(id);
    setOrganization(result);
  };

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setWindowWidth("895px");
      setSheetMargin("49px 33px 10px 52px");
      setHeadingParams({
        width: "500px",
        height: "auto",
        margin: "38px 0 29px 110px",
        color: "#6D80D8",
        "font-size": "30px",
        "line-height": "35px",
        "font-weight": "500",
      });
    } else if (innerWidth > 700 && innerWidth <= 1024) {
      setWindowWidth("723px");
      setSheetMargin("31px 24px 10px 32px");
      setHeadingParams({
        width: "500px",
        height: "auto",
        margin: "38px 0 12.5px 55px",
        color: "#6D80D8",
        "font-size": "30px",
        "line-height": "35px",
        "font-weight": "500",
      });
    } else {
      setWindowWidth("312px");
      setSheetMargin("20px 16px 10px 16px");
      setHeadingParams({
        width: "130px",
        height: "auto",
        margin: "16px 0 14px 30px",
        color: "#6D80D8",
        "font-size": "22px",
        "line-height": "26px",
        "font-weight": "500",
      });
    }
  };

  return (
    <section className={styles.section}>
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
      <Similar id={id} margin={sheetMargin} width={windowWidth} />
    </section>
  );
};

export { LessonPage };

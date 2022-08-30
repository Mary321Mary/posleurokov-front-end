import styles from "./RandomLessons.module.scss";
import { useState, useEffect } from "react";
import { Sheet } from "components";
import { axiosAPI } from "plugins/axios";

import randomLesson from "assets/img/img.png";

const RandomLessons = ({ number, label = false, ...rest }) => {
  const [randomLessons, setRandomLessons] = useState(null);

  useEffect(() => {
    getRandomLessons();
  }, []);

  const getRandomLessons = async () => {
    const lessons = await axiosAPI.getRandomLessons(number);
    setRandomLessons(lessons);
  };

  return randomLessons !== null ? (
    Array.isArray(randomLessons) ? (
      <Sheet padding="5.23px 17px 7px" {...rest}>
        <div className={`${styles.label} ${label ? "" : styles["absent"]}`}>
          {label}
        </div>
        {randomLessons.map((lesson) => {
          return (
            <div
              key={lesson.name}
              style={{
                paddingTop: "10.77px",
                paddingBottom: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {lesson.image.image !== null ? (
                <img
                  src={process.env.REACT_APP_BASE_URL + lesson.image.image}
                  alt="Занятие"
                  width="70px"
                />
              ) : (
                <img src={randomLesson} alt="Занятие" width="70px" />
              )}
              <a
                href={`/lesson/${lesson.id}`}
                style={{
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#5F6060",
                  marginLeft: "12px",
                }}
              >
                {lesson.name}
              </a>
            </div>
          );
        })}
      </Sheet>
    ) : (
      <div>{randomLessons}</div>
    )
  ) : (
    <div>Loading post...</div>
  );
};

export { RandomLessons };

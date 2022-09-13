import { Sheet, Link } from "components";
import styles from "./Similar.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import randomLesson from "assets/img/randomLesson.png";
import age from "assets/img/age.svg";
import map from "assets/img/mapItem.svg";
import time from "assets/img/time.svg";

const Similar = ({ id, className, ...rest }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    getSimilar();
  }, []);

  const getSimilar = async () => {
    const result = await axiosAPI.getSimilar(`${id}/similar`);
    setSimilar(result);
  };

  return (
    <Sheet
      className={`${className} ${
        similar.length === 0 ? styles.notsimilar : styles.similar
      }`}
      {...rest}
    >
      <div className={styles.label}>Похожие</div>
      <div className={styles.info}>
        {similar !== null ? (
          Array.isArray(similar) ? (
            similar.map((elem) => {
              return (
                <div key={elem.lesson.id} className={styles.content}>
                  {elem.image !== undefined ? (
                    <img
                      src={process.env.REACT_APP_BASE_URL + elem.image.image}
                      alt="Курс"
                    />
                  ) : (
                    <img src={randomLesson} alt="Курс" />
                  )}
                  <div className={styles.addition}>
                    <a
                      href={`/lesson/${elem.lesson.id}`}
                      style={{
                        fontFamily: "Roboto-Regular",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "16px",
                        color: "#5F6060",
                        marginLeft: "12px",
                        textDecoration: "none",
                      }}
                    >
                      <div className={`${styles.name} ${styles.block}`}>
                        {elem.lesson.name}
                      </div>
                    </a>
                    <div className={styles.block}>
                      <img src={age} alt="возраст" />
                      <div>
                        {elem.lesson.startAge}-{elem.lesson.endAge} лет
                      </div>
                    </div>
                    <div className={styles.block}>
                      <img src={map} alt="адрес" />
                      <div>{elem.lesson.address}</div>
                    </div>
                    {elem.lesson.timetable !== null ? (
                      <div className={styles.block}>
                        <img src={time} alt="время" />
                        <div>{elem.lesson.timetable}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })
          ) : (
            <div>{similar}</div>
          )
        ) : (
          <div>Loading post...</div>
        )}
      </div>
    </Sheet>
  );
};

export { Similar };

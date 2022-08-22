import { Sheet, Link } from "components";
import styles from "./Similar.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import randomLesson from "assets/img/randomLesson.png";
import age from "assets/img/age.svg";
import map from "assets/img/mapItem.svg";
import time from "assets/img/time.svg";

const Similar = ({ id, ...rest }) => {
  const [similar, setSimilar] = useState(null);

  useEffect(() => {
    getSimilar();
  }, []);

  const getSimilar = async () => {
    const result = await axiosAPI.getSimilar(`/${id}/similar`);
    setSimilar(result);
  };

  return (
    <Sheet {...rest}>
      <div className={styles.label}>Похожие</div>
      <div className={styles.info}>
        {similar !== null ? (
          Array.isArray(similar) ? (
            similar.map((elem) => {
              return (
                <div key={elem.lesson.id}>
                  <div className={styles.content}>
                    {elem.image !== undefined ? (
                      <img
                        src={process.env.REACT_APP_BASE_URL + elem.image.image}
                        alt="Курс"
                      />
                    ) : (
                      <img src={randomLesson} alt="Курс" />
                    )}
                    <div className={styles.addition}>
                      <Link path={`/lesson/${elem.lesson.id}`}>
                        <div className={`${styles.name} ${styles.block}`}>
                          {elem.lesson.name}
                        </div>
                      </Link>
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
                      <div className={styles.block}>
                        <img src={time} alt="время" />
                        <div>
                          {elem.lesson.timetable !== null
                            ? elem.lesson.timetable
                            : "Не назначено"}
                        </div>
                      </div>
                    </div>
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

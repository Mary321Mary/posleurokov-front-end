import { Sheet } from "components";
import styles from "./Similar.module.scss";
import { useState, useEffect } from "react";
import { axiosAPI } from "plugins/axios";
import randomLesson from "assets/img/randomLesson.png";
import age from "assets/img/age.svg";
import map from "assets/img/mapItem.svg";
import time from "assets/img/time.svg";

const Similar = ({ ...rest }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    getSimilar();
  }, []);

  const getSimilar = async () => {
    const result = await axiosAPI.getSimilar("/3/similar");
    setSimilar(result);
  };

  return (
    <Sheet maxWidth="900px" marginTop="38px" {...rest}>
      <div className={styles.label}>Похожие</div>
      <div className={styles.info}>
        {/* {similar !== null ? (
          typeof similar !== "string" ? (
            similar.map((elem) => {
              return (
                <div key={elem.lesson.id}>
                  <div className={styles.content}>
                    <img src={randomLesson} alt="курс" />
                    <div className={styles.addition}>
                      <div className={`${styles.name} ${styles.block}`}>
                        {elem.lesson.name}
                      </div>
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
        )} */}
        <div className={styles.content}>
          <img src={randomLesson} alt="курс" />
          <div className={styles.addition}>
            <div className={`${styles.name} ${styles.block}`}>oo</div>
            <div className={styles.block}>
              <img src={age} alt="возраст" />
              <div>oo лет</div>
            </div>
            <div className={styles.block}>
              <img src={map} alt="адрес" />
              <div>г. Гомель, пр-т Ленина, 3</div>
            </div>
            <div className={styles.block}>
              <img src={time} alt="время" />
              <div>"Не назначено"</div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <img src={randomLesson} alt="курс" />
          <div className={styles.addition}>
            <div className={`${styles.name} ${styles.block}`}>oo</div>
            <div className={styles.block}>
              <img src={age} alt="возраст" />
              <div>oo лет</div>
            </div>
            <div className={styles.block}>
              <img src={map} alt="адрес" />
              <div>г. Гомель, пр-т Ленина, 3</div>
            </div>
            <div className={styles.block}>
              <img src={time} alt="время" />
              <div>"Не назначено"</div>
            </div>
          </div>
        </div>
      </div>
    </Sheet>
  );
};

export { Similar };

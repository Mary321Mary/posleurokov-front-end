import styles from "./Course.module.scss";
import { Online } from "components";
import randomLesson from "assets/img/img.png";
import age from "assets/img/age.svg";
import map from "assets/img/mapItem.svg";
import time from "assets/img/time.svg";

const Course = ({ list, online, ...rest }) => {
  const displayCourses = list.map((elem, id) => {
    return (
      <div key={elem.lesson.name}>
        <div className={styles.course}>
          <div className={styles.label}>{elem.lesson.name}</div>
          <div className={styles.content}>
            {elem.image !== null ? (
              <img
                src={process.env.REACT_APP_BASE_URL + elem.image.image}
                alt="Курс"
              />
            ) : (
              <img src={randomLesson} alt="Курс" />
            )}
            <div className={styles.info}>{elem.lesson.info}</div>
            <div className={styles.addition}>
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
            <div className={styles.price}>
              <div>
                <div>{elem.lesson.price} руб.</div>
                <div>{elem.lesson.additionalPriceInfo}</div>
              </div>
              {elem.lesson.hasReseption ? (
                <div className={styles.open}>Прием: идет</div>
              ) : (
                <div className={styles.close}>Прием: закрыт</div>
              )}
            </div>
          </div>
          <div className={styles.mobile}>
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
          <div className={styles.tablet}>
            <div>
              {elem.lesson.hasReseption ? (
                <div className={styles.open}>Прием: идет</div>
              ) : (
                <div className={styles.close}>Прием: закрыт</div>
              )}
            </div>
            <div>
              <div>{elem.lesson.price} руб.</div>
              <div>{elem.lesson.additionalPriceInfo}</div>
            </div>
          </div>
        </div>
        {id === 0 ? <Online width="inherit" number={online} /> : null}
      </div>
    );
  });

  return <div style={{ ...rest }}>{displayCourses}</div>;
};

export { Course };

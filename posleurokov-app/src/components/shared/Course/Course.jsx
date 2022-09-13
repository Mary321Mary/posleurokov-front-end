import styles from "./Course.module.scss";
import { Online, Link } from "components";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import randomLesson from "assets/img/img.png";
import age from "assets/img/age.svg";
import map from "assets/img/mapItem.svg";
import time from "assets/img/time.svg";

const Course = ({ list, online, ...rest }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const categories = await axiosAPI.getCategoriesList();
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const displayCourses = list.map((elem, id) => {
    return (
      <div key={elem.lesson.name}>
        <div className={styles.course}>
          <Link path={`/lesson/${elem.lesson.id}`}>
            <div className={styles.label}>{elem.lesson.name}</div>
          </Link>
          <div className={styles.content}>
            {elem.image !== null ? (
              <img
                src={process.env.REACT_APP_BASE_URL + elem.image.image}
                alt="Курс"
              />
            ) : (
              <img src={randomLesson} alt="Курс" className={styles.random} />
            )}
            <div className={styles.info}>
              <div>
                {elem.lesson.lessonCategories.map((category) => {
                  let value = categories.find((elem) => elem.id == category);
                  return value ? (
                    <div
                      key={category}
                      style={{
                        display: "inline",
                        marginRight: "5px",
                        overflowWrap: "break-word",
                      }}
                    >
                      #{value.name.split("/")[1]}
                    </div>
                  ) : null;
                })}
              </div>
              <br />
              <div>{elem.lesson.info}</div>
            </div>
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
              {elem.lesson.timetable !== null ? (
                <div className={styles.block}>
                  <img src={time} alt="время" />
                  <div>{elem.lesson.timetable}</div>
                </div>
              ) : null}
            </div>
            <div className={styles.price}>
              <div>
                {elem.lesson.price ? (
                  <div>{elem.lesson.price} руб.</div>
                ) : (
                  <div>Цена не указана</div>
                )}
                <div>{elem.lesson.additionalPriceInfo}</div>
              </div>
              {elem.lesson.isFirstFree ? (
                <div className={styles.firstFree}>Первое Бесплатно</div>
              ) : null}
              {elem.lesson.hasReception ? (
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
            {elem.lesson.timetable !== null ? (
              <div className={styles.block}>
                <img src={time} alt="время" />
                <div>{elem.lesson.timetable}</div>
              </div>
            ) : null}
          </div>
          <div className={styles.tablet}>
            <div>
              {elem.lesson.hasReception ? (
                <div className={styles.open}>Прием: идет</div>
              ) : (
                <div className={styles.close}>Прием: закрыт</div>
              )}
            </div>
            {elem.lesson.isFirstFree ? (
              <div className={styles.firstFree}>Первое Бесплатно</div>
            ) : null}
            <div className={styles["tablet-price"]}>
              {elem.lesson.price ? (
                <div>{elem.lesson.price} руб.</div>
              ) : (
                <div>Цена не указана</div>
              )}
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

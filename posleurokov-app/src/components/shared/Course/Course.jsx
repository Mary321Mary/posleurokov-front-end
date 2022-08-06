import styles from './Course.module.scss';
import randomLesson from 'assets/img/randomLesson.png';
import age from 'assets/img/age.svg';
import map from 'assets/img/mapItem.svg';
import time from 'assets/img/time.svg';

const Course = ({ list, ...rest }) => {
  const displayCourses = list.map((elem) => {
    return (
      <div key={elem.lesson.name} className={styles.course}>
        <div className={styles.label}>{elem.lesson.name}</div>
        <div className={styles.content}>
          <img src={randomLesson} alt='курс'/>
          <div className={styles.info}>{elem.lesson.info}</div>
          <div className={styles.addition}>
            <div className={styles.block}>
              <img src={age} alt='возраст'/>
              <div>{elem.lesson.startAge}-{elem.lesson.endAge} лет</div>
            </div>
            <div className={styles.block}>
              <img src={map} alt='адрес' style={{paddingLeft:'3px', paddingRight:'4px'}}/>
              <div>{elem.lesson.address}</div>
            </div>
            <div className={styles.block}>
              <img src={time} alt='время'/>
              <div>Время?</div>
            </div>
          </div>
          <div className={styles.price}>
            <div>
              <div>{elem.lesson.price} руб.</div>
              <div>{elem.lesson.additionalPriceInfo}</div>
            </div>
          </div>
        </div>
        <div className={styles.mobile}>
          <div className={styles.block}>
            <img src={age} alt='возраст'/>
            <div>{elem.lesson.startAge}-{elem.lesson.endAge} лет</div>
          </div>
          <div className={styles.block}>
            <img src={map} alt='адрес' />
            <div>{elem.lesson.address}</div>
          </div>
          <div className={styles.block}>
            <img src={time} alt='время'/>
            <div>Время?</div>
          </div>
        </div>
        <div className={styles.tablet}>
          <div>
            <div>{elem.lesson.price} руб.</div>
            <div>{elem.lesson.additionalPriceInfo}</div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <div style={{ ...rest }}>{displayCourses}</div>
  );
};

export { Course };
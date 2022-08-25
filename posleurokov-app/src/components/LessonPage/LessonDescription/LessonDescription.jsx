import styles from './LessonDescription.module.scss';
import { InfoPanel } from '..';

const LessonDescription = ({ lesson, organization, ...rest }) => {

  const GetAddress = () => {
    if (lesson.address !== null) {
      return (
        <div>
          <h3 className={styles.h3}>Адреса</h3>
          <div>{lesson.address}</div>
        </div>
      )
    }
    else {
      return;
    }
  }

  const GetPhones = () => {
    let phones = ''

    if (organization.phoneNumber !== null) {
      phones += organization.phoneNumber + ', '
    }

    if (lesson.additionalContactPhoneNumber !== null) {
      phones += lesson.additionalContactPhoneNumber
    }

    if (phones !== '') {
      return (
        <div>
          <h3 className={styles.h3}>Телефоны</h3>
          <div>{phones}</div>
        </div>
      )
    }
    else {
      return;
    }
  }

  const GetPlace = () => {
    if (lesson.place !== null) {
      return (
        <div>
          <h3 className={styles.h3}>Место</h3>
          <div>{lesson.place}</div>
        </div>
      )
    }
    else {
      return;
    }
  }

  const GetDescr = () => {
    if (lesson.info !== null) {
      return (
        <div>
          <h3 className={styles.h3}>Описание</h3>
          <div>{lesson.info}</div>
        </div>
      )
    }
    else {
      return;
    }
  }

  const GetRasp = () => {
    if (lesson.timetable !== null) {
      let LinkOrText = () => {
        if (String(lesson.timetable).startsWith('http')) {
          return <div><a href={lesson.timetable}>{lesson.timetable}</a></div>
        }
        else {
          return <div>{lesson.timetable}</div>
        }
      }

      return (
        <div>
          <h3 className={styles.h3}>Расписание</h3>
          <LinkOrText />
        </div>
      )
    }
    else {
      return;
    }
  }

  const GetContacts = () => {
    return (
      <div>
        <h3 className={styles.h3}>Контакты</h3>
        <div>{organization.name}<br />
          Email: {organization.email}<br />
          Телефон: {organization.phoneNumber}<br />
          {organization.additionalLink}</div>
      </div>
    )
  }

  const GetLastUpdate = () => {
    if (window.outerWidth < 700) {
      return;
    }

    return (
      <div>
        <div className={styles.date}>Последнее обновление&nbsp;&nbsp;&nbsp;<span>{lesson.date_updated}</span></div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <GetAddress />
        <GetPhones />
        <GetPlace />
        <GetDescr />
        <GetRasp />
        <GetContacts />
        <GetLastUpdate />
      </div>
      <InfoPanel lesson={lesson} />
    </div>
  );
};

export { LessonDescription };
import styles from "./LessonDescription.module.scss";
import { InfoPanel } from "..";
import { Link } from "components";

const LessonDescription = ({ lesson, organization, ...rest }) => {
  const GetAddress = () => {
    if (lesson.address !== null) {
      return (
        <div>
          <h3 className={styles.h3}>Адрес</h3>
          <div>{lesson.address}</div>
        </div>
      );
    } else {
      return;
    }
  };

  const GetPhones = () => {
    let phones = "";

    if (lesson.additionalContactPhoneNumber !== null) {
      phones += lesson.additionalContactPhoneNumber;
    }

    if (phones !== "") {
      return (
        <div>
          <h3 className={styles.h3}>Телефоны</h3>
          <div>{phones}</div>
        </div>
      );
    } else {
      return;
    }
  };

  const GetPlace = () => {
    if (lesson.place !== null) {
      let LinkOrText = () => {
        if (String(lesson.place).startsWith("http")) {
          return (
            <div>
              <a href={lesson.place} target={'_blank'}>{lesson.place}</a>
            </div>
          );
        }
        else {
          return <div>{lesson.place}</div>;
        }
      };

      return (
        <div>
          <h3 className={styles.h3}>Место</h3>
          <LinkOrText />
        </div>
      );
    } else {
      return;
    }
  };

  const GetDescr = () => {
    if (lesson.info !== null) {
      return (
        <div>
          <h3 className={styles.h3}>Описание</h3>
          <div>{lesson.info}</div>
        </div>
      );
    } else {
      return;
    }
  };

  const GetRasp = () => {
    if (lesson.timetable !== null) {
      let LinkOrText = () => {
        if (String(lesson.timetable).startsWith("http")) {
          return (
            <div>
              <Link path={lesson.timetable} target={'_blank'}>{lesson.timetable}</Link>
            </div>
          );
        }
        else {
          return <div>{lesson.timetable}</div>;
        }
      };

      return (
        <div>
          <h3 className={styles.h3}>Расписание</h3>
          <LinkOrText />
        </div>
      );
    } else {
      return;
    }
  };

  const GetContacts = () => {
    return (
      <div>
        <h3 className={styles.h3}>Контакты</h3>
        <div>
          <Link path={`/organization/${organization.id}`} color={'#527DAF'} marginBottom={'10px'} display={'inline-block'}>{organization.name}</Link>
          <br />
          Email: <Link path={'mailto:' + organization.email}>{organization.email}</Link>
          <br />
          Телефон: {organization.phoneNumber}
          <br />
          <Link path={organization.additionalLink}>{organization.additionalLink}</Link>
        </div>
      </div>
    );
  };

  const GetLastUpdate = () => {
    return (
      <div>
        <div className={styles.date}>
          Последнее обновление&nbsp;&nbsp;&nbsp;
          <span>{lesson.date_updated}</span>
        </div>
      </div>
    );
  };

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

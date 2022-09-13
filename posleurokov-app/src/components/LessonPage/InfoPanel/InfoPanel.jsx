import { Sheet, ModalWindow, Button } from "components";
import styles from "./InfoPanel.module.scss";
import checkbox from "assets/img/CheckBox.png";
import bell from "assets/img/bell.png";
import warning from "assets/img/info.png";
import { axiosAPI } from "plugins/axios";
import { useState, useEffect } from "react";
import { SubscribeForm, CorrectionForm, ApplicationForm } from "..";

const InfoPanel = ({ lesson, ...rest }) => {
  const [showModal, setShowModal] = useState(false);
  const [child, setChild] = useState(null);
  const [sheetParams, setSheetParams] = useState({});

  const SetPrice = () => {
    if (lesson.price === null || lesson.price === 0) {
      return <div className={styles.info}>бесплатно</div>;
    } else {
      let result = String(lesson.price);
      if (lesson.additionalPriceInfo !== null) {
        result = result + "р. " + lesson.additionalPriceInfo;
      }

      return <div className={styles.info}>{result}</div>;
    }
  };

  const SetAge = () => {
    if (lesson.startAge === null && lesson.endAge === null) {
      return <div className={styles.info}>любой</div>;
    } else if (lesson.startAge !== null && lesson.endAge !== null) {
      return (
        <div className={styles.info}>
          {lesson.startAge}-{lesson.endAge} лет
        </div>
      );
    } else if (lesson.startAge !== null) {
      return <div className={styles.info}>{lesson.startAge} лет</div>;
    } else {
      return <div className={styles.info}>{lesson.endAge} лет</div>;
    }
  };

  const SetSex = () => {
    if (lesson.sex == "female") {
      return <div className={styles.info}>женский</div>;
    } else if (lesson.sex == "male") {
      return <div className={styles.info}>мужской</div>;
    } else {
      return <div className={styles.info}>любой</div>;
    }
  };

  const SetWorkPeriods = () => {
    return (
      <div className={styles.info}>
        {lesson.isInNotSummer ? (
          <img src={checkbox}></img>
        ) : (
          <input className={styles.checkbox} disabled={true} />
        )}
        &nbsp;сен-май&nbsp;&nbsp;
        {lesson.isInSummer ? (
          <img src={checkbox}></img>
        ) : (
          <input className={styles.checkbox} disabled={true} />
        )}
        &nbsp;летом
      </div>
    );
  };

  const SubscribeUser = async () => {
    let result = await axiosAPI.subscribe(lesson.id);
    if (result.Ok) {
      setChild(
        <SubscribeForm
          isLogin={true}
          handler={() => {
            setShowModal(false);
          }}
        />
      );
      setShowModal(true);
    } else {
      setChild(
        <SubscribeForm
          isLogin={false}
          handler={() => {
            setShowModal(false);
          }}
        />
      );
      setShowModal(true);
    }
  };

  const showCorrection = () => {
    setChild(
      <CorrectionForm
        id={lesson.id}
        handler={() => {
          setShowModal(false);
        }}
      />
    );
    setShowModal(true);
  };

  const showApplication = () => {
    setChild(
      <ApplicationForm
        id={lesson.id}
        handler={() => {
          setShowModal(false);
        }}
      />
    );
    setShowModal(true);
  };

  const SetParams = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setSheetParams({
        width: "243px",
        height: lesson.isFirstFree ? "185px" : "161px",
        padding: "17px 16px 4px 21px",
      });
    } else if (innerWidth > 700 && innerWidth <= 1024) {
      setSheetParams({
        width: "243px",
        height: lesson.isFirstFree ? "185px" : "161px",
        padding: "17px 25px 16px 21px",
      });
    } else {
      setSheetParams({
        width: "235px",
        height: lesson.isFirstFree ? "185px" : "161px",
        padding: "17px 25px 16px 21px",
      });
    }
  };

  useEffect(() => {
    SetParams();

    function handleWindowResize() {
      SetParams();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.mainPanel}>
      <Sheet
        background="#EEEFEF"
        padding={sheetParams["padding"]}
        width={sheetParams["width"]}
        height={sheetParams["height"]}
      >
        <div className={styles.infoRow}>
          <div className={styles.head}>Цена:</div>
          <SetPrice />
        </div>
        {lesson.isFirstFree ? <div className={styles.firstFree}>Первое занятие бесплатно</div> : <></>}
        <div className={styles.infoRow}>
          <div className={styles.head}>Возраст:</div>
          <SetAge />
        </div>
        <div className={styles.infoRow}>
          <div className={styles.head}>Пол:</div>
          <SetSex />
        </div>
        <div className={styles.infoRow}>
          <div className={styles.head}>Работает:</div>
          <SetWorkPeriods />
        </div>
        <div className={styles.infoRow}>
          <div className={styles.head}>Свободные места:</div>
          {lesson.hasReception ? (
            <div className={styles.info}>есть</div>
          ) : (
            <div className={styles.info}>нет</div>
          )}
        </div>
      </Sheet>
      <div className={styles.actions}>
        <a onClick={SubscribeUser}>
          <img src={bell} />
          Получать уведомления
        </a>
      </div>
      <div className={styles.actions}>
        <a onClick={showCorrection}>
          <img src={warning} />
          Пожаловаться или исправить ошибку
        </a>
      </div>
      <Button
        width={"270px"}
        marginLeft={"6px"}
        height={"37px"}
        marginTop={"23px"}
        onClick={showApplication}
      >
        Отправить заявку
      </Button>
      <ModalWindow
        show={showModal}
        handler={() => {
          setShowModal(false);
        }}
      >
        {child}
      </ModalWindow>
    </div>
  );
};

export { InfoPanel };

import { Heading, Sheet, Loader } from "components";

import styles from "./About.module.scss";
import { useEffect, useState } from "react";
import about from "assets/img/about.png";
/*import Olesya from "assets/img/Olesya.svg";
import Grigoriy from "assets/img/Grigoriy.svg";
import Nikolay from "assets/img/Nikolay.svg";
import Alexandr from "assets/img/Alexandr.svg";
import Andrey from "assets/img/Andrey.svg";
import Yuliya from "assets/img/Yuliya.svg";
import Mihail from "assets/img/Mihail.svg";
import Mariya from "assets/img/Mariya.svg";
import Liliana from "assets/img/Liliana.svg";
import phoneIcon from "assets/img/phoneIcon.svg";
import mail from "assets/img/mail.svg";*/
import { axiosAPI } from "plugins/axios";
import Helmet from "react-helmet";

const About = () => {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    setLoading(true);
    let result = await axiosAPI.getAbout();
    setData(result);
  };

  const setData = (data) => {
    let infoParam = "";
    data.map((elem) => {
      infoParam += elem.info + "\r\n\r\n";
    });
    setInfo(infoParam);
    setLoading(false);
  };

  const StyleInfo = info.split(/\r?\n\r?\n/).map((elem) => {
    if (elem.startsWith("(Глава)") && elem.endsWith("(/Глава)")) {
      elem = elem.replace("(Глава)", "").replace("(/Глава)", "");
      return <div className={`${styles.chapter} ${styles.div}`}>{elem}</div>;
    } else if (elem.startsWith("(Особый)") && elem.endsWith("(/Особый)")) {
      elem = elem.replace("(Особый)", "").replace("(/Особый)", "");
      return <div className={`${styles.special} ${styles.div}`}>{elem}</div>;
    } else {
      return <div className={styles.div}>{elem}</div>;
    }
  });

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section className={styles.section}>
      <Helmet title="О проекте">
        <link rel="canonical" href="/about" />
        <meta
          name="description"
          content='Описание сайта "Все кружки", его основных функций и механизма работы'
        />
      </Helmet>
      {loading ? (
        <Loader marginLeft={"42vw"} />
      ) : (
        <div className={styles.content}>
          <Heading tag="h1" className={styles.project} paddingTop="20px">
            О проекте
          </Heading>
          <img src={about} className={styles.img} alt="О проекте" />
          <div className={styles.div}>{StyleInfo}</div>
          <Heading tag="h1" className={styles.team}>
            Наша команда
          </Heading>
          {/*<div className={styles.list}>
            <Sheet className={styles.member}>
              <img src={Olesya} className={styles.image} alt="ОЛЕСЯ ЧЕШУН" />
              <p className={styles.name}>ОЛЕСЯ ЧЕШУН</p>
              <p className={styles.role}>Руководитель проекта ВСЕ КРУЖКИ</p>
              <p>
                <a href="tel:+375291136797">
                  <img
                    src={phoneIcon}
                    className={styles.icon}
                    alt="phoneIcon"
                  />
                </a>
                <a href="mailto:o.cheshun@yandex.by">
                  <img src={mail} className={styles["icon-mail"]} alt="mail" />
                </a>
              </p>
            </Sheet>
            <Sheet className={styles.member}>
              <img
                src={Grigoriy}
                className={styles.image}
                alt="Григорий Вайгандт"
              />
              <p className={styles.name}>Григорий Вайгандт</p>
              <p className={styles.role}>Tехнический руководитель проекта</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img
                src={Nikolay}
                className={styles.image}
                alt="Николай Ряскин"
              />
              <p className={styles.name}>Николай Ряскин</p>
              <p className={styles.role}>Технический руководитель проекта</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img
                src={Alexandr}
                className={styles.image}
                alt="Бахметов Александр"
              />
              <p className={styles.name}>Бахметов Александр</p>
              <p className={styles.role}>
                Ассистент руководителя, контент-менеджер
              </p>
            </Sheet>
            <Sheet className={styles.member}>
              <img
                src={Andrey}
                className={styles.image}
                alt="Яковенко Андрей"
              />
              <p className={styles.name}>Яковенко Андрей</p>
              <p className={styles.role}>Контент-менеджер</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img src={Yuliya} className={styles.image} alt="Синицкая Юлия" />
              <p className={styles.name}>Синицкая Юлия</p>
              <p className={styles.role}>Дизайн</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img src={Mihail} className={styles.image} alt="Михаил Шеляхин" />
              <p className={styles.name}>Михаил Шеляхин</p>
              <p className={styles.role}>Программирование</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img src={Mariya} className={styles.image} alt="Мария Зайцева" />
              <p className={styles.name}>Мария Зайцева</p>
              <p className={styles.role}>Программирование</p>
            </Sheet>
            <Sheet className={styles.member}>
              <img
                src={Liliana}
                className={styles.image}
                alt="Лилиана Карпенко"
              />
              <p className={styles.name}>Лилиана Карпенко</p>
              <p className={styles.role}>Программирование</p>
            </Sheet>
          </div>*/}
        </div>
      )}
    </section>
  );
};

export { About };

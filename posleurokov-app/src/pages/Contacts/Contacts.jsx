import { Heading, Loader } from "components";

import styles from "./Contacts.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import vk from "assets/img/vk.png";
import email from "assets/img/mail.png";
import Helmet from "react-helmet";

const Contacts = () => {
  const [headingParams, setHeadingParams] = useState({});
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInfo = async () => {
    setLoading(true);
    let result = await axiosAPI.getContacts();
    setContacts(result);
    setLoading(false);
  };

  const StyleInfo = contacts.map((elem) => {
    return (
      <div className={styles.container}>
        {elem.avatar ? (
          <img src={process.env.REACT_APP_BASE_URL + elem.avatar}></img>
        ) : (
          <div></div>
        )}
        <div className={styles.info}>
          <div className={styles.fio}>{elem.fio}</div>
          <div className={styles.textInfo}>{elem.info}</div>
          {elem.vk ? (
            <a href={elem.vk} className={styles.vk} target={"_blank"}>
              <img src={vk}></img>
            </a>
          ) : (
            <div></div>
          )}
          <a href={"mailto:" + elem.email} className={styles.mail}>
            <img src={email}></img>
          </a>
        </div>
        <div className={styles.additional}>
          {elem.address ? (
            <div>
              <div className={styles.name}>Адрес:</div>
              <div className={styles.text}>{elem.address}</div>
            </div>
          ) : (
            <div></div>
          )}
          {elem.phones ? (
            <div>
              <div className={styles.name}>Телефоны:</div>
              <div className={styles.text}>{elem.phones}</div>
            </div>
          ) : (
            <div></div>
          )}
          {elem.mobile ? (
            <div>
              <div className={styles.name}>Мобильные телефоны:</div>
              <div className={styles.text}>{elem.mobile}</div>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            <div className={styles.name}>Email:</div>
            <div className={styles.text}>
              <a href={"mailto:" + elem.email}>{elem.email}</a>
            </div>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    getInfo();
    getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setHeadingParams({
        width: "500px",
        height: "auto",
        margin: "38px 0 36px 419px",
        color: "#6D80D8",
        "font-size": "30px",
        "line-height": "35px",
        "font-weight": "500",
      });
    } else if (innerWidth > 699 && innerWidth <= 1024) {
      setHeadingParams({
        width: "500px",
        height: "auto",
        margin: "10px 0 12.5px 4%",
        color: "#6D80D8",
        "font-size": "30px",
        "line-height": "35px",
        "font-weight": "500",
      });
    } else {
      setHeadingParams({
        width: "auto",
        height: "auto",
        margin: "10px 0 14px 4%",
        color: "#6D80D8",
        "font-size": "24px",
        "line-height": "28px",
        "font-weight": "500",
      });
    }
  };

  return (
    <section className={styles.section}>
      <Helmet title="Контакты">
        <meta name="description" content='Список контактов "Все кружки" и способы связи с ними.' />
        <link rel="canonical" href="/contacts" />
      </Helmet>
      {loading ? (
        <Loader marginLeft={"42vw"} />
      ) : (
        <div>
          <Heading
            tag="h1"
            margin={headingParams["margin"]}
            width={headingParams["width"]}
            height={headingParams["height"]}
            color={headingParams["color"]}
            fontSize={headingParams["font-size"]}
            lineHeight={headingParams["line-height"]}
            fontWeight={headingParams["font-weight"]}
            fontFamily={headingParams["font-family"]}
            paddingTop={"20px"}
          >
            Контакты
          </Heading>
          <div>{StyleInfo}</div>
        </div>
      )}
    </section>
  );
};

export { Contacts };

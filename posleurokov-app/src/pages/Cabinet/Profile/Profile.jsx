import styles from "./Profile.module.scss";
import { useState, useEffect } from "react";
import { Sheet, LeftPanel, Loader } from "components";
import { axiosAPI } from "plugins/axios";

const Profile = () => {
  const [organActive, setOrganActive] = useState(false);
  const [selfActive, setSelfActive] = useState(true);
  const [mainWidth, setMainWidth] = useState("");
  const [showPanel, setShowPanel] = useState("self");
  const [cities, setCities] = useState([]);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [orgName, setOrgName] = useState("");
  const [orgInfo, setOrgInfo] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [city, setCity] = useState(0);
  const [contactName, setContactName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgPhones, setOrgPhones] = useState("");
  const [orgSites, setOrgSites] = useState("");
  const [orgImage, setOrgImage] = useState("");

  const changePanel = (type) => {
    if (type == "self") {
      setOrganActive(false);
      setSelfActive(true);
      setShowPanel("self");
    } else {
      setOrganActive(true);
      setSelfActive(false);
      setShowPanel("org");
    }
  };

  const getSizes = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setMainWidth("880px");
    } else if (innerWidth > 700 && innerWidth <= 1024) {
      setMainWidth("550px");
    } else {
      setMainWidth("440px");
    }
  };

  const citiesSelect = cities.map((elem) => {
    return <option value={elem.id}>{elem.name}</option>;
  });

  const getUser = async () => {
    if (localStorage.getItem("token")) {
      setLoading(true)
      let result = await axiosAPI.getProfile();
      setUser(result.user);
      setOrganization(result.organizer);
    } else {
      window.location.replace("/login");
    }
  };

  const getCities = async () => {
    let result = await axiosAPI.getCities();
    setCities(result.cities);
    setLoading(false)
  };

  const setUser = (user) => {
    if ((user.fio.trim() != null) & (user.fio.trim() != "")) {
      let fio = String(user.fio).trim().split(" ");
      setFirstName(fio[0]);
      if (fio.length == 2) {
        setSurname(fio[1]);
      }
    }

    setEmail(user.email);
    setAddress(user.address);
    setPhone(user.phoneNumber);
    setUserId(user.id);
  };

  const convertImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setOrgImage(reader.result);
    };
  };

  const convertToBase64 = (url) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;

    img.width = 700;
    img.height = 365;

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height);

      var dataURL = canvas.toDataURL("image/png");
      setOrgImage(dataURL);
    };
  };

  const setOrganization = (organization) => {
    if (organization != null) {
      setOrgName(organization.name);
      setOrgInfo(organization.info);
      setOrgEmail(organization.email);
      setOrgAddress(organization.address);
      setContactName(organization.contactName);
      setOrgPhones(organization.phoneNumber);
      setCity(organization.city);
      setOrgSites(organization.additionalLink);
      convertToBase64(process.env.REACT_APP_BASE_URL + organization.picture);
    }
  };

  useEffect(() => {
    getUser();
    getCities();
    getSizes();

    function handleWindowResize() {
      getSizes();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const saveUser = async () => {
    if (firstName != '' && surname != '') {
      let user = {
        fio: firstName + " " + surname,
        email: email,
        address: address,
        phoneNumber: phone,
      };

      let result = await axiosAPI.updateUser(user);
      if (result.token) {
        setUser(result.user);
        localStorage.setItem("token", result.token);
        setIsSuccess(true)
        setError('')
      }
      else {
        setError('Некорректные данные')
        setIsSuccess(false)
      }
    }
    else {
      setError('Нет имени или фамилии')
      setIsSuccess(false)
    }
  };

  const saveOrganization = async () => {
    let organizer = {
      user: userId,
      city: city,
      name: orgName,
      info: orgInfo,
      email: orgEmail,
      address: orgAddress,
      contactName: contactName,
      phoneNumber: orgPhones,
      additionalLink: orgSites,
      picture: orgImage,
    };

    let result = await axiosAPI.updateOrganization(organizer);
    if (result.token) {
      setOrganization(result.organization);
      localStorage.setItem("token", result.token);
      setIsSuccess(true)
    }
    else {
      setError('Некорректные данные')
      setIsSuccess(false)
    }
  };

  return (
    <div>
      {loading ?
        <Loader marginLeft={"42vw"} /> :
        <div className={styles.page}>
          <LeftPanel active={"Profile"} />
          <div className={styles.main}>
            <Sheet width={mainWidth} height={"auto"} padding={"7px 5px"}>
              <div className={styles.nav}>
                <button
                  onClick={() => {
                    changePanel("self");
                  }}
                  className={[
                    styles.button,
                    selfActive ? styles.active : "",
                    styles.selfTab,
                  ].join(" ")}
                >
                  Личный профиль
                </button>
                <button
                  onClick={() => {
                    changePanel("org");
                  }}
                  className={[styles.button, organActive ? styles.active : ""].join(
                    " "
                  )}
                >
                  Профиль организатора занятий
                </button>
              </div>
              {showPanel == "self" ? (
                <div className={styles.form}>
                  <div>
                    Данные доступны только администрации сервиса для связи с вами.
                  </div>
                  <div className={styles.error} style={error != '' ? { display: 'block' } : { display: 'none' }}>
                    {error}
                  </div>
                  <div className={styles.success} style={isSuccess ? { display: 'block' } : { display: 'none' }}>
                    Данные обновлены!
                  </div>
                  <div>
                    <div>
                      Имя<sup>*</sup>
                    </div>
                    <input
                      key={"name"}
                      type={"text"}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      placeholder={"Введите имя"}
                      maxLength={100}
                      minLength={1}
                    ></input>
                  </div>
                  <div>
                    <div>
                      Фамилия<sup>*</sup>
                    </div>
                    <input
                      type={"text"}
                      value={surname}
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      placeholder={"Введите фамилию"}
                      maxLength={100}
                      minLength={1}
                    ></input>
                  </div>
                  <div>
                    <div>
                      Email<sup>*</sup>
                    </div>
                    <input
                      type={"email"}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder={"petr@example.com"}
                    ></input>
                  </div>
                  <div>
                    <div>Адрес</div>
                    <input
                      type={"text"}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      maxLength={200}
                    ></input>
                  </div>
                  <div>
                    <div>Телефон</div>
                    <input
                      type={"text"}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      placeholder={"+375441234567"}
                    ></input>
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={saveUser}>Сохранить</button>
                  </div>
                </div>
              ) : (
                <div className={styles.form}>
                  <div>
                    <div className={styles.error} style={error != '' ? { display: 'block' } : { display: 'none' }}>
                      {error}
                    </div>
                    <div className={styles.success} style={isSuccess ? { display: 'block' } : { display: 'none' }}>
                      Данные обновлены!
                    </div>
                    <div>
                      Организатор<sup>*</sup>
                    </div>
                    <input
                      type={"text"}
                      value={orgName}
                      onChange={(e) => {
                        setOrgName(e.target.value);
                      }}
                      placeholder={
                        "Название организации или фамилия, имя организатора"
                      }
                      maxLength={100}
                      minLength={1}
                    ></input>
                  </div>
                  <div>
                    <div>Об организаторе</div>
                    <textarea
                      value={orgInfo}
                      onChange={(e) => {
                        setOrgInfo(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div>
                    <div>
                      Email<sup>*</sup>
                    </div>
                    <input
                      type={"email"}
                      value={orgEmail}
                      onChange={(e) => {
                        setOrgEmail(e.target.value);
                      }}
                      placeholder={"petr@example.com"}
                    ></input>
                  </div>
                  <div>
                    <div>
                      Город<sup>*</sup>
                    </div>
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      {citiesSelect}
                    </select>
                  </div>
                  <div>
                    <div>
                      Адрес<sup>*</sup>
                    </div>
                    <input
                      type={"text"}
                      value={orgAddress}
                      onChange={(e) => {
                        setOrgAddress(e.target.value);
                      }}
                      maxLength={200}
                      minLength={1}
                    ></input>
                  </div>
                  <div>
                    <div>Контакт</div>
                    <input
                      type={"text"}
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                      }}
                      placeholder={"Контактное лицо для связи или приемная"}
                      maxLength={200}
                    ></input>
                  </div>
                  <div>
                    <div>Телефоны</div>
                    <textarea
                      value={orgPhones}
                      onChange={(e) => {
                        setOrgPhones(e.target.value);
                      }}
                      placeholder={"+375441234567"}
                    ></textarea>
                  </div>
                  <div>
                    <div>Сайты или группы</div>
                    <textarea
                      value={orgSites}
                      onChange={(e) => {
                        setOrgSites(e.target.value);
                      }}
                      placeholder={"Ссылки на сайты или группы"}
                    ></textarea>
                  </div>
                  <div>
                    <div>Картинка</div>
                    <input
                      className={styles.image}
                      type={"file"}
                      onChange={(e) => {
                        convertImage(e.target.files[0]);
                      }}
                    ></input>
                  </div>
                  <div>
                    <div></div>
                    <img
                      className={styles.preview}
                      src={orgImage}
                      style={{ display: orgImage != "" ? "initial" : "none" }}
                    ></img>
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={saveOrganization}>Сохранить</button>
                  </div>
                </div>
              )}
            </Sheet>
          </div></div>}
    </div>
  );
};

export { Profile };

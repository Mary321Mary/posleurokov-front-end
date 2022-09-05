import styles from "./Profile.module.scss";
import { useState, useEffect } from "react";
import { Sheet, LeftPanel, Loader, SuggestComponent } from "components";
import { axiosAPI } from "plugins/axios";
import store from "redux/stores";

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
      setIsSuccess(false)
      setError('')
    } else {
      setOrganActive(true);
      setSelfActive(false);
      setShowPanel("org");
      setIsSuccess(false)
      setError('')
    }
  };

  const getSizes = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setMainWidth("880px");
    } else if (innerWidth >= 700 && innerWidth <= 1024) {
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
      if (result.organizer == null) {
        getCities(-1);
      }
      else {
        getCities(result.organizer.city);
      }
    } else {
      window.location.replace("/login");
    }
  };

  const getCities = async (cityId) => {
    let result = await axiosAPI.getCities();
    setCities(result.cities);
    if (cityId == -1) {
      store.dispatch({ type: "ChangeSuggestCity", amount: result.cities[0].name });
      setCity(result.cities[0].id)
    }
    else {
      store.dispatch({ type: "ChangeSuggestCity", amount: result.cities.find(item => item.id == cityId).name });
    }
    setLoading(false)
  };

  const setUser = (user) => {
    if ((user.fio != null) & (user.fio != "")) {
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
    getSizes();

    function handleWindowResize() {
      getSizes();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const validateUser = () => {
    let isValid = true;
    let error = ''
    if (firstName == '' || surname == '') {
      error += 'Имя и фамилия должны быть заполнены!\n'
      isValid = false
    }

    if (!(email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      error += 'Email: неправильно введенная почта!\n'
      isValid = false
    }

    setError(error)
    return isValid;
  }

  const saveUser = async () => {
    let isValid = validateUser()
    if (isValid) {
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
        setError('Произошла ошибка!')
        setIsSuccess(false)
      }
    }
    else {
      setIsSuccess(false)
    }
  };

  const validateOrganization = () => {
    let isValid = true;
    let error = ''
    if (orgName == '') {
      error += 'Название: название не должно быть пустым!\n'
      isValid = false
    }
    else if (orgName.length < 3) {
      error += 'Название: название должно быть длиной от 3 до 100 символов!\n'
      isValid = false
    }

    if (!(orgEmail.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      error += 'Email: неправильно введенная почта!\n'
      isValid = false
    }

    setError(error)
    return isValid;
  }

  const saveOrganization = async () => {
    let isValid = validateOrganization()
    if (isValid) {
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
        localStorage.setItem('name', result.name)
        setIsSuccess(true)
        setError('')
      }
      else {
        console.log(result)
        setError('Произошла ошибка!')
        setIsSuccess(false)
      }
    }
    else {
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
                    <SuggestComponent value={address} handler={setAddress} className={styles.suggest} />
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
                  <div className={styles.error} style={error != '' ? { display: 'block' } : { display: 'none' }}>
                    {error}
                  </div>
                  <div className={styles.success} style={isSuccess ? { display: 'block' } : { display: 'none' }}>
                    Данные обновлены!
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={saveUser}>Сохранить</button>
                  </div>
                </div>
              ) : (
                <div className={styles.form}>
                  <div>
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
                      minLength={3}
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
                        store.dispatch({ type: "ChangeSuggestCity", amount: cities.find(item => item.id == e.target.value).name });
                      }}
                    >
                      {citiesSelect}
                    </select>
                  </div>
                  <div>
                    <div>
                      Адрес<sup>*</sup>
                    </div>
                    <SuggestComponent
                      value={orgAddress}
                      handler={setOrgAddress}
                      className={styles.suggest}
                      isCitySet={true} />
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
                    {orgImage != '' ? <button onClick={() => { setOrgImage('') }} className={styles.removeImage}>Удалить картинку</button> : <div></div>}
                  </div>
                  <div className={styles.error} style={error != '' ? { display: 'block' } : { display: 'none' }}>
                    {error}
                  </div>
                  <div className={styles.success} style={isSuccess ? { display: 'block' } : { display: 'none' }}>
                    Данные обновлены!
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

import {
  Heading,
  Input,
  Button,
  Select,
  Checkbox,
  Loader,
  SuggestComponent,
  ModalWindow,
} from "components";
import Helmet from "react-helmet";
import store from "redux/stores";

import styles from "./LessonUpdate.module.scss";
import { React, useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import { useParams } from "react-router-dom";

const LessonUpdate = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [city, setCity] = useState("Гомель");
  const [sex, setSex] = useState("Любой");
  const [isOnline, setIsOnline] = useState("Нет");
  const [startAge, setStartAge] = useState("");
  const [endAge, setEndAge] = useState("");
  const [file, setFile] = useState("");
  const [Images, setImages] = useState([]);
  const [course, setCourse] = useState(() => {
    return {
      city: "1",
      lessonCategories: [],
      name: "",
      info: "",
      startAge: null,
      endAge: null,
      sex: "",
      timetable: "",
      address: "",
      place: "",
      hasFee: false,
      additionalContactName: "",
      additionalContactEmail: "",
      additionalContactPhoneNumber: "",
      additionalContactCite: "",
      isInSummer: false,
      isInNotSummer: false,
      isOnline: false,
      isFirstFree: false,
    };
  });

  const [error, setError] = useState(() => {
    return {
      city: "",
      lessonCategories: "",
      name: "",
      info: "",
      startAge: "",
      endAge: "",
      sex: "",
      timetable: "",
      address: "",
      place: "",
      hasFee: "",
      additionalContactName: "",
      additionalContactEmail: "",
      additionalContactPhoneNumber: "",
      additionalContactCite: "",
      isInSummer: "",
      isInNotSummer: "",
      isOnline: "",
      isFirstFree: "",
      meneger: "",
    };
  });
  const [showModal, setShowModal] = useState(false);

  const getBase64 = (file, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      setError((prev) => {
        return {
          ...prev,
          Images: error,
        };
      });
    };
  };

  const changeImageRegister = (event) => {
    event.persist();
    getBase64(event.target.files[0], (result) => {
      setFile(result);
    });
  };

  const changeInputRegister = (event) => {
    event.persist();
    setCourse((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const changeSelectRegister = (event) => {
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setCourse((prev) => {
      return {
        ...prev,
        lessonCategories: value,
      };
    });
  };

  const changeAddress = (value) => {
    setCourse((prev) => {
      return {
        ...prev,
        address: value,
      };
    });
  };

  const submitUpdate = async (event) => {
    event.preventDefault();
    let valid = true;
    if (course.isOnline == false && course.address == "") {
      valid = false;
      setError((prev) => {
        return {
          ...prev,
          isOnline: "Введите адрес для не-онлайн занятия",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          isOnline: "",
        };
      });
    }

    if (valid) {
      const response = await axiosAPI.getLessonUpdate(id, {
        lesson: course,
      });
      if (response.status !== 200) {
        setError(response.data);
        setError((prev) => {
          return {
            ...prev,
            meneger: "Проверьте входные данные",
          };
        });
      } else {
        setShowModal(true);
      }
    } else {
      setError((prev) => {
        return {
          ...prev,
          isOnline: "Введите адрес для не-онлайн занятия",
        };
      });
    }
  };

  const submitDelete = async (event) => {
    event.preventDefault();
    const response = await axiosAPI.getLessonDelete(id, {
      lesson: course,
    });
    if (response.status !== 200) {
      setError(response.data);
      setError((prev) => {
        return {
          ...prev,
          meneger: "Проверьте входные данные",
        };
      });
    } else {
      window.location.assign("/cabinet/active");
    }
  };

  const backToLessons = () => {
    window.location.assign("/cabinet/active");
  };

  const submitAddPicture = async (event) => {
    event.preventDefault();
    const response = await axiosAPI.getPictureAdd(id, {
      image: file,
    });
    if (response.status !== 200) {
      setError(response.data);
    } else {
      window.location.reload();
    }
  };

  const submitDeletePicture = async (id) => {
    const response = await axiosAPI.getPictureDelete(id);
    if (response.status !== 200) {
      setError(response.data);
    } else {
      window.location.reload();
    }
  };

  const getCategories = async () => {
    setLoading(true);
    const categories = await axiosAPI.getCategoriesList();
    setCategories(categories);
  };

  const getCities = async () => {
    const result = await axiosAPI.getCities();
    setCities(result.cities);
    return result.cities;
  };

  const setCityField = (item) => {
    setCity(item);
    let value = cities.find((elem) => elem.name === item);
    store.dispatch({ type: "ChangeSuggestCity", amount: item });
    setCourse((prev) => {
      return {
        ...prev,
        city: value?.id || 1,
      };
    });
  };

  const setOnlineField = () => {
    setCourse((prev) => {
      return {
        ...prev,
        isOnline: isOnline == "Да",
      };
    });
  };

  const setStartAgeField = (value) => {
    setStartAge(value);
    if (value !== "") {
      setCourse((prev) => {
        return {
          ...prev,
          startAge: value,
        };
      });
    }
  };

  const setEndAgeField = (value) => {
    setEndAge(value);
    if (value !== "") {
      setCourse((prev) => {
        return {
          ...prev,
          endAge: value,
        };
      });
    }
  };

  const setSexField = (value) => {
    setSex(value);
    let sexText = "any";
    switch (value) {
      case "Мужской": {
        sexText = "male";
        break;
      }
      case "Женский": {
        sexText = "female";
        break;
      }
    }
    setCourse((prev) => {
      return {
        ...prev,
        sex: sexText,
      };
    });
  };

  const getLesson = async () => {
    let result = await axiosAPI.getLessonData(id);
    setCourse(result.lesson);
    setIsOnline(result.lesson.isOnline ? "Да" : "Нет");
    setImages(result.images);
    if (result.lesson.startAge !== null) {
      setStartAge(result.lesson.startAge);
    }
    if (result.lesson.endAge !== null) {
      setEndAge(result.lesson.endAge);
    }
    let citiesList = await getCities();
    let value = citiesList.find((elem) => elem.id === result.lesson.city);
    setCity(value.name);
    setLoading(false);
  };

  useEffect(() => {
    let getData = async () => {
      await getCategories();
      await getLesson();
    };
    getData();
  }, []);

  useEffect(() => {
    setOnlineField();
  }, [isOnline]);

  return (
    <section className={styles.container}>
      <Helmet title="Обновить занятие">
        <link rel="canonical" href={`/lesson/update/${id}`} />
        <meta
          name="description"
          content={`Обновить занятие ${course.name ? course.name + " " : ""
            }на сайте "Все кружки".`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      {loading ? (
        <Loader marginLeft={"40vw"} />
      ) : (
        <div>
          <Heading tag="h1" center>
            Обновить секцию
          </Heading>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              <form className={styles.form}>
                <Input
                  height="66px"
                  label="Название:"
                  required
                  name="name"
                  value={course.name}
                  onChange={changeInputRegister}
                  errorMessage={error.name}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  <label htmlFor="textarea">
                    <span>* </span>Описание:
                  </label>
                  <textarea
                    className={styles.textarea}
                    rows="20"
                    cols="40"
                    id="textarea"
                    value={course.info}
                    onChange={(value) => {
                      setCourse((prev) => {
                        return {
                          ...prev,
                          info: value.target.value,
                        };
                      });
                    }}
                  />
                </div>
                {error.info !== "" ? <span>{error.info}</span> : null}
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  <label htmlFor="categories">
                    <span>* </span>Категории:
                  </label>
                  <select
                    value={course.lessonCategories}
                    multiple
                    size="8"
                    onChange={changeSelectRegister}
                  >
                    {categories.map((category) => {
                      return (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {error.lessonCategories !== "" ? (
                  <span>{error.lessonCategories}</span>
                ) : null}
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  type="number"
                  label="Возраст от:"
                  name="startAge"
                  value={startAge}
                  onChange={(event) => {
                    setStartAgeField(event.target.value);
                  }}
                  errorMessage={error.startAge}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  type="number"
                  label="Возраст до:"
                  name="endAge"
                  value={endAge}
                  onChange={(event) => {
                    setEndAgeField(event.target.value);
                  }}
                  errorMessage={error.endAge}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  <label htmlFor="sex">Пол:</label>
                  <Select
                    border="1px solid black"
                    borderRadius="8px"
                    id="sex"
                    value={sex}
                    options={[
                      { text: "Любой", value: "Любой" },
                      { text: "Мужской", value: "Мужской" },
                      { text: "Женский", value: "Женский" },
                    ]}
                    prepend={
                      <img src="\images\Gender.png" height="25px" alt="Пол" />
                    }
                    onChange={(value) => {
                      setSexField(value);
                    }}
                  />
                </div>
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  <label htmlFor="isOnline">Онлайн:</label>
                  <Select
                    border="1px solid black"
                    borderRadius="8px"
                    width="250px"
                    id="isOnline"
                    value={isOnline}
                    options={[
                      { text: "Нет", value: "Нет" },
                      { text: "Да", value: "Да" },
                    ]}
                    onChange={(value) => {
                      setIsOnline(value);
                    }}
                  />
                </div>
                <div className={styles["gorisonlal-line"]}></div>
                {isOnline == "Нет" ? (
                  <div>
                    <div>
                      <label htmlFor="city">Город:</label>
                      <Select
                        border="1px solid black"
                        borderRadius="8px"
                        id="city"
                        value={city}
                        options={cities.map((city) => {
                          return { text: city.name, value: city.name };
                        })}
                        prepend={
                          <img
                            src="\images\Address.png"
                            height="25px"
                            alt="Пол"
                          />
                        }
                        onChange={(value) => {
                          setCityField(value);
                        }}
                      />
                    </div>
                    {error.city !== "" ? <span>{error.city}</span> : null}
                    <div className={styles["gorisonlal-line"]}></div>
                    <div>
                      <label>Адрес:</label>
                      <SuggestComponent
                        value={course.address}
                        handler={changeAddress}
                        className={styles.suggest}
                        city={cities.find((elem) => elem.name == city || elem.id == city).name}
                      />
                    </div>
                    {error.isOnline !== "" ? (
                      <span>{error.isOnline}</span>
                    ) : null}
                    <div className={styles["gorisonlal-line"]}></div>
                    <Input
                      height="66px"
                      label="Описание места/ближайшие остановки:"
                      name="place"
                      value={course.place}
                      onChange={changeInputRegister}
                      errorMessage={error.place}
                    />
                    <div className={styles["gorisonlal-line"]}></div>
                  </div>
                ) : (
                  <></>
                )}
                <Input
                  height="66px"
                  label="Расписание:"
                  name="timetable"
                  value={course.timetable}
                  onChange={changeInputRegister}
                  errorMessage={error.timetable}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  label="Имя/название доп. контакта:"
                  name="additionalContactName"
                  value={course.additionalContactName}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalContactName}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  type="email"
                  label="Email доп. контакта:"
                  name="additionalContactEmail"
                  value={course.additionalContactEmail}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalContactEmail}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  type="tel"
                  label="Номер доп. контакта (+375112223344):"
                  name="additionalContactPhoneNumber"
                  value={course.additionalContactPhoneNumber}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalContactPhoneNumber}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  label="Сайт или группа доп. контакта:"
                  name="additionalContactCite"
                  value={course.additionalContactCite}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalContactCite}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Checkbox
                  value={course.hasFee}
                  text="Платно?"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        hasFee: value,
                      };
                    });
                  }}
                ></Checkbox>
                <div className={styles["gorisonlal-line"]}></div>
                <Checkbox
                  value={course.isInSummer}
                  text="Работает летом"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        isInSummer: value,
                      };
                    });
                  }}
                ></Checkbox>
                <div className={styles["gorisonlal-line"]}></div>
                <Checkbox
                  value={course.isInNotSummer}
                  text="Работает сентябрь/май"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        isInNotSummer: value,
                      };
                    });
                  }}
                ></Checkbox>
                <div className={styles["gorisonlal-line"]}></div>
                <Checkbox
                  value={course.isFirstFree}
                  text="Первое занятие бесплатно"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        isFirstFree: value,
                      };
                    });
                  }}
                ></Checkbox>
                <div className={styles["gorisonlal-line"]}></div>
              </form>
            </div>
            <div className={styles["section-categories"]}>
              <p>Выберите файл и нажмите кнопку "Добавить картинку"</p>
              <Input
                type="file"
                label="Картинки:"
                name="Images"
                onChange={changeImageRegister}
                errorMessage={error.Images}
              />
              <Button onClick={submitAddPicture}>Добавить картинку</Button>
              <div className={styles["gorisonlal-line"]}></div>
              {Images.map((image) => {
                return (
                  <div className={styles.picture} key={image.id}>
                    <img
                      src={process.env.REACT_APP_BASE_URL + image.image}
                      width="70px"
                      alt="Картинка"
                    ></img>
                    <Button onClick={() => submitDeletePicture(image.id)}>
                      Удалить картинку
                    </Button>
                    <div className={styles["gorisonlal-line"]}></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.picture}>
            <div>
              <Button onClick={submitUpdate}>Обновить занятие</Button>
              {error.meneger !== "" ? <span>{error.meneger}</span> : null}
            </div>

            <Button onClick={submitDelete}>Удалить занятие</Button>
            <Button onClick={backToLessons}>
              Вернуться на страницу занятий
            </Button>
          </div>
        </div>
      )}
      <ModalWindow
        show={showModal}
        handler={() => {
          setShowModal(false);
          window.location.assign("/cabinet/active");
        }}
      >
        <div style={{ margin: "10px" }}>
          <div>
            Занятие отправлено на модерацию и будет опубликовано в ближайшее
            время
          </div>
          <Button
            onClick={() => {
              setShowModal(false);
              window.location.assign("/cabinet/active");
            }}
            margin="10px 0"
            float="right"
          >
            Закрыть
          </Button>
        </div>
      </ModalWindow>
    </section>
  );
};

export { LessonUpdate };

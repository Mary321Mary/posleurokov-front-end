import {
  Heading,
  Input,
  Button,
  Select,
  Checkbox,
  Loader,
  SuggestComponent,
  ModalWindow,
  Link,
} from "components";
import Helmet from "react-helmet";
import store from "redux/stores";

import styles from "./LessonCreate.module.scss";
import { React, useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const LessonCreate = () => {
  const [categories, setCategories] = useState([]);
  const [lessonCategory, setLessonCategory] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [city, setCity] = useState("Гомель");
  const [sex, setSex] = useState("Любой");
  const [startAge, setStartAge] = useState("");
  const [isOnline, setIsOnline] = useState("Нет");
  const [endAge, setEndAge] = useState("");
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
      agreement: false,
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
      hasReception: "",
      isInSummer: "",
      isInNotSummer: "",
      isOnline: "",
      isFirstFree: "",
      Images: "",
      meneger: "",
      agreement: "",
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
  const changeInputRegister = (event) => {
    event.persist();
    setCourse((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
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

  const changeImageRegister = (event) => {
    event.persist();
    getBase64(event.target.files[0], (result) => {
      setImages([...Images, result]);
    });
  };

  const submitChackin = async (event) => {
    event.preventDefault();
    let valid = true;
    if (course.lessonCategories.length === 0) {
      valid = false;
      setError((prev) => {
        return {
          ...prev,
          lessonCategories: "Выберите категорию",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          lessonCategories: "",
        };
      });
    }
    if (course.name === "") {
      valid = false;
      setError((prev) => {
        return {
          ...prev,
          name: "Введите название",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          name: "",
        };
      });
    }

    if (course.isOnline === false && course.address == "") {
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
    if (course.info === "") {
      valid = false;
      setError((prev) => {
        return {
          ...prev,
          info: "Введите описание",
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          info: "",
        };
      });
    }
    if (valid) {
      const response = await axiosAPI.getLessonCreate({
        lesson: course,
        images: Images,
      });
      if (response.status !== 200) {
        setError((prev) => {
          return {
            ...prev,
            meneger:
              "Проверьте входные данные и убедитесь, что создана организация",
          };
        });
      } else {
        setShowModal(true);
      }
    } else {
      setError((prev) => {
        return {
          ...prev,
          meneger:
            "Проверьте входные данные и убедитесь, что создана организация",
        };
      });
    }
  };

  const getCategories = async () => {
    const categories = await axiosAPI.getCategoriesList();
    setCategories(categories);
    setLoading(false);
  };

  const getCities = async () => {
    setLoading(true);
    const result = await axiosAPI.getCities();
    setCities(result.cities || []);
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

  const setAgeField = () => {
    if (startAge !== "") {
      setCourse((prev) => {
        return {
          ...prev,
          startAge: startAge,
        };
      });
    }
    if (endAge !== "") {
      setCourse((prev) => {
        return {
          ...prev,
          endAge: endAge,
        };
      });
    }
  };

  const setSexField = () => {
    let sexText = "any";
    switch (sex) {
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

  useEffect(() => {
    getCities();
    getCategories();
  }, []);

  useEffect(() => {
    setAgeField();
    setSexField();
    setOnlineField();
  }, [startAge, endAge, sex, isOnline]);

  return (
    <section className={styles.container}>
      <Helmet title="Добавить занятие">
        <link rel="canonical" href="/lesson/create" />
        <meta
          name="description"
          content='Форма добавления занятия, кружка или секции на сайт "Все кружки".'
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      {loading ? (
        <Loader marginLeft={"42vw"} />
      ) : (
        <div>
          <Heading tag="h1" center>
            Добавить занятие
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
                <label htmlFor="categories">
                  <span>* </span>Категории:
                </label>
                <div style={{ textAlign: "right" }}>
                  {lessonCategory.map((category) => {
                    return (
                      <div key={category} style={{ margin: "5px 0" }}>
                        {category}
                        <span
                          onClick={() => {
                            setLessonCategory(
                              lessonCategory.filter((elem) => {
                                return elem !== category;
                              })
                            );
                            setCourse((prev) => {
                              let value = categories.find(
                                (elem) => elem.name === category
                              );
                              return {
                                ...prev,
                                lessonCategories:
                                  course.lessonCategories.filter((elem) => {
                                    return elem !== value.id;
                                  }),
                              };
                            });
                          }}
                          style={{ marginLeft: "5px", cursor: "pointer" }}
                        >
                          Убрать
                        </span>
                      </div>
                    );
                  })}
                  <input
                    id="input-id"
                    type="text"
                    list="categories"
                    style={{ width: "400px", height: "30px" }}
                    onChange={() => {
                      let inputValue =
                        document.getElementById("input-id").value;
                      let value = categories.find(
                        (elem) => elem.name === inputValue
                      );
                      let valueLessonCategory = lessonCategory.find(
                        (elem) => elem === inputValue
                      );
                      if (
                        value !== undefined &&
                        valueLessonCategory === undefined
                      ) {
                        setLessonCategory([...lessonCategory, inputValue]);
                        setCourse((prev) => {
                          let value = categories.find(
                            (elem) => elem.name === inputValue
                          );
                          return {
                            ...prev,
                            lessonCategories: [
                              ...course.lessonCategories,
                              value.id,
                            ],
                          };
                        });
                      }
                    }}
                  />
                  <datalist id="categories">
                    {categories.map((category) => {
                      return <option key={category.id}>{category.name}</option>;
                    })}
                  </datalist>
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
                    setStartAge(event.target.value);
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
                    setEndAge(event.target.value);
                  }}
                  errorMessage={error.endAge}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  <label htmlFor="sex">Пол:</label>
                  <Select
                    border="1px solid black"
                    borderRadius="8px"
                    width="250px"
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
                      setSex(value);
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
                        width="250px"
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
                        isCitySet={true}
                        isNotExact={false}
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
                <Input
                  type="file"
                  multiple
                  label="Картинки:"
                  name="Images"
                  onChange={changeImageRegister}
                  errorMessage={error.Images}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <label>
                  <span>* </span>Условия:
                </label>
                <Checkbox
                  value={course.agreement}
                  text={[
                    "Ознакомлен и согласен с ",
                    <Link path="/terms" color="#6d80d8" target="_blank">
                      условиями использования
                    </Link>,
                  ]}
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        agreement: value,
                      };
                    });
                  }}
                ></Checkbox>
                <div className={styles["gorisonlal-line"]}></div>
                <div>
                  {course.agreement !== false && (
                    <Button onClick={submitChackin}>Добавить занятие</Button>
                  )}
                </div>
                {error.meneger !== "" ? <span>{error.meneger}</span> : null}
              </form>
            </div>
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

export { LessonCreate };

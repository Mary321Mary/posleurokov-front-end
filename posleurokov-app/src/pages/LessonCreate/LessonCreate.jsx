import { Heading, Input, Button, Select, Checkbox, Loader } from "components";
import Helmet from "react-helmet";

import styles from "./LessonCreate.module.scss";
import { React, useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const LessonCreate = () => {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("Гомель");
  const [sex, setSex] = useState("Любой");
  const [startAge, setStartAge] = useState("");
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
      price: "",
      additionalPriceInfo: "",
      additionalContactName: "",
      additionalContactEmail: "",
      additionalContactPhoneNumber: "",
      additionalContactCite: "",
      hasReception: false,
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
      price: "",
      additionalPriceInfo: "",
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
    };
  });

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

  const changeImageRegister = (event) => {
    event.persist();
    getBase64(event.target.files[0], (result) => {
      setImages([...Images, result]);
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

  const submitChackin = async (event) => {
    event.preventDefault();
    const response = await axiosAPI.getLessonCreate({
      lesson: course,
      images: Images,
    });
    if (response.status !== 200) {
      setError(response.data);
      setError((prev) => {
        return {
          ...prev,
          meneger:
            "Проверьте входные данные и убедитесь, что создана организация",
        };
      });
    } else {
      window.location.assign("/");
    }
  };

  const getCategories = async () => {
    const categories = await axiosAPI.getCategoriesList();
    setCategories(categories);
  };

  const getCities = async () => {
    setLoading(true);
    const result = await axiosAPI.getCities();
    setCities(result.cities || []);
  };

  const setCityField = (item) => {
    setCity(item);
    let value = cities.find((elem) => elem.name === item);
    setCourse((prev) => {
      return {
        ...prev,
        city: value?.id || 1,
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

    setLoading(false);
  };

  useEffect(() => {
    getCities();
    getCategories();
    setAgeField();
    setSexField();
  }, [city, startAge, endAge, sex]);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Helmet title="Создать секцию" />
          <Heading tag="h1" center>
            Создать секцию
          </Heading>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              <form className={styles.form}>
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
                      <img src="\images\Address.png" height="25px" alt="Пол" />
                    }
                    onChange={(value) => {
                      setCityField(value);
                    }}
                  />
                </div>
                {error.city !== "" ? <span>{error.city}</span> : null}
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
                  label="Адрес:"
                  name="address"
                  value={course.address}
                  onChange={changeInputRegister}
                  errorMessage={error.address}
                />
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
                <Input
                  height="66px"
                  type="number"
                  step="0.01"
                  label="Цена:"
                  name="price"
                  value={course.price}
                  onChange={changeInputRegister}
                  errorMessage={error.price}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Input
                  height="66px"
                  label="Пояснение к цене (за 1 месяц и т.д.):"
                  name="additionalPriceInfo"
                  value={course.additionalPriceInfo}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalPriceInfo}
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
                  label="Сайт или группа доп. контака:"
                  name="additionalContactCite"
                  value={course.additionalContactCite}
                  onChange={changeInputRegister}
                  errorMessage={error.additionalContactCite}
                />
                <div className={styles["gorisonlal-line"]}></div>
                <Checkbox
                  value={course.hasReception}
                  text="Есть свободные места"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        hasReception: value,
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
                  value={course.isOnline}
                  text="Онлайн"
                  onChange={(value) => {
                    setCourse((prev) => {
                      return {
                        ...prev,
                        isOnline: value,
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
                <Button onClick={submitChackin}>Создать секцию</Button>
                {error.meneger !== "" ? <span>{error.meneger}</span> : null}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { LessonCreate };

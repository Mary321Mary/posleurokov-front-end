import React, { useState, useEffect } from "react";
import styles from "./FilterCatalogue.module.scss";
import {
  Select,
  Link,
  Button,
  Input,
  ListFilter,
  Sheet,
  SuggestComponent,
} from "components";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";
import store from "redux/stores";
import search from "assets/icons/search.svg";
import galochka from "assets/img/galochka.png";
import galochkaRaskruta from "assets/img/galochkaRaskruta.png";

function FilterCatalogue() {
  const setAgeField = (ages) => {
    let res = [];
    for (let i = 0; i < ages.length; i++) {
      switch (ages[i]) {
        case "1 год ":
          res.push("1 год ");
          break;
        case "2":
          res.push("2 года ");
          break;
        case "3":
          res.push("3 года ");
          break;
        case "4":
          res.push("4 года ");
          break;
        case "5":
          res.push("5 лет ");
          break;
        case "6":
          res.push("6 лет ");
          break;
        case "7":
          res.push("7 лет ");
          break;
        case "8":
          res.push("8 лет ");
          break;
        case "9":
          res.push("9 лет ");
          break;
        case "10":
          res.push("10 лет ");
          break;
        case "11":
          res.push("11 лет ");
          break;
        case "12":
          res.push("12 лет ");
          break;
        case "13":
          res.push("13 лет ");
          break;
        case "14":
          res.push("14 лет ");
          break;
        case "15":
          res.push("15 лет ");
          break;
        case "16":
          res.push("16 лет ");
          break;
        case "17":
          res.push("17 лет ");
          break;
        case "18":
          res.push("18 лет ");
          break;
        case "bigger":
          res.push("Старше 18 ");
          break;
      }
    }
    return res;
  };

  const city = useSelector((state) => state.city);
  const category = useSelector((state) => state.params.category);

  const [res, setCountCategories] = useState(null);
  const [baseCategories, setBaseCategories] = useState([]);
  const [fields, setFields] = useState(() => {
    return {
      gender:
        store.getState().params.sex === "any"
          ? ["female", "male"]
          : [store.getState().params.sex],
      age: setAgeField(store.getState().params.age),
      address: store.getState().params.addr,
      name: store.getState().params.name,
      other: [
        store.getState().params.isInSummer === true ? "isInSummer" : "",
        store.getState().params.inNotSummer === true ? "inNotSummer" : "",
        store.getState().params.hasReception === true ? "hasReception" : "",
      ],
    };
  });
  const [img, setImg] = useState(galochkaRaskruta);

  const showCategory = () => {
    const categories = document.getElementById("categories");
    if (categories.style.display === "none") {
      setImg(galochkaRaskruta);
      categories.style.display = "block";
    } else {
      setImg(galochka);
      categories.style.display = "none";
    }
  };

  const setCategory = (event) => {
    store.dispatch({ type: "SetCategory", amount: event });
  };

  const setParams = () => {
    let sex = "any";
    if (fields.gender.length === 1) {
      sex = fields.gender[0];
    }
    store.dispatch({ type: "ChangeName", amount: fields.name });
    store.dispatch({ type: "ChangeGender", amount: sex });

    let res = [];
    for (let i = 0; i < fields.age.length; i++) {
      switch (fields.age[i]) {
        case "1 год ":
          res.push("1");
          break;
        case "2 года ":
          res.push("2");
          break;
        case "3 года ":
          res.push("3");
          break;
        case "4 года ":
          res.push("4");
          break;
        case "5 лет ":
          res.push("5");
          break;
        case "6 лет ":
          res.push("6");
          break;
        case "7 лет ":
          res.push("7");
          break;
        case "8 лет ":
          res.push("8");
          break;
        case "9 лет ":
          res.push("9");
          break;
        case "10 лет ":
          res.push("10");
          break;
        case "11 лет ":
          res.push("11");
          break;
        case "12 лет ":
          res.push("12");
          break;
        case "13 лет ":
          res.push("13");
          break;
        case "14 лет ":
          res.push("14");
          break;
        case "15 лет ":
          res.push("15");
          break;
        case "16 лет ":
          res.push("16");
          break;
        case "17 лет ":
          res.push("17");
          break;
        case "18 лет ":
          res.push("18");
          break;
        case "Старше 18 ":
          res.push("bigger");
          break;
      }
    }
    store.dispatch({ type: "ChangeAge", amount: res });
    store.dispatch({ type: "ChangeAddress", amount: fields.address });

    let isInSummer = "";
    let inNotSummer = "";
    let hasReception = "";
    for (let i = 0; i < fields.other.length; i++) {
      switch (fields.other[i]) {
        case "isInSummer":
          isInSummer = true;
          break;
        case "inNotSummer":
          inNotSummer = true;
          break;
        case "hasReception":
          hasReception = true;
          break;
      }
    }
    store.dispatch({
      type: "ChangeOther",
      isInSummer: isInSummer,
      inNotSummer: inNotSummer,
      hasReception: hasReception,
    });
  };

  const getCountCategories = async () => {
    if (category !== "all") {
      const result = await axiosAPI.getCountCategories(
        city,
        encodeURI(category)
      );
      setCountCategories(result);
      const resultBase = await axiosAPI.getCategories(city);
      setBaseCategories(resultBase);
    } else {
      const result = await axiosAPI.getCategories(city);
      setCountCategories(result);
    }
  };

  const changeAddress = (value) => {
    setFields((prev) => {
      return {
        ...prev,
        address: value,
      };
    });
  };

  useEffect(() => {
    getCountCategories();
  }, [city]);

  return (
    <Sheet padding="21px 31px 27px 30px" className={styles["filter-wrapper"]}>
      <section className={styles.filter}>
        <div className={styles.label}>ЗАНЯТИЕ</div>

        <Input
          marginLeft="10px"
          height="40px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          type="text"
          width="195px"
          placeholder="Название занятия"
          value={fields.name}
          padding="0px 22px"
          onChange={(event) => {
            setFields((prev) => {
              return {
                ...prev,
                name: event.target.value,
              };
            });
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              setParams();
            }
          }}
        />

        <div className={styles.label}>ПОЛ</div>

        <Select
          margin="10px"
          height="40px"
          padding="0px 22px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          placeholder="Пол"
          width="150px"
          value={fields.gender}
          options={[
            { text: "м", value: "male" },
            { text: "ж", value: "female" },
          ]}
          checkbox
          prepend={<img src="\images\Arrow.png" height="15px" alt="Стрелка" />}
          onChange={(value) => {
            setFields((prev) => {
              return {
                ...prev,
                gender: value,
              };
            });
          }}
        />
        <div className={styles.label}>ВОЗРАСТ</div>
        <Select
          margin="10px"
          height="40px"
          padding="0px 22px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          placeholder="Любой"
          width="150px"
          value={fields.age}
          options={[
            { text: "1 год", value: "1 год " },
            { text: "2 года", value: "2 года " },
            { text: "3 года", value: "3 года " },
            { text: "4 года", value: "4 года " },
            { text: "5 лет", value: "5 лет " },
            { text: "6 лет", value: "6 лет " },
            { text: "7 лет", value: "7 лет " },
            { text: "8 лет", value: "8 лет " },
            { text: "9 лет", value: "9 лет " },
            { text: "10 лет", value: "10 лет " },
            { text: "11 лет", value: "11 лет " },
            { text: "12 лет", value: "12 лет " },
            { text: "13 лет", value: "13 лет " },
            { text: "14 лет", value: "14 лет " },
            { text: "15 лет", value: "15 лет " },
            { text: "16 лет", value: "16 лет " },
            { text: "17 лет", value: "17 лет " },
            { text: "18 лет", value: "18 лет " },
            { text: "Старше 18", value: "Старше 18 " },
          ]}
          checkbox
          showValue
          prepend={<img src="\images\Arrow.png" height="15px" alt="Стрелка" />}
          onChange={(value) => {
            setFields((prev) => {
              return {
                ...prev,
                age: value,
              };
            });
          }}
        />

        <div className={styles.label}>АДРЕС</div>
        <SuggestComponent
          value={fields.address}
          handler={changeAddress}
          className={styles.suggest}
          placeholder="Название улицы"
          isCitySet={true}
        />

        {res !== null ? (
          category !== "all" ? (
            <div>
              <div className={styles.label} onClick={() => showCategory()}>
                КАТЕГОРИИ
                <img
                  src={img}
                  className={`${
                    img === galochka
                      ? styles["galochka"]
                      : styles["galochkaRaskruta"]
                  }`}
                  alt="Галочка"
                />
              </div>
              <div id="categories" className={styles.categories}>
                {baseCategories.map((category) => {
                  return (
                    <div
                      style={{ margin: "10px" }}
                      key={category.baseCategory.name}
                    >
                      <Link
                        path={`/catalogue/${city}/${category.baseCategory.name}`}
                        className={`${styles.nameCategory}`}
                        onClick={() => setCategory(category.baseCategory.name)}
                      >
                        {category.baseCategory.name} ({category.count})
                      </Link>
                    </div>
                  );
                })}
              </div>

              <Link
                path={`/catalogue/${city}/${res.baseCategory}`}
                className={`${styles.nameCategory} ${
                  category === res.baseCategory ? styles["active"] : ""
                }`}
                onClick={() => setCategory(res.baseCategory)}
              >
                {res.baseCategory}
              </Link>
              <div className={styles.podCategory}>
                {Array.isArray(res.concreteCategories)
                  ? res.concreteCategories.map((key) => {
                      return (
                        <div style={{ margin: "10px" }} key={key.name}>
                          <Link
                            path={`/catalogue/${city}/${key.name}`}
                            className={`${
                              category === key.name ? styles["active"] : ""
                            }`}
                            fontFamily="Roboto-Regular"
                            fontWeight="400"
                            fontSize="13px"
                            lineHeight="15px"
                            color="#5F6060"
                            onClick={() => setCategory(key.name)}
                          >
                            {key.name} ({key.count})
                          </Link>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : (
            res.map((category) => {
              return (
                <div
                  style={{ margin: "10px" }}
                  key={category.baseCategory.name}
                >
                  <Link
                    path={`/catalogue/${city}/${category.baseCategory.name}`}
                    className={`${styles.nameCategory}`}
                    onClick={() => setCategory(category.baseCategory.name)}
                  >
                    {category.baseCategory.name} ({category.count})
                  </Link>
                </div>
              );
            })
          )
        ) : (
          <div> Loading </div>
        )}
        <ListFilter
          placeholder="Другое"
          value={fields.other}
          options={[
            { text: "Работает сент-май", value: "inNotSummer" },
            { text: "Работает летом", value: "isInSummer" },
            { text: "Есть свободные места", value: "hasReception" },
          ]}
          checkbox
          onChange={(value) => {
            setFields((prev) => {
              return {
                ...prev,
                other: value,
              };
            });
          }}
        />
      </section>
      <section>
        <Link path={`/catalogue/${city}/${category}`}>
          <Button
            width="239px"
            margin="0 auto"
            background="linear-gradient(90deg, #FBA405 -5.91%, #FDC21E 115.61%)"
            onClick={setParams}
          >
            <img
              style={{ marginRight: "8px" }}
              src={search}
              height="20px"
              alt="Подобрать"
            />
            Подобрать
          </Button>
        </Link>
      </section>
    </Sheet>
  );
}

export { FilterCatalogue };

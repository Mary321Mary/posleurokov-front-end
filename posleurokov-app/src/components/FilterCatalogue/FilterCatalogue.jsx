import React, { useState, useEffect } from "react";
import styles from "./FilterCatalogue.module.scss";
import { Select, Link, Button, Input, ListFilter } from "components";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";
import store from "redux/stores";
import search from "assets/icons/search.svg";

function FilterCatalogue() {
  const city = useSelector((state) => state.city);
  const category = useSelector((state) => state.params.category);

  const [res, setCountCategories] = useState(null);
  const [fields, setFields] = useState(() => {
    return {
      gender:
        store.getState().params.sex === "any"
          ? ["female", "male"]
          : [store.getState().params.sex],
      age: store.getState().params.age,
      address: store.getState().params.addr,
      other: [
        store.getState().params.isInSummer === true ? "isInSummer" : "",
        store.getState().params.inNotSummer === true ? "inNotSummer" : "",
        store.getState().params.hasReception === true ? "hasReception" : "",
      ],
    };
  });

  const setCategory = (event) => {
    store.dispatch({ type: "SetCategory", amount: event });
  };

  const setParams = () => {
    let sex = "any";
    if (fields.gender.length === 1) {
      sex = fields.gender[0];
    }
    store.dispatch({ type: "ChangeGender", amount: sex });
    store.dispatch({ type: "ChangeAge", amount: fields.age });
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
    } else {
      const result = await axiosAPI.getCategories(city);
      setCountCategories(result);
    }
  };

  useEffect(() => {
    getCountCategories();
  }, [city]);

  return (
    <section className={styles["filter-wrapper"]}>
      <section className={styles.filter}>
        <div className={styles.label}>ПОЛ</div>

        <Select
          margin="10px"
          height="40px"
          padding="0px 22px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          placeholder="Пол"
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
          placeholder="Возраст"
          value={fields.age}
          options={[
            { text: "1 год", value: "1" },
            { text: "2 года", value: "2" },
            { text: "3 года", value: "3" },
            { text: "4 года", value: "4" },
            { text: "5 лет", value: "5" },
            { text: "6 лет", value: "6" },
            { text: "7 лет", value: "7" },
            { text: "8 лет", value: "8" },
            { text: "9 лет", value: "9" },
            { text: "10 лет", value: "10" },
            { text: "11 лет", value: "11" },
            { text: "12 лет", value: "12" },
            { text: "13 лет", value: "13" },
            { text: "14 лет", value: "14" },
            { text: "15 лет", value: "15" },
            { text: "16 лет", value: "16" },
            { text: "17 лет", value: "17" },
            { text: "18 лет", value: "18" },
            { text: "Старше 18", value: "bigger" },
          ]}
          checkbox
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
        <Input
          marginLeft="10px"
          height="40px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          type="text"
          width="195px"
          placeholder="Название улицы"
          value={fields.address}
          padding="0px 22px"
          onChange={(event) => {
            setFields((prev) => {
              return {
                ...prev,
                address: event.target.value,
              };
            });
          }}
        />

        {res !== null ? (
          category !== "all" ? (
            <div>
              <div className={styles.label}>КАТЕГОРИЯ</div>
              <Link
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
        <Link path="/catalogue">
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
    </section>
  );
}

export { FilterCatalogue };
import React, { useState, useEffect } from "react";
import styles from "./FilterCatalogue.module.scss";
import { Select, Link } from "components";
import { Input } from "components/shared";
import { ListFilter } from "components/ListFilter/ListFilter";
import { axiosAPI } from "plugins/axios";
import { useSelector } from "react-redux";
import store from "redux/stores";

function FilterCatalogue() {
  const age = useSelector((state) => state.params.age);
  const gender = useSelector((state) =>
    state.params.sex === "any" ? ["female", "male"] : [state.params.sex]
  );
  const address = useSelector((state) => state.params.addr);
  const city = useSelector((state) => state.city);

  const other = useSelector((state) => [
    state.params.isInSummer === true ? "isInSummer" : "",
    state.params.inNotSummer === true ? "inNotSummer" : "",
    state.params.hasReception === true ? "hasReception" : "",
  ]);

  const setGender = (value) => {
    let sex = "any";
    if (value.length === 1) {
      sex = value[0];
    }
    store.dispatch({ type: "ChangeGender", amount: sex });
  };

  const setAge = (value) => {
    store.dispatch({ type: "ChangeAge", amount: value });
  };

  const setAddress = (value) => {
    store.dispatch({ type: "ChangeAddress", amount: value });
  };
  const SetCategory = (event) => {
    store.dispatch({ type: "SetCategory", amount: event });
  };

  const setOther = (value) => {
    let isInSummer = "";
    let inNotSummer = "";
    let hasReception = "";
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
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

  const category = useSelector((state) => state.params.category);

  const [res, setCountCategories] = useState(null);

  useEffect(() => {
    getCountCategories();
  }, [city]);

  const getCountCategories = async () => {
    if (category !== "all") {
      const result = await axiosAPI.getCountCategories(
        city,
        encodeURI(category)
      );
      setCountCategories(result);
    } else {
      const result = await axiosAPI.getCategories(city);
      console.log(result);
      setCountCategories(result);
    }
  };

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
          placeholder="Любой"
          value={gender}
          options={[
            { text: "м", value: "male" },
            { text: "ж", value: "female" },
          ]}
          checkbox
          prepend={<img src="\images\Arrow.png" height="15px" alt="Стрелка" />}
          onChange={(value) => setGender(value)}
        />
        <div className={styles.label}>ВОЗРАСТ</div>
        <Select
          margin="10px"
          height="40px"
          padding="0px 22px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          placeholder="Любой"
          value={age}
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
          onChange={(value) => setAge(value)}
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
          value={address}
          padding="0px 22px"
          onChange={(e) => setAddress(e.target.value)}
        />

        {res !== null ? (
          category !== "all" ? (
            <div>
              <div className={styles.label}>КАТЕГОРИЯ</div>
              <Link
                className={`${styles.nameCategory} ${
                  category === res.baseCategory ? styles["active"] : ""
                }`}
                onClick={() => SetCategory(res.baseCategory)}
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
                            onClick={() => SetCategory(key.name)}
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
                    onClick={() => SetCategory(category.baseCategory.name)}
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
          value={other}
          options={[
            { text: "Работает сент-май", value: "inNotSummer" },
            { text: "Работает летом", value: "isInSummer" },
            { text: "Есть свободные места", value: "hasReception" },
          ]}
          checkbox
          onChange={(value) => setOther(value)}
        />
      </section>
    </section>
  );
}

export { FilterCatalogue };

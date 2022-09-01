import React, { useState, useEffect } from "react";
import styles from "./Filter.module.scss";
import { Select, Button, Link, Input, SuggestComponent } from "components";
import search from "assets/icons/search.svg";
import store from "redux/stores";
import { useSelector } from "react-redux";
import { axiosAPI } from "plugins/axios";

function Filter() {
  const city = useSelector((state) => state.city);

  const [result, setResult] = useState([]);

  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [cost, setCost] = useState([]);
  const [addr, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [other, setOther] = useState([]);
  const [name, setName] = useState("");


  const AddCategory = { type: "SetCategory", amount: category };

  const getCategories = async () => {
    const categories = await axiosAPI.getCategories(city);
    setResult(categories);
  };

  useEffect(() => {
    getCategories();

    store.dispatch(AddCategory);

    let tab = "all";
    if (cost.length === 1) {
      tab = cost[0];
    }
    store.dispatch({ type: "ChangeTab", amount: tab });

    let sex = "any";
    if (gender.length === 1) {
      sex = gender[0];
    }
    let isInSummer = "";
    let inNotSummer = "";
    let hasReception = "";

    for (let i = 0; i < other.length; i++) {
      switch (other[i]) {
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
      type: "SetParamsForCatalogue",
      amount: {
        name,
        age,
        sex,
        addr,
        category,
        isInSummer,
        inNotSummer,
        hasReception,
      },
    });
    if (category === "") {
      store.dispatch({ type: "SetCategory", amount: "all" });
    }
  }, [name, age, gender, cost, addr, category, other, city]);

  return (
    <section className={styles["filter-wrapper"]}>
      <section className={styles.filter}>

        <Input
          width="175px"
          border="none"
          type="text"
          placeholder="Занятие"
          prepend={<img src="\images\Name.png" height="25px" alt="Название" />}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
          placeholder="Возраст"
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
          prepend={<img src="\images\Age.png" height="25px" alt="Возраст" />}
          zIndex="6"
          onChange={(value) => setAge(value)}
        />

        <Select
          placeholder="Стоимость"
          value={cost}
          options={[
            { text: "Платные", value: "pay" },
            { text: "Бесплатные", value: "free" },
          ]}
          checkbox
          prepend={<img src="\images\Cost.png" height="25px" alt="Стоимость" />}
          zIndex="5"
          onChange={(value) => setCost(value)}
        />
        <SuggestComponent
          className={styles.suggest}
          value={addr}
          handler={setAddress}
          width={'175'}
          border={'none'}
          placeholder={'Адрес'}
          prepend={<img src="\images\Address.png" height="25px" alt="Адрес" />}
          isCitySet={true}
        />
        <Select
          placeholder="Категории"
          value={category}
          options={
            Array.isArray(result)
              ? result.map((category) => {
                return {
                  text: category.baseCategory.name,
                  value: category.baseCategory.name,
                };
              })
              : {}
          }
          prepend={
            <img src="\images\Categories.png" height="25px" alt="Категории" />
          }
          zIndex="3"
          onChange={(value) => setCategory(value)}
        />

        <Select
          placeholder="Другое"
          value={other}
          options={[
            { text: "Работает сент-май", value: "inNotSummer" },
            { text: "Работает летом", value: "isInSummer" },
            { text: "Есть свободные места", value: "hasReception" },
          ]}
          checkbox
          prepend={<img src="\images\Other.png" height="25px" alt="Другое" />}
          zIndex="2"
          onChange={(value) => setOther(value)}
        />
      </section>
      <section className={styles["btn-section"]}>

        <Link path="/catalogue">
          <Button
            width="239px"
            margin="0 auto"
            background="linear-gradient(90deg, #FBA405 -5.91%, #FDC21E 115.61%)"
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

export { Filter };

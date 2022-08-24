import React, { useState, useEffect } from "react";
import { stringify } from "qs";
import styles from "./FilterCatalogue.module.scss";
import { Select, Button, Cities } from "components";
import { Input } from "components/shared";
import search from "assets/icons/search.svg";
import { ListFilter } from "components/ListFilter/ListFilter";
import { axiosAPI } from "plugins/axios";
import { useDispatch, connect } from "react-redux";
import store from "redux/stores";

function FilterCatalogue() {
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [cost, setCost] = useState([]);
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [other, setOther] = useState([]);
  const [cities, setCities] = useState([]);

  const handleSearch = () => {
    console.log(
      "params",
      stringify({
        gender,
        age,
        cost,
        address,
        categories,
        other,
      }),
      this.props.categories
    );
  };
  const category = store.getState().count;

  const [res, setCountCategories] = useState([]);

  useEffect(() => {
    getCountCategories();
  }, []);

  const getCountCategories = async () => {
    const result = await axiosAPI.getCountCategories(category);
    setCountCategories(result);
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
            { text: "м", value: "м" },
            { text: "ж", value: "ж" },
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
            { text: "Старше 18", value: "Старше 18" },
          ]}
          checkbox
          prepend={<img src="\images\Arrow.png" height="15px" alt="Стрелка" />}
          onChange={(value) => setAge(value)}
        />


        <div className={styles.label}>АДРЕС</div>
        <Input
          margin="10px"
          height="40px"
          padding="0px"
          borderRadius="8px"
          border="1px solid rgb(197, 197, 197)"
          type="text"
          width="150px"
          placeholder="Название улицы"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className={styles.label}>{category}</div>
        <div>{res}</div>

        <ListFilter
          placeholder="Другое"
          value={other}
          options={[
            { text: "Работает сент-май", value: "Работает сент-май" },
            { text: "Работает летом", value: "Работает летом" },
            { text: "Есть свободные места", value: "Есть свободные места" },
          ]}
          checkbox
          onChange={(value) => setOther(value)}
        />
      </section>

      <section className={styles["btn-section"]}>
        <Button
          width="239px"
          margin="0 auto"
          background="linear-gradient(90deg, #FBA405 -5.91%, #FDC21E 115.61%)"
          onClick={handleSearch}
        >
          <img
            style={{ marginRight: "8px" }}
            src={search}
            height="20px"
            alt="Подобрать"
          />
          Подобрать
        </Button>
      </section>
    </section>
  );
}

export { FilterCatalogue };

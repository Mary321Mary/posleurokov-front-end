import {
  Heading,
  Sheet,
  Categories,
  Category,
  VkBlock,
  Link,
  Cities,
  Filter,
  Additional,
  Populars,
  RandomLessons,
} from "components";

import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import store from "redux/stores";
import { useSelector } from "react-redux";

const Main = () => {
  const city = useSelector((state) => state.city);

  const [result, setResult] = useState(null);

  const getCategories = async () => {
    const categories = await axiosAPI.getCategories(city);
    setResult(categories);
  };

  const setCategory = (event) => {
    store.dispatch({ type: "SetCategory", amount: event });
  };

  useEffect(() => {
    getCategories();
  }, [city]);

  return (
    <section className={styles.container}>
      <section className={styles["section-filter"]}>
        <div className={styles["section-filter__heading"]}>
          <Heading tag="h1" center>
            Найти занятия
          </Heading>
          <Heading tag="h2" center textAlign="center" textTransform="uppercase">
            Для взрослых и детей
          </Heading>
        </div>
        <div className={styles["section-filter__filter"]}>
          <Filter />
        </div>
      </section>
      <div className={styles["section-list"]}>
        <div className={styles["section-categories"]}>
          <Sheet>
            {result !== null ? (
              Array.isArray(result) ? (
                <Categories number={result.length}>
                  {result.map((category) => {
                    return (
                      <Category
                        key={category.baseCategory.name}
                        label={category.baseCategory.name}
                        number={category.count}
                        image={category.baseCategory.icon}
                      >
                        {category.concreteCategories.map((item) => {
                          return (
                            <div key={item}>
                              <Link
                                path="/catalogue"
                                onClick={() => setCategory(item)}
                                fontFamily="Roboto-Regular"
                                fontWeight="400"
                                fontSize="14px"
                                lineHeight="36px"
                                color="#5F6060"
                              >
                                {item}
                              </Link>
                            </div>
                          );
                        })}
                      </Category>
                    );
                  })}
                </Categories>
              ) : (
                <div>{result}</div>
              )
            ) : (
              <div>Loading post...</div>
            )}
          </Sheet>
        </div>
        <div className={styles["section-categories"]}>
          <Additional price />
          <RandomLessons number="3" width="220px" />
          <Populars
            city={city}
            path="/catalogue"
            onClick={(item) => setCategory(item)}
          />
          <Cities />
          <VkBlock heigth={"auto"} width={"220px"} />
        </div>
      </div>
    </section>
  );
};

export { Main };

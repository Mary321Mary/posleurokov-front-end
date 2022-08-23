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
  Loader
} from "components";

import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const Main = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false)

  const getCategories = async () => {
    setLoading(true)
    const categories = await axiosAPI.getCategories();
    setResult(categories);
    setLoading(false)
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className={styles.container}>
      {loading ? <Loader margin-left={'42vw'} /> : <div>
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
                              <Link
                                key={item}
                                path="/"
                                fontFamily="Roboto-Regular"
                                fontWeight="400"
                                fontSize="14px"
                                lineHeight="36px"
                                color="#5F6060"
                              >
                                {item}
                                <br />
                              </Link>
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
            <Populars city="Гомель" />
            <Cities />
            <VkBlock heigth={"auto"} width={"220px"} />
          </div>
        </div></div>}
    </section>
  );
};

export { Main };

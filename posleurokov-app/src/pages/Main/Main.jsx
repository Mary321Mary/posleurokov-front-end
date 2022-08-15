import {
  Heading,
  Sheet,
  Categories,
  Category,
  VkBlock,
  Link,
  Cities,
  Filter,
  RandomLessons,
  Loader
} from "components";

import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const Main = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const categories = await axiosAPI.getCategories();
    setResult(categories);
  };

  useEffect(async () => {
    setLoading(true);
    await getCategories();
    setLoading(false);
  }, []);

  return (
    <section className={styles.container}>
      {loading ? <Loader /> :
        <div><section className={styles["section-filter"]}>
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
                  typeof result !== "string" ? (
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
              <RandomLessons number="3" width="220px" />
              <Cities />
              <VkBlock heigth={"auto"} width={"220px"} />
            </div>
          </div></div>}
    </section>
  );
};

export { Main };

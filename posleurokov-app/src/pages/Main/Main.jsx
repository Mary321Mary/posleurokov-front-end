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
} from "components";
import randomLesson from "assets/img/randomLesson.png";

import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";

const Main = () => {
  const [result, setResult] = useState(null);
  const [randomLessons, setRandomLessons] = useState(null);

  const getCategories = async () => {
    const categories = await axiosAPI.getCategories();
    setResult(categories);
  };

  const getRandomLessons = async () => {
    const lessons = await axiosAPI.getRandomLessons();
    setRandomLessons(lessons);
  };

  useEffect(() => {
    getCategories();
    getRandomLessons();
  }, []);

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
          <Additional price />
          {randomLessons !== null ? (
            typeof randomLessons !== "string" ? (
              <Sheet padding="5.23px 17px 7px">
                {randomLessons.map((lesson) => {
                  return (
                    <div
                      key={lesson.name}
                      style={{
                        paddingTop: "10.77px",
                        paddingBottom: "10px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img src={randomLesson} alt="Занятие" width="70px" />
                      <Link
                        fontFamily="Roboto-Regular"
                        fontWeight="400"
                        fontSize="14px"
                        lineHeight="16px"
                        color="#5F6060"
                        marginLeft="12px"
                      >
                        {lesson.name}
                      </Link>
                    </div>
                  );
                })}
              </Sheet>
            ) : (
              <div>{randomLessons}</div>
            )
          ) : (
            <div>Loading post...</div>
          )}
          <Cities />
          <VkBlock heigth={"auto"} width={"220px"} />
        </div>
      </div>
    </section>
  );
};

export { Main };

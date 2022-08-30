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
  Loader,
} from "components";

import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import store from "redux/stores";
import { useSelector } from "react-redux";

const Main = () => {
  const city = useSelector((state) => state.city);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marginParams, setMarginParams] = useState({})

  const getCategories = async () => {
    setLoading(true);
    const categories = await axiosAPI.getCategories(city);
    setResult(categories);
    setLoading(false);
  };

  const setCategory = (event) => {
    store.dispatch({ type: "SetCategory", amount: event });
  };

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setMarginParams({
        'marginLeft': '10%'
      });
    } else if (innerWidth > 700 && innerWidth <= 1024) {
      setMarginParams({
        'marginLeft': '20%'
      });
    } else {
      setMarginParams({
        'marginLeft': 'auto'
      });
    }
  };

  useEffect(() => {
    getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    getCategories();
  }, [city]);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loader marginLeft={"42vw"} />
      ) : (
        <div>
          <section className={styles["section-filter"]}>
            <div className={styles["section-filter__heading"]}>
              <Heading tag="h1" center>
                Найти занятия
              </Heading>
              <Heading
                tag="h2"
                center
                textAlign="center"
                textTransform="uppercase"
              >
                Для взрослых и детей
              </Heading>
            </div>
            <div className={styles["section-filter__filter"]}>
              <Filter />
            </div>
          </section>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              <Sheet marginLeft={marginParams['marginLeft']}>
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
                onClick={(event) => setCategory(event.target.innerText)}
              />
              <Cities />
              <VkBlock heigth={"auto"} width={"220px"} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Main };

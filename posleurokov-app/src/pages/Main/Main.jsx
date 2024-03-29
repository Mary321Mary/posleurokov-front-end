import {
  Heading,
  Sheet,
  Categories,
  Category,
  ViberBlock,
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
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import galochka from "assets/img/galochka.png";

const Main = () => {
  const city = useSelector((state) => state.city);
  const { cityParam } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marginParams, setMarginParams] = useState({});

  const getCategories = async () => {
    setLoading(true);
    const categories = await axiosAPI.getCategories(city);
    setResult(categories);
    setLoading(false);
  };

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1200) {
      setMarginParams({
        marginLeft: "5%",
      });
    } else {
      setMarginParams({
        marginLeft: "auto",
      });
    }
  };

  useEffect(() => {
    let value = cityParam;
    if (value === undefined) {
      value = "all";
    }
    if (value === "Online") {
      value = "online";
    }
    store.dispatch({ type: "ChangeCity", amount: value });

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

  const setTitleCity = () => {
    if (city == "all") {
      return " по Беларуси";
    } else if (city == "online") {
      return " онлайн";
    } else {
      return " в г. " + city;
    }
  };

  return (
    <section className={styles.container}>
      <Helmet>
        <title>Кружки, секции и занятия {setTitleCity()}</title>
        <meta
          name="description"
          content={"Все кружки : Кружки, секции и занятия" + setTitleCity()}
        />
        <link rel="canonical" href="/" />
      </Helmet>
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
          <Link
            path="/catalogue/all"
            textDecoration="none"
            className={styles.lessons}
          >
            <div>Посмотреть все занятия</div>
            <img src={galochka} alt="Все занятия" />
          </Link>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              <Sheet marginLeft={marginParams["marginLeft"]}>
                {result !== null ? (
                  Array.isArray(result) ? (
                    <Categories
                      number={result.reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue.count,
                        0
                      )}
                    >
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
                                <div
                                  key={item.name}
                                  style={{ marginBottom: "10px" }}
                                >
                                  <Link
                                    path={`/catalogue/${city}/${item.name}`}
                                    fontFamily="Roboto-Regular"
                                    fontWeight="400"
                                    fontSize="14px"
                                    lineHeight="20px"
                                    color="#5F6060"
                                  >
                                    {item.name}
                                    <div className={styles.number}>
                                      {item.count}
                                    </div>
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
              <Populars />
              <Cities />
              <ViberBlock heigth={"auto"} width={"230px"} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Main };

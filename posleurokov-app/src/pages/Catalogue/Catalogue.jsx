import {
  Heading,
  Sheet,
  TabsBar,
  Pagination,
  ViberBlock,
  FilterCatalogue,
  Loader,
} from "components";
import Helmet from "react-helmet";
import styles from "./Catalogue.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosAPI } from "plugins/axios";
import { stringify } from "qs";
import { useParams } from "react-router-dom";
import store from "redux/stores";

const Catalogue = () => {
  const [courses, setCourses] = useState(null);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const tab = useSelector((state) => state.tab);
  const city = useSelector((state) => state.city);

  const name = useSelector((state) => state.params.name);
  const sex = useSelector((state) => state.params.sex);
  const age = useSelector((state) => state.params.age);
  const cost = useSelector((state) => state.params.cost);
  const addr = useSelector((state) => state.params.addr);
  const isInSummer = useSelector((state) => state.params.isInSummer);
  const inNotSummer = useSelector((state) => state.params.inNotSummer);
  const hasReception = useSelector((state) => state.params.hasReception);

  const { cityParam, categoryParam: category } = useParams();

  const getCourses = async () => {
    setLoading(true);
    const queryString = stringify(
      {
        city,
        category,
        name,
        page,
        tab,
        sex,
        age,
        cost,
        addr,
        isInSummer,
        inNotSummer,
        hasReception,
      },
      { arrayFormat: "repeat" }
    );
    const result = await axiosAPI.getCourses(`/result/?${queryString}`);
    setCourses(result);
    setLoading(false);
  };

  const openTab = (index) => {
    store.dispatch({ type: "ChangeTab", amount: index });
    setCurrentPage(1);
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
  }, []);

  useEffect(() => {
    getCourses();
  }, [
    tab,
    city,
    page,
    name,
    sex,
    age,
    addr,
    isInSummer,
    inNotSummer,
    hasReception,
  ]);

  const setTitleCity = () => {
    if (city == "all") {
      return " по Беларуси";
    } else if (city == "online") {
      return " онлайн";
    } else {
      return "в г. " + city;
    }
  };

  return (
    <section className={styles.container}>
      <Helmet>
        <title>
          {category === undefined ? "Все занятия" : category}
          {setTitleCity()}
        </title>
        <meta
          name="description"
          content={
            category === undefined
              ? "Все кружки : Каталог занятий, кружков и секций " +
              setTitleCity()
              : "Все кружки : " + category + " " + setTitleCity()
          }
        />
        <link rel="canonical" href={`/catalogue/${city}/${category}`} />
      </Helmet>
      {loading ? (
        <Loader marginLeft={"40%"} />
      ) : (
        <div>
          <Heading tag="h1">
            Каталог кружков, секций и курсов {setTitleCity()}
          </Heading>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              {courses !== null ? (
                typeof courses !== "string" ? (
                  <div>
                    <Sheet marginBottom="55px">
                      <TabsBar
                        items={courses}
                        openTab={openTab}
                        category={category}
                      />
                    </Sheet>
                    <Pagination
                      currentPage={page}
                      totalPageCount={courses.counts.countOfPages}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </div>
                ) : (
                  <div>{courses}</div>
                )
              ) : (
                <div>Loading post...</div>
              )}
            </div>
            <div className={styles["section-categories"]}>
              <FilterCatalogue category={category} />
              <ViberBlock heigth="auto" width="220px" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Catalogue };

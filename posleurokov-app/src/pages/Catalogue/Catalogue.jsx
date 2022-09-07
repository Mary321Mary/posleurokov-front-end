import {
  Heading,
  Sheet,
  TabsBar,
  Pagination,
  VkBlock,
  FilterCatalogue,
  Loader,
} from "components";
import Helmet from "react-helmet";
import styles from "./Catalogue.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosAPI } from "plugins/axios";
import { stringify } from "qs";

const Catalogue = () => {
  const [courses, setCourses] = useState(null);
  const [page, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const tab = useSelector((state) => state.tab);
  const city = useSelector((state) => state.city);

  const category = useSelector((state) => state.params.category);
  const name = useSelector((state) => state.params.name);
  const sex = useSelector((state) => state.params.sex);
  const age = useSelector((state) => state.params.age);
  const cost = useSelector((state) => state.params.cost);
  const addr = useSelector((state) => state.params.addr);
  const isInSummer = useSelector((state) => state.params.isInSummer);
  const inNotSummer = useSelector((state) => state.params.inNotSummer);
  const hasReception = useSelector((state) => state.params.hasReception);

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

  useEffect(() => {
    getCourses();
  }, [
    tab,
    city,
    page,
    category,
    name,
    sex,
    age,
    addr,
    isInSummer,
    inNotSummer,
    hasReception,
  ]);

  const setTitleCity = () => {
    if (city == 'all') {
      return ' по Беларуси'
    }
    else if (city == 'online') {
      return ' онлайн'
    }
    else {
      return 'в г. ' + city
    }
  }

  return (
    <section className={styles.container}>
      <Helmet>
        <title>
          {category == 'all' ? 'Все занятия' : category}{setTitleCity()}
        </title>
      </Helmet>
      {loading ? (
        <Loader marginLeft={"40%"} />
      ) : (
        <div>
          <Heading tag="h1">Каталог кружков, секций и курсов {setTitleCity()}</Heading>
          <div className={styles["section-list"]}>
            <div className={styles["section-categories"]}>
              {courses !== null ? (
                typeof courses !== "string" ? (
                  <div>
                    <Sheet marginBottom="55px">
                      <TabsBar items={courses} />
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
              <FilterCatalogue />
              <VkBlock heigth="auto" width="220px" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Catalogue };

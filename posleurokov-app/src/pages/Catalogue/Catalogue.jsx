import {
  Heading,
  Sheet,
  TabsBar,
  Pagination,
  VkBlock,
  FilterCatalogue,
} from "components";
import Helmet from "react-helmet";
import styles from "./Catalogue.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosAPI } from "plugins/axios";
import { stringify } from "qs";

const Catalogue = () => {
  const [courses, setCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const tab = useSelector((state) => state.tab);
  const city = useSelector((state) => state.city);

  const category = useSelector((state) => state.params.category);
  const sex = useSelector((state) => state.params.sex);
  const age = useSelector((state) => state.params.age);
  const cost = useSelector((state) => state.params.cost);
  const addr = useSelector((state) => state.params.addr);
  const isInSummer = useSelector((state) => state.params.isInSummer);
  const inNotSummer = useSelector((state) => state.params.inNotSummer);
  const hasReception = useSelector((state) => state.params.hasReception);

  const getCourses = async () => {
    setLoading(true)
    const queryString = stringify(
      {
        city,
        category,
        currentPage,
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
    setLoading(false)
  };

  useEffect(() => {
    getCourses();
  }, [
    tab,
    city,
    currentPage,
    category,
    sex,
    age,
    addr,
    isInSummer,
    inNotSummer,
    hasReception,
  ]);

  return (
    <section className={styles.container}>
      {loading ? <Loader /> : <div>
      <Helmet title="Каталог" />
      <Heading tag="h1" center>
        Каталог кружков, секций и курсов в Гомеле
      </Heading>
      <div className={styles["section-list"]}>
        <div className={styles["section-categories"]}>
          {courses !== null ? (
            typeof courses !== "string" ? (
              <div>
                <Sheet marginBottom="55px">
                  <TabsBar items={courses} />
                </Sheet>
                <Pagination
                  currentPage={currentPage}
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
          <Sheet padding="21px 31px 27px 30px">
            <FilterCatalogue />
          </Sheet>
          <VkBlock heigth="auto" width="220px" />
        </div>
      </div></div>}
    </section>
  );
};

export { Catalogue };

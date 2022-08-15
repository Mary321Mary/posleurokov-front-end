import { Heading, Sheet, Course, Pagination, VkBlock } from "components";
import Helmet from "react-helmet";

import styles from "./Catalogue.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import { stringify } from "qs";

const Catalogue = () => {
  const [courses, setCourses] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [city, setCity] = useState("online");
  const [category, setCategory] = useState("ИСКУССТВО И ДИЗАЙН");
  const [tab, setTab] = useState("all");
  const [sex, setSex] = useState("any");
  const [age, setAge] = useState("any");
  const [cost, setCost] = useState([]);
  const [addr, setAddress] = useState("");
  const [another, setOther] = useState("any");

  const getCourses = async () => {
    const queryString = stringify({
      city,
      category,
      currentPage,
      tab,
      sex,
      age,
      cost,
      addr,
      another,
    });
    const result = await axiosAPI.getCourses(`/result?${queryString}`);
    setCourses(result);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className={styles.container}>
      <Helmet title="Каталог" />
      <Heading tag="h1">Каталог кружков, секций и курсов в Гомеле</Heading>
      <div className={styles["section-list"]}>
        <div className={styles["section-categories"]}>
          {courses !== null ? (
            typeof courses !== "string" ? (
              <div>
                <Sheet marginBottom="55px">
                  <Course
                    list={courses.result}
                    online={courses.counts.online}
                  />
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
          <VkBlock heigth="auto" width="220px" />
        </div>
      </div>
    </section>
  );
};

export { Catalogue };

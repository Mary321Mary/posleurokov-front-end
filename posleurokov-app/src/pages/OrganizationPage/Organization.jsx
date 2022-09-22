import {
 Sheet,
 TabsBar,
 Pagination,
 Loader,
 RandomLessons,
 Heading
} from "components";
import { 
  VKShareButton, 
  VKIcon,
  OKShareButton,
  OKIcon,
  ViberShareButton,
  ViberIcon
} from "react-share";
import Helmet from "react-helmet";
import styles from "./Organization.module.scss";
import { useEffect, useState } from "react";
import { axiosAPI } from "plugins/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Organization = () => {
 const [organization, setOrganization] = useState(null)
 const [courses, setCourses] = useState(null);
 const [page, setCurrentPage] = useState(1);

 const [marginParams, setMarginParams] = useState({
  'padding': '25px 34px',
  'marginBottom': '46px'
 })

 const tab = useSelector((state) => state.tab);

 const { id } = useParams();

 const getInfo = async () => {
   let result = await axiosAPI.getOrganizationInfo(id);
   let lessonsAndCount = await axiosAPI.getOrganizationLessons(id, tab, page);
   setOrganization(result);
   setCourses(lessonsAndCount)
 };

 const getWindowSize = () => {
  let innerWidth = window.outerWidth;

  if (innerWidth > 1000) {
    setMarginParams({
      'padding': '25px 34px',
      'marginBottom': '46px'
    });
  } else {
    setMarginParams({
      'padding': "20px 15px",
      'marginBottom': '24px'
    });
  }
};

 useEffect(() => {
  getInfo()

  getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
 }, [])


 useEffect(() => {
  let updateData = async () => {
   let lessonsAndCount = await axiosAPI.getOrganizationLessons(id, tab, page);
   setCourses(lessonsAndCount)
  }
  updateData()
 }, [tab, page])

 return (
   <section className={styles.container}>
     <Helmet>
       <title>
        {organization !== null ? `Организация ${organization.name}` : `Организация`}
       </title>
       <meta
         name="description"
         content={
          organization !== null
             ? (`Все кружки : Основные данные и список занятий организации ${organization.name}`)
             : (`Все кружки : Основные данные и список занятий организации`)
         }
       />
       <link rel="canonical" href={`/organization/${id}`} />
     </Helmet>
     {organization === null ? (
       <Loader marginLeft={"40%"} />
     ) : (
       <div>
         <div className={styles["section-list"]}>
           <div className={styles["section-categories"]}>
           <Heading tag="h1">
              {organization.name}
            </Heading>
           <div>
              <Sheet marginBottom={marginParams['marginBottom']} padding={marginParams['padding']}>
                <div className={styles.info}>{organization.info}</div>
                <div className={styles.share}>
                  <VKShareButton title={"Поделиться в ВК"} url={window.location.href}><VKIcon size={32} round={false} borderRadius={7.5}/></VKShareButton>
                  <OKShareButton title={"Поделиться в Одноклассниках"} url={window.location.href}><OKIcon size={32} round={false} borderRadius={7.5}/></OKShareButton>
                  <ViberShareButton title={"Поделиться в Instagram"} url={window.location.href}><ViberIcon size={32} round={false} borderRadius={7.5}/></ViberShareButton>
                </div>
                <div className={styles.separator} />
                <div className={styles.additional}>
                  <div className={styles.rowInfo}>
                    <div className={styles.infoCell}><div className={styles.head}>Телефон:</div> {organization.phoneNumber}</div>
                    <div className={styles.infoCell}><div className={styles.head}>Email:</div> <a href={"mailto:" + organization.email}>{organization.email}</a></div>
                  </div>
                  <div className={styles.rowInfo}>
                    <div className={styles.infoCell}><div className={styles.head}>Адрес:</div> {organization.address}</div>
                  </div>
                </div>
              </Sheet>
            </div>
            <div className={styles.ourLess}>
              Наши предложения
            </div>
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
            <RandomLessons number="4" width={"220px"}/>
           </div>
         </div>
       </div>
     )}
   </section>
 );
};

export { Organization };
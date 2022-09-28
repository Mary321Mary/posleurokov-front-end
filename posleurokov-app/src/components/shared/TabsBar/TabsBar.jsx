import React, { useEffect } from "react";
import styles from "./TabsBar.module.scss";
import other from "assets/img/other.png";

import { TabBarNav, Course } from "components";
import { useSelector } from "react-redux";
import store from "redux/stores";

const TabsBar = ({ items, openTab, ...rest }) => {
  const tab = useSelector((state) => state.tab);

  const showAll = () => {
    const tabs = document.getElementsByName("showAll");
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].style.display === "inline") {
        tabs[i].style.display = "none";
      } else {
        tabs[i].style.display = "inline";
      }
    }
  };

  useEffect(() => {
    store.dispatch({ type: "ChangeTab", amount: tab });
  }, [tab]);

  return (
    <div style={{ ...rest }}>
      <div className={styles.tabnav}>
        <TabBarNav
          number={items.counts.free + items.counts.pay}
          isActive={"all" === tab}
          onClick={() => openTab("all")}
        >
          Все
        </TabBarNav>
        <TabBarNav
          number={items.counts.pay}
          isActive={"pay" === tab}
          onClick={() => openTab("pay")}
        >
          Платные
        </TabBarNav>
        <TabBarNav
          number={items.counts.free}
          isActive={"free" === tab}
          onClick={() => openTab("free")}
        >
          Бесплатные
        </TabBarNav>
        <div name="showAll" className={styles.tab}>
          <TabBarNav
            number={items.counts.adult}
            isActive={"adult" === tab}
            onClick={() => openTab("adult")}
          >
            Для взрослых
          </TabBarNav>
        </div>
        {/* <div name="showAll" className={styles.tab}>
          <TabBarNav
            number={-1}
            isActive={4 === tab}
            onClick={() => openTab(4)}
          >
            На карте
          </TabBarNav>
        </div> */}
        <button onClick={() => showAll()} className={styles.hide}>
          <img src={other} alt="other" />
        </button>
      </div>
      <div>
        {items.result.length !== 0 ? (
          <Course list={items.result} online={items.counts.online} />
        ) : (
          <div style={{ padding: "20px" }}>Нет занятий</div>
        )}
      </div>
    </div>
  );
};

export { TabsBar };

import React, { useState } from 'react';
import styles from './TabsBar.module.scss';
import other from 'assets/img/other.png';

import { TabBarNav, TabBarItem } from '../';

const TabsBar = ({ items, ...rest }) => {
  const [activeTab, setActiveTab] = useState(0);

  const openTab = (index) => {
    setActiveTab(index);
  };

  const showAll = () => {
    const tabs = document.getElementsByName('showAll');
    for(let i = 0; i < tabs.length; i++) {
      if (tabs[i].style.display === 'inline') {
        tabs[i].style.display = 'none';
      } else {
        tabs[i].style.display = 'inline';
      }
    }
  };

  return (
    <div style={{ ...rest }}>
      <div className={styles.tabnav}>
        <TabBarNav
          number={items.counts.free + items.counts.pay + items.counts.adult}
          isActive={0 === activeTab}
          onClick={() => openTab(0)}
        >Все</TabBarNav>
        <TabBarNav
          number={items.counts.pay}
          isActive={1 === activeTab}
          onClick={() => openTab(1)}
        >Платные</TabBarNav>
        <TabBarNav
          number={items.counts.free}
          isActive={2 === activeTab}
          onClick={() => openTab(2)}
        >Бесплатные</TabBarNav>
        <div name="showAll" className={styles.tab}>
          <TabBarNav
            number={items.counts.adult}
            isActive={3 === activeTab}
            onClick={() => openTab(3)}
          >Для взрослых</TabBarNav>
        </div>
        <div name="showAll" className={styles.tab}>
          <TabBarNav
            number={-1}
            isActive={4 === activeTab}
            onClick={() => openTab(4)}
          >На карте</TabBarNav>
        </div>
        <button onClick={() => showAll()} className={styles.hide}><img src={other} alt="other"/></button>
      </div>
      <div>
        <TabBarItem content={items.result} padding="28px"/>
      </div>
    </div>
  );
};

export { TabsBar };

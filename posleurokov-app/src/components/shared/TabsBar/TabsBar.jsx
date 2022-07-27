import React from 'react';
import { useState } from 'react';
import styles from './TabsBar.module.scss';
import logo from 'assets/img/map.png';

import { TabBarNav, TabBarItem } from '../';

const TabsBar = ({ items, ...rest }) => {
  const [activeTab, setActiveTab] = useState(0);

  const openTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div
      style={{ ...rest }}
    >
      <div className={styles.tabnav}>
        {items.map((page, i) => (
          <TabBarNav
            key={page.title}
            number={page.count}
            logo={logo}
            isActive={i === activeTab}
            onClick={() => openTab(i)}
          >{page.title}</TabBarNav>
        ))}
      </div>
      <div>
        {items[activeTab] && <TabBarItem { ...items[activeTab] } padding='28px'/>}
      </div>
    </div>
  );
};

export { TabsBar };

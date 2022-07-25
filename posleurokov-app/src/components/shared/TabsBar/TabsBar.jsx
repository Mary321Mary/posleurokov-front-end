import React from 'react';
import { useState } from 'react';
import styles from './TabsBar.module.scss';

import { TabBarNav, TabBarItem } from '../';

const TabsBar = ({ children, ...rest }) => {
  const [activeTab, setActiveTab] = useState(0);

  const openTab = e => {
    setActiveTab(+e.target.dataset.index);
  };

  return (
    <div
      style={{ ...rest }}
    >
      <div className={styles.tabnav}>
        {children.map((page, i) => (
          <TabBarNav
            key={page.title}
            onClick={openTab}
            dataIndex={i}
            activeTab={activeTab}
          >{page.title}</TabBarNav>
        ))}
      </div>
      <div>
        {children[activeTab] && <TabBarItem { ...children[activeTab] } />}
      </div>
    </div>
  );
};

export { TabsBar };

import React from 'react';
import { useState } from 'react';
import styles from './TabsBar.module.scss';
import logo from 'assets/img/map.png';
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
    <div
      style={{ ...rest }}
    >
      <div className={styles.tabnav}>
        {window.screen.width > 321 ? (
          items.map((page, i) => (
            <TabBarNav
              key={page.title}
              number={page.count}
              logo={logo}
              isActive={i === activeTab}
              onClick={() => openTab(i)}
            >{page.title}</TabBarNav>
          ))
        ) : (
          items.map((page, i) => (
            i < 3 ? (
              <TabBarNav
                key={page.title}
                number={page.count}
                logo={logo}
                isActive={i === activeTab}
                onClick={() => openTab(i)}
              >{page.title}</TabBarNav>
            ) : (
              <div key={page.title} name='showAll' style={{ display: 'none'}}>
                <TabBarNav
                  number={page.count}
                  logo={logo}
                  isActive={i === activeTab}
                  onClick={() => openTab(i)}
                >{page.title}</TabBarNav>
              </div>
            )
          ))
        )}
        <button onClick={() => showAll()} className={styles.hide}><img src={other} alt='other'/></button>
      </div>
      <div>
        {items[activeTab] && <TabBarItem { ...items[activeTab] } padding='28px'/>}
      </div>
    </div>
  );
};

export { TabsBar };

import { useState } from 'react';
import {
  Heading,
  Button,
  Link,
  Input,
  Checkbox,
  Select,
  TabsBar,
  TabBarItem
} from 'components/shared';

import styles from './ComponentsDemo.module.scss';

const ComponentsDemo = () => {
  const [isChecked, setCheck] = useState(false);
  return (
    <section className={styles.container}>
      <Heading tag="h1" center>
        Библиотека компонентов
      </Heading>
      <section className={styles.section}>
        <Heading tag="h2">Кнопки</Heading>
        <div className={styles['section-list']}>
          <Button
            onClick={() => {
              alert(1);
            }}
          >
            Добавить занятие
          </Button>
          <Button
            width="210px"
            onClick={() => {
              alert(2);
            }}
          >
            ОСТАВИТЬ МЕСТО
          </Button>
          <Link path="/" color="black">
            ГЛАВНАЯ
          </Link>
        </div>
      </section>
      <section className={styles.section}>
        <Heading tag="h2">Inputs</Heading>
        <div className={styles['section-list']}>
          <Input />
          <Checkbox
            text="Test check box"
            value={isChecked}
            onChange={(val) => setCheck(val)}
          />
          <Select />
        </div>
      </section>
      <section className={styles.section}>
        <Heading tag="h2">TabsBar</Heading>
        <div className={styles['section-list']}>
        <TabsBar>
          <TabBarItem label="Simple text">
            <p>Simple text</p>
          </TabBarItem>
        </TabsBar>
        </div>
      </section>
    </section>
  );
};

export { ComponentsDemo };

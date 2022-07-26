import { useState } from 'react';
import {
  Heading,
  Button,
  Link,
  Input,
  Checkbox,
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

        </div>
      </section>
    </section>
  );
};

export { ComponentsDemo };

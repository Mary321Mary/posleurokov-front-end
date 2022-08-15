import {
  Heading,
  Sheet,
  VkBlock,
  Loader
} from 'components';
import Helmet from 'react-helmet';
import { useState, useEffect } from 'react';

import styles from './Catalogue.module.scss';

const Catalogue = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Вставить то, что рабоает во время загрузки

    setLoading(false);
  }, [])

  return (
    <section className={styles.container}>
      {loading ? <Loader /> :
        <div>
          <Helmet title="Каталог" />
          <Heading tag='h1'>
            Каталог кружков, секций и курсов в Гомеле
          </Heading>
          <div className={styles['section-list']}>
            <div className={styles['section-categories']}>
              <Sheet>
              </Sheet>
            </div>
            <div className={styles['section-categories']}>
              <VkBlock heigth='auto' width='220px' />
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export { Catalogue };
import {
  Heading,
  Sheet,
  Online,
  VkBlock
} from 'components';
import Helmet from 'react-helmet';

import styles from './Catalogue.module.scss';

const Catalogue = () => {
  return (
    <section className={styles.container}>
      <Helmet title="Каталог" />
      <Heading tag='h1'>
        Каталог кружков, секций и курсов в Гомеле
      </Heading>
      <div className={styles['section-list']}>
        <div className={styles['section-categories']}>
          <Sheet>
            <Online number="300" />
          </Sheet>
        </div>
        <div className={styles['section-categories']}>
          <VkBlock heigth='auto' width='220px' />
        </div>
      </div>
    </section>
  );
};

export { Catalogue };
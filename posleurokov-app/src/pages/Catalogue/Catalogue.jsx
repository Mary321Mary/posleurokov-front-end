import {
  Heading,
  Sheet
} from 'components/shared';
import { VkBlock } from 'components';

import styles from './Catalogue.module.scss';

const Catalogue = () => {
  return (
    <section className={styles.container}>
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
    </section>
  );
};

export { Catalogue };
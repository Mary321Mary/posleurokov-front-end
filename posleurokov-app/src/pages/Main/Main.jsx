import {
  Heading,
  Sheet,
  Categories,
  Category
} from 'components/shared';
import { Link } from '../../components';

import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const Main = () => {
  const [result, setResult] = useState(null);

  const getCategories = async () => {
    let categories = await axiosAPI.getCategories();
    setResult(categories);
  };

  useEffect(() => {
    getCategories();
  }, [setResult]);


  return (
    <section className={styles.container}>
      <Heading
        tag="h1"
        center
        fontFamily='Roboto-Bold'
        fontStyle='normal'
        fontWeight='800'
        fontSize='46px'
        lineHeight='54px'
      >
        Найти занятия
      </Heading>
      <Heading
        tag="h1"
        center
        fontFamily='Roboto-Regular'
        fontStyle='normal'
        fontWeight='400'
        fontSize='16px'
        lineHeight='19px'
        textAlign='center'
        textTransform='uppercase'
      >
        Для взрослых и детей
      </Heading>
      <Sheet>
        {result !== null ? (
          <Categories number={result.length}>
            {
              result.map(
                function(category) {
                  return (
                    <Category label={category.baseCategoryName} number={category.concreteCategories.length}>
                      {
                        category.concreteCategories.map(
                          function(item) {
                            return (
                              <Link
                                path='/'
                                fontFamily='Roboto-Regular'
                                fontStyle='normal'
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='16px'
                                color='#5F6060'
                                display='block'
                                margin='15px'
                              >{item.name}</Link>
                            )
                          }
                        )
                      }
                    </Category>
                  )
                }
              )
            }
          </Categories>
        ) : (
          <div>Loading post...</div>
        )}
      </Sheet>
    </section>
  );
};

export { Main };
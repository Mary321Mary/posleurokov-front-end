import {
  Heading,
  Sheet,
  Categories,
  Category
} from 'components/shared';
import { Link } from '../../components';
import randomLesson from '../../assets/img/randomLesson.png';

import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const Main = () => {
  const [result, setResult] = useState(null);
  const [randomLessons, setRandomLessons] = useState(null);

  const getCategories = async () => {
    let categories = await axiosAPI.getCategories();
    setResult(categories);
  };

  const getRandomLessons = async () => {
    let lessons = await axiosAPI.getRandomLessons();
    setRandomLessons(lessons);
  };

  useEffect(() => {
    getCategories();
    getRandomLessons();
  }, [setResult, setRandomLessons]);


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
      <div className={styles['section-list']}>
        <Sheet marginRight='40px'>
          {result !== null ? (
            <Categories number={result.length}>
              {
                result.map(
                  category => {
                    return (
                      <Category
                        key={category.baseCategoryName}
                        label={category.baseCategoryName}
                        number={category.concreteCategories.length}
                      >
                        {
                          category.concreteCategories.map(
                            item => {
                              return (
                                <Link
                                  key={item.id}
                                  path='/'
                                  fontFamily='Roboto-Regular'
                                  fontStyle='normal'
                                  fontWeight='400'
                                  fontSize='14px'
                                  lineHeight='32px'
                                  color='#5F6060'
                                >{item.name}<br/></Link>
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
        <div>
          {result !== null ? (
            <Sheet padding='5.23px 17px 7px'>
              {randomLessons.map(
                lesson => {
                  return (
                    <div key={lesson.name} style={{
                      paddingTop: '10.77px',
                      paddingBottom: '10px',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                      <img src={randomLesson} alt='Занятие' width='70px'/>
                      <Link
                        fontFamily='Roboto-Regular'
                        fontStyle='normal'
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='16px'
                        color='#5F6060'
                        marginLeft='12px'
                      >{lesson.name}</Link>
                    </div>
                  )
                }
              )}
            </Sheet>
          ) : (
            <div>Loading post...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export { Main };
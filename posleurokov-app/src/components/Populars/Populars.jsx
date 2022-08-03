import styles from './Populars.module.scss';
import { useState, useEffect } from 'react';
import { Sheet, Link } from 'components/shared';
import { axiosAPI } from 'plugins/axios';
import arrow from 'assets/img/arrow-right.png';

const Populars = () => {
  const [populars, setPopulars] = useState([])

  useEffect(() => {
    getPopulars()
  }, [])

  const getPopulars = async () => {
    const result = await axiosAPI.getPopulars();
    setPopulars(result);
  }

  return (
    <Sheet padding='36px 24px 36px 24px' maxWidth={'230px'} marginTop={'35px'}>
      <h3 className={styles.h3}>Популярное</h3>
      {populars !== null ? (
        typeof populars !== 'string' ? (
          populars.map(
            item => {
              return (
                <Link
                  key={item}
                  path='/'
                  fontFamily='Roboto-Regular'
                  fontWeight='400'
                  fontSize='14px'
                  lineHeight='16px'
                  color='#5F6060'          
                  marginTop='19px'
                  display='flex'
                  textDecoration='none'
                  paddingBottom='12px'
                  borderBottom='1px solid #EEEFEF'
                >
                  <img src={arrow} alt='>' className={styles.img}></img>
                  <div>{item}</div>
                </Link>
              )
            }
          )
        ) : (
          <div>{populars}</div>
        )
      ) : (
        <div>Loading post...</div>
      )}
    </Sheet>
  );
};

export { Populars };
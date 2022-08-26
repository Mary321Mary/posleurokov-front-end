import {
  Heading,
  Sheet
} from 'components';

import styles from './FAQ.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';

const FAQ = () => {
  const [headingParams, setHeadingParams] = useState({});
  const [pairs, setPairs] = useState([])

  const getInfo = async () => {
    let result = await axiosAPI.getFAQ()
    setData(result)
  }

  const setData = (data) => {
    let newPairs = []
    data.map((elem) => {
      let qa = {
        'name': elem.info.split(/\r?\n\r?\n/)[0],
        'info': elem.info.replace(elem.info.split(/\r?\n\r?\n/)[0] + '\r\n\r\n', '')
      }
      newPairs = [...newPairs, qa]
    })
    setPairs(newPairs)
  }

  const openInfo = (element) => {
    element.classList.toggle(styles.active);
    var panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      panel.style.padding = '0 22px';
    } else {
      panel.style.padding = '15px 22px';
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  const StyleInfo = pairs.map((elem) => {
    return (<div className={styles.container}>
      <button name='showButton' className={styles.question} onClick={(e) => { openInfo(e.target) }}>{elem.name}</button>
      <div className={styles.answer}>{elem.info}</div>
    </div>)
  });

  useEffect(() => {
    getInfo()
    getWindowSize();

    function handleWindowResize() {
      getWindowSize();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])

  const getWindowSize = () => {
    let innerWidth = window.outerWidth;

    if (innerWidth > 1024) {
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '38px 0 36px 419px',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
    }
    else if (innerWidth > 699 && innerWidth <= 1024) {
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '10px 0 12.5px 4%',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
    }
    else {
      setHeadingParams({
        'width': 'auto',
        'height': 'auto',
        'margin': '10px 0 14px 4%',
        'color': '#6D80D8',
        'font-size': '24px',
        'line-height': '28px',
        'font-style': 'normal',
        'font-weight': '500'
      })
    }
  }

  return (
    <section className={styles.section}>
      <Heading tag='h1'
        margin={headingParams['margin']}
        width={headingParams['width']}
        height={headingParams['height']}
        color={headingParams['color']}
        font-size={headingParams['font-size']}
        line-height={headingParams['line-height']}
        font-style={headingParams['font-style']}
        font-weight={headingParams['font-weight']}
        font-family={headingParams['font-family']}
        padding-top={'20px'}>
        Вопросы и ответы
      </Heading>
      <div>
        {StyleInfo}
      </div>
    </section>
  );
};

export { FAQ };
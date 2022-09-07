import {
  Heading,
  Sheet,
  Loader
} from 'components';

import styles from './Terms.module.scss';
import { useEffect, useState } from 'react';
import { axiosAPI } from 'plugins/axios';
import Helmet from "react-helmet";

const Terms = () => {
  const [windowWidth, setWindowWidth] = useState('');
  const [sheetMargin, setSheetMargin] = useState('');
  const [headingParams, setHeadingParams] = useState({});
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true)

  const getInfo = async () => {
    setLoading(true)
    let result = await axiosAPI.getTerms()
    setData(result)
    setLoading(false)
  }

  const setData = (data) => {
    let infoParam = ''
    data.map((elem) => {
      infoParam += elem.info
    })
    setInfo(infoParam)
  }

  const StyleInfo = info.split(/\r?\n\r?\n/).map((elem) => {
    if (elem.startsWith('(Глава)') && elem.endsWith('(/Глава)')) {
      elem = elem.replace('(Глава)', '').replace('(/Глава)', '')
      return (<div className={styles.chapter}>{elem}</div>)
    }
    else if (elem.startsWith('(Подглава)') && elem.endsWith('(/Подглава)')) {
      elem = elem.replace('(Подглава)', '').replace('(/Подглава)', '')
      return (<div className={styles.special}>{elem}</div>)
    }
    else {
      return (<div>{elem}</div>)
    }
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
      setWindowWidth('895px')
      setSheetMargin('10px auto')
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '38px 0 36px 40px',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
    }
    else if (innerWidth > 699 && innerWidth <= 1024) {
      setWindowWidth('700px')
      setSheetMargin('0px auto')
      setHeadingParams({
        'width': '500px',
        'height': 'auto',
        'margin': '38px 0 12.5px 40px',
        'color': '#6D80D8',
        'font-size': '30px',
        'line-height': '35px',
        'font-style': 'normal',
        'font-weight': '500'
      })
    }
    else {
      setWindowWidth('350px')
      setSheetMargin('0 auto')
      setHeadingParams({
        'width': '130px',
        'height': 'auto',
        'margin': '16px 0 14px 35px',
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
      <Helmet title="Условия" />
      {loading ?
        <Loader marginLeft={"42vw"} /> :
        <Sheet
          margin={sheetMargin} width={windowWidth}>
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
            Условия использования
          </Heading>
          <div>
            {StyleInfo}
          </div>
        </Sheet>}
    </section>
  );
};

export { Terms };
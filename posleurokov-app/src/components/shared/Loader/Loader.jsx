import { Watch } from 'react-loader-spinner';

import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <Watch
        color='#6D80D8'
        width='12vw'
        height='12vh' />
    </div>
  )
}

export { Loader }
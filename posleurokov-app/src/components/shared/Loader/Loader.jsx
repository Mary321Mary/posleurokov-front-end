import { Watch } from 'react-loader-spinner';

import styles from "./Loader.module.scss";

const Loader = ({ ...rest }) => {
  return (
    <div className={styles.container} style={{ ...rest }}>
      <Watch
        color='#6D80D8'
        width='12vw'
        height='12vh' />
    </div>
  )
}

export { Loader } 
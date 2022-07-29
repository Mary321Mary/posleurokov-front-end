import styles from './VkBlock.module.scss';
import { Sheet } from 'components';

const VkBlock = ({ heigth, width, top, ...rest }) => {
    return (
        <Sheet
            right='20px'
            top={top}
            position='relative'
            width={width}
            height={heigth}
        >
            <div id="vk_groups" className={styles.vk}></div>
        </Sheet>
    );
};

export { VkBlock };
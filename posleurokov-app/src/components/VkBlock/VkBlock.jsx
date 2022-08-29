import styles from './VkBlock.module.scss';
import { Sheet } from 'components';

const VkBlock = ({ heigth, width, ...rest }) => {
    return (
        <Sheet
            top='20px'
            position='relative'
            width={width}
            height={heigth}
        >
            <div id="vk_groups" className={styles.vk} style={{ ...rest }}></div>
        </Sheet>
    );
};

export { VkBlock };
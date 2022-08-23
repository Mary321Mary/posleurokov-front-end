import Modal from "react-modal";
import styles from './ModalWindow.module.scss';
import warning from 'assets/img/info.png';

const ModalWindow = ({ show, handler, children }) => {
  return (
    <Modal isOpen={show}
      closeTimeoutMS={500}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={handler}>
      {children}
    </Modal>
  );
};

Modal.setAppElement('#root');
export { ModalWindow };
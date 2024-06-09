import styles from './styles.module.css';

const Modal = ({
                   title,
                   content,
                   onCancel,
                   onConfirm,
               }) => {
    return (<div className={styles.overlay}>
        <div className={styles.modal}>
            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.content}>{content}</p>
                <button className={[styles.button, styles.cancelButton].join(' ')} onClick={onCancel}>취소</button>
                <button className={[styles.button, styles.confirmButton].join(' ')} onClick={onConfirm}>확인</button>
            </div>
        </div>
    </div>);
};

export default Modal;

import styles from './styles.module.css';
import {useEffect} from 'react';

const ToastMessage = ({
                          setToast,
                          text,
                      }) => {
    useEffect(function updateToastOverTime() {
        const timer = setTimeout(() => {
            setToast(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (<p className={styles.toast}>{text}</p>);
};

export default ToastMessage;
import styles from './styles.module.css';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(-1);
    };

    return (<>
        <button className={styles.backButton} onClick={onClick}>
            <span className={styles.backButtonText}>
                &lt;
            </span>
        </button>
    </>);
};

export default BackButton;

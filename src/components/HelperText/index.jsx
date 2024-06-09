import styles from './styles.module.css';

const HelperText = ({text}) => {

    return (<p className={styles.helperText}>{text}</p>);
};

export default HelperText;

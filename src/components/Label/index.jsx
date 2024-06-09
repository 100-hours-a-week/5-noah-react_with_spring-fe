import styles from './styles.module.css';

const Label = ({
                   htmlFor,
                   labelText,
               }) => {

    return (<label className={styles.label} htmlFor={htmlFor}>{labelText}</label>);
};

export default Label;

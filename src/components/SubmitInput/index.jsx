import styles from './styles.module.css';

const SubmitInput = ({
                         disabled,
                         value,
                     }) => {
    const backgroundColor = {backgroundColor: disabled ? '#ACA0EB' : '#7F6AEE'};

    return (<input className={styles.submitButton} type={'submit'} style={backgroundColor}
                   disabled={disabled} value={value}></input>);
};

export default SubmitInput;

import styles from './styles.module.css';
import Label from '../Label';

const LabeledInput = ({
                          labelText,
                          type,
                          name,
                          value,
                          onChange,
                          placeholder,
                          minLength,
                          maxLength,
                      }) => {
    return (<>
        <Label htmlFor={name} labelText={labelText}/>
        <input className={styles.input} type={type} id={name} name={name} value={value} onChange={onChange}
               placeholder={placeholder} minLength={minLength} maxLength={maxLength}/>
    </>);
};

export default LabeledInput;

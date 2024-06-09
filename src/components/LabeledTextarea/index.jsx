import styles from './style.module.css';
import Label from '../Label';

const LabeledTextarea = ({
                             labelText,
                             textareaHeight,
                             name,
                             value,
                             onChange,
                             placeholder,
                             minLength,
                             maxLength,
                         }) => {
    return (<>
        <Label htmlFor={name} labelText={labelText}/>
        <textarea className={styles.textarea} style={{height: textareaHeight}} id={name} name={name} value={value}
                  onChange={onChange} placeholder={placeholder} minLength={minLength} maxLength={maxLength}></textarea>
    </>);
};

export default LabeledTextarea;

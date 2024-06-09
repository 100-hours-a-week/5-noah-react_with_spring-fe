import styles from './styles.module.css';
import MainContainer from '../MainContainer';
import BodyTitle from '../BodyTitle';
import HelperText from '../HelperText';
import LabeledInput from '../LabeledInput';
import SubmitInput from '../SubmitInput';
import {useEffect, useState} from 'react';
import validatePassword from '../../utils/validatePassword.mjs';
import validateConfirmPassword from '../../utils/validateConfirmPassword.mjs';
import ToastMessage from '../ToastMessage';
import useInput from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useAllValid from '../../hooks/useAllValid';

const UpdateUserPasswordForm = () => {
    const {
        value: password,
        onChangeWithEvent: onChangePassword,
    } = useInput('');

    const {
        value: confirmPassword,
        onChangeWithEvent: onChangeConfirmPassword,
    } = useInput('');
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

    const [toast, setToast] = useState(false);

    const passwordValidation = useValidation(password, validatePassword);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8000/api/users/update/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password,
            }),
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                setToast(true);
            } else {
                alert('ERROR');
            }
        });
    };

    useEffect(function updateConfirmPasswordHelperTextWhenInputConfirmPassword() {
        const result = validateConfirmPassword(password, confirmPassword);

        setConfirmPasswordHelperText(result.message);
        setIsValidConfirmPassword(result.status);
    }, [password, confirmPassword]);

    const isAllValid = useAllValid(passwordValidation.isValid, passwordValidation.isValid, isValidConfirmPassword);

    return (<MainContainer>
        <BodyTitle text={'비밀번호 수정'}></BodyTitle>
        <form className={styles.updateUserPasswordForm} onSubmit={handleSubmit}>
            <LabeledInput labelText={'비밀번호'} type={'password'} name={'password'} placeholder={'비밀번호를 입력하세요'}
                          onChange={onChangePassword}/>
            <HelperText text={passwordValidation.helperText}/>
            <LabeledInput labelText={'비밀번호 확인'} type={'password'} name={'confirmPassword'}
                          placeholder={'비밀번호를 한번 더 입력하세요'} onChange={onChangeConfirmPassword}/>
            <HelperText text={confirmPasswordHelperText}/>
            <SubmitInput disabled={!isAllValid} value={'수정하기'}/>
        </form>

        {toast && <ToastMessage setToast={setToast} text={'수정완료'}/>}
    </MainContainer>);
};

export default UpdateUserPasswordForm;

import styles from './styles.module.css';
import {Link, useNavigate} from 'react-router-dom';
import validateEmail from '../../utils/validateEmail.mjs';
import validatePassword from '../../utils/validatePassword.mjs';
import MainContainer from '../MainContainer';
import BodyTitle from '../BodyTitle';
import LabeledInput from '../LabeledInput';
import HelperText from '../HelperText';
import SubmitInput from '../SubmitInput';
import useInput from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useAllValid from '../../hooks/useAllValid';

const SignInForm = () => {
    const navigate = useNavigate();

    const {
        value: email,
        onChangeWithEvent: onChangeEmail,
    } = useInput('');
    const {
        value: password,
        onChangeWithEvent: onChangePassword,
    } = useInput('');

    const emailValidation = useValidation(email, validateEmail);
    const passwordValidation = useValidation(password, validatePassword);

    const isAllValid = useAllValid(emailValidation.isValid, passwordValidation.isValid);

    const handleSignIn = (event) => {
        event.preventDefault();

        fetch('http://localhost:8000/api/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                emailValidation.handleChangeHelperText('* 이메일 또는 비밀번호를 다시 확인해 주세요.');
                emailValidation.handleInvalidate();
            } else {
                navigate('/posts');
            }
        });
    };

    return (<MainContainer>
        <BodyTitle text={'로그인'}></BodyTitle>
        <form className={styles.signInForm} onSubmit={handleSignIn}>
            <LabeledInput labelText={'이메일'} name={'email'} type={'email'} onChange={onChangeEmail}
                          placeholder={'이메일을 입력하세요'}/>
            <LabeledInput labelText={'비밀번호'} name={'password'} type={'password'} onChange={onChangePassword}
                          placeholder={'비밀번호를 입력하세요'}/>
            <HelperText text={emailValidation.helperText || passwordValidation.helperText}/>
            <SubmitInput disabled={!isAllValid} value={'로그인'}/>
        </form>
        <p>
            <Link to={'/sign-up'} className={styles.moveSignUpText}>회원가입</Link>
        </p>
    </MainContainer>);
};

export default SignInForm;

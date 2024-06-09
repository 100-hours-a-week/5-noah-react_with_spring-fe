import styles from './styles.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import validateEmail from '../../utils/validateEmail.mjs';
import validatePassword from '../../utils/validatePassword.mjs';
import validateConfirmPassword from '../../utils/validateConfirmPassword.mjs';
import validateNickname from '../../utils/validateNickname.mjs';
import MainContainer from '../MainContainer';
import BodyTitle from '../BodyTitle';
import HelperText from '../HelperText';
import LabeledInputUserImage from '../LabeledInputUserImage';
import LabeledInput from '../LabeledInput';
import SubmitInput from '../SubmitInput';
import Label from '../Label';
import validateUserImageFile from '../../utils/validateUserImageFile.mjs';
import useInput from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useAllValid from '../../hooks/useAllValid';

const SignUpForm = () => {
    const navigate = useNavigate();

    const {
        value: image,
        onChangeWithValue: onChangeImage,
    } = useInput(null);

    const {
        value: email,
        onChangeWithEvent: onChangeEmail,
    } = useInput('');

    const {
        value: password,
        onChangeWithEvent: onChangePassword,
    } = useInput('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState('');
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

    const {
        value: nickname,
        onChangeWithEvent: onChangeNickname,
    } = useInput('');

    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const imageValidation = useValidation(image, validateUserImageFile);
    const emailValidation = useValidation(email, validateEmail);
    const passwordValidation = useValidation(password, validatePassword);
    const nicknameValidation = useValidation(nickname, validateNickname);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nickname', nickname);

        fetch('http://localhost:8000/api/sign-up', {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.ok) {
                navigate('/sign-in');
            } else {
                response.json().then((body) => {
                    if (body.message === 'DUPLICATE_EMAIL') {
                        emailValidation.handleChangeHelperText('* 중복된 이메일입니다.');
                        emailValidation.handleInvalidate();
                    } else if (body.message === 'DUPLICATE_NICKNAME') {
                        nicknameValidation.handleChangeHelperText('* 중복된 닉네임입니다.');
                        nicknameValidation.handleInvalidate();
                    } else {
                        alert(body.message);
                    }
                });
            }
        });
    };

    // password, confirmPassword 2개를 확인하기 때문에 useValidation 사용 X
    useEffect(function updateConfirmPasswordHelperTextWhenInputConfirmPassword() {
        const result = validateConfirmPassword(password, confirmPassword);

        setConfirmPasswordHelperText(result.message);
        setIsValidConfirmPassword(result.status);
    }, [password, confirmPassword]);

    const isAllValid = useAllValid(imageValidation.isValid, emailValidation.isValid, passwordValidation.isValid, isValidConfirmPassword, nicknameValidation.isValid);

    return (<MainContainer>
        <BodyTitle text={'회원가입'}></BodyTitle>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
            <Label labelText={'프로필 사진'}/>
            <HelperText text={imageValidation.helperText}/>
            <LabeledInputUserImage name={'image'} onChange={onChangeImage}/>
            <LabeledInput labelText={'이메일 *'} type={'email'} name={'email'} onChange={onChangeEmail}
                          placeholder={'이메일을 입력하세요'}/>
            <HelperText text={emailValidation.helperText}/>
            <LabeledInput labelText={'비밀번호 *'} type={'password'} name={'password'} onChange={onChangePassword}
                          placeholder={'비밀번호를 입력하세요'}/>
            <HelperText text={passwordValidation.helperText}/>
            <LabeledInput labelText={'비밀번호 확인 *'} type={'password'} name={'confirmPassword'}
                          onChange={handleChangeConfirmPassword}
                          placeholder={'비밀번호를 한번 더 입력하세요'}/>
            <HelperText text={confirmPasswordHelperText}/>
            <LabeledInput labelText={'닉네임 *'} type={'text'} name={'nickname'} onChange={onChangeNickname}
                          placeholder={'닉네임을 입력하세요'}/>
            <HelperText text={nicknameValidation.helperText}/>
            <SubmitInput disabled={!isAllValid} value={'회원가입'}/>
        </form>
        <p>
            <Link to={'/sign-in'} className={styles.moveSignInText}>로그인하러 가기</Link>
        </p>
    </MainContainer>);
};

export default SignUpForm;

import styles from './styles.module.css';
import MainContainer from '../MainContainer';
import BodyTitle from '../BodyTitle';
import Label from '../Label';
import LabeledInputUserImage from '../LabeledInputUserImage';
import HelperText from '../HelperText';
import LabeledInput from '../LabeledInput';
import SubmitInput from '../SubmitInput';
import {useState} from 'react';
import validateNickname from '../../utils/validateNickname.mjs';
import validateUserImageFile from '../../utils/validateUserImageFile.mjs';
import ToastMessage from '../ToastMessage';
import Modal from '../Modal';
import useInput from '../../hooks/useInput';
import useValidation from '../../hooks/useValidation';
import useAllValid from '../../hooks/useAllValid';

const UpdateUserProfileForm = ({data}) => {
    // 야매야매 코드..
    let userProfile;
    if (data) {
        userProfile = JSON.parse(data);

        if (!userProfile) {
            // 로딩 시
            userProfile = {
                imageUrl: '',
                email: '',
                nickname: '',
            };
        }
    }

    const {
        value: image,
        onChangeWithValue: onChangeImage,
    } = useInput(null);
    const {
        value: nickname,
        onChangeWithEvent: onChangeNickname,
    } = useInput(userProfile.nickname);

    const [toast, setToast] = useState(false);

    const [modal, setModal] = useState(false);

    const imageValidation = useValidation(image, validateUserImageFile);
    const nicknameValidation = useValidation(nickname, validateNickname);

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('nickname', nickname);

        // INFO: form을 통해 image를 변경해도 헤더의 이미지는 변경 없음
        fetch('http://localhost:8000/api/users/update/image-and-nickname', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                setToast(true);
            } else {
                if (response.status === 409) {
                    nicknameValidation.handleChangeHelperText('* 중복된 닉네임입니다.');
                    nicknameValidation.handleInvalidate();
                } else {
                    alert('ERROR');
                }
            }
        });
    };

    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleDeleteUser = () => {
        console.log('회원 탈퇴');

        // 나중에 fetch API 추가
        setModal(false);
    };

    const isAllValid = useAllValid(imageValidation.isValid, nicknameValidation.isValid);

    return (<MainContainer>
        <BodyTitle text={'회원정보수정'}></BodyTitle>
        <form className={styles.updateUserProfileForm} onSubmit={handleSubmit}>
            <Label labelText={'프로필 사진 *'}/>
            <LabeledInputUserImage name={'image'} defaultUserImageSrc={`http://localhost:8000/${userProfile.imageUrl}`}
                                   onChange={onChangeImage}/>
            <Label labelText={'이메일'}/>
            <p className={styles.userEmail}>{userProfile.email}</p>
            <LabeledInput labelText={'닉네임'} type={'text'} name={'nickname'} placeholder={'닉네임을 입력하세요'} value={nickname}
                          onChange={onChangeNickname}/>
            <HelperText text={imageValidation.helperText || nicknameValidation.helperText}/>
            <SubmitInput disabled={!isAllValid} value={'수정하기'}/>
        </form>
        <p onClick={handleOpenModal}>회원탈퇴</p>

        {toast && <ToastMessage setToast={setToast} text={'수정완료'}/>}

        {modal && <Modal title={'회원탈퇴 하시겠습니까?'} content={'작성된 게시글과 댓글은 삭제됩니다.'} onCancel={handleCloseModal}
                         onConfirm={handleDeleteUser}/>}
    </MainContainer>);
};

export default UpdateUserProfileForm;

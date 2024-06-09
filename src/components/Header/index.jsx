import styles from './styles.module.css';
import {useState} from 'react';
import BackButton from '../BackButton';
import HeaderTitle from '../HeaderTitle';
import UserImage from '../UserImage';
import {Link, useNavigate} from 'react-router-dom';

const Header = ({
                    useBackButton,
                    useUserImage,
                    imageSrc,
                }) => {
    const navigate = useNavigate();

    const [dropDownState, setDropDownState] = useState(false);

    const handleToggleDropDownState = () => {
        setDropDownState(!dropDownState);
    };

    const handleClickSignOut = () => {
        fetch('http://localhost:8000/api/sign-out', {
            method: 'DELETE',
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                navigate('/sign-in');
            } else {
                navigate('posts');
            }
        });
    };

    return (<div className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.backButtonContainer}>
                {useBackButton && <BackButton/>}
            </div>
            <HeaderTitle/>
            <div className={styles.userImageContainer} onClick={handleToggleDropDownState}>
                {useUserImage && <UserImage src={imageSrc} alt={'사용자 사진'} width={36} height={36}/>}
                {dropDownState && <div className={styles.dropdownMenu}>
                    <ul>
                        <li><Link to={'/users/update/profile'} className={styles.LinkText}>회원정보수정</Link></li>
                        <li><Link to={'/users/update/password'} className={styles.LinkText}>비밀번호수정</Link></li>
                        <li><p className={styles.LinkText} onClick={handleClickSignOut}>로그아웃</p></li>
                    </ul>
                </div>}
            </div>
        </div>
    </div>);
};

export default Header;

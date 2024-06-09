import styles from './styles.module.css';
import UserImage from '../UserImage';
import updateNumberByUnit from '../../utils/updateNumberByUnit.mjs';
import {useNavigate} from 'react-router-dom';

const SimplePost = ({
                        id,
                        title,
                        likes,
                        comments,
                        views,
                        createdDate,
                        authorImageSrc,
                        authorName,
                    }) => {
    const navigate = useNavigate();

    const handleClickSimplePost = () => {
        navigate(`/posts/${id}`);
    };

    return (<div className={styles.simplePostContainer} onClick={handleClickSimplePost}>
        <p className={styles.simplePostTitle}>{title}</p>
        <div className={styles.simplePostInformationContainer}>
            <div>
                <span className={styles.simplePostInformationLabelText}>좋아요</span>
                <span className={styles.simplePostInformationValue}>{updateNumberByUnit(likes)}</span>
                <span className={styles.simplePostInformationLabelText}>댓글</span>
                <span className={styles.simplePostInformationValue}>{updateNumberByUnit(comments)}</span>
                <span className={styles.simplePostInformationLabelText}>조회수</span>
                <span className={styles.simplePostInformationValue}>{updateNumberByUnit(views)}</span>
            </div>
            <span className={styles.simplePostInformationLabelText}>{createdDate}</span>
        </div>
        <hr className={styles.horizontalRule}></hr>
        <div className={styles.simplePostAuthorInformationContainer}>
            <UserImage width={36} height={36} src={authorImageSrc} alt={'작성자 사진'}></UserImage>
            <span className={styles.simplePostAuthorNameText}>{authorName}</span>
        </div>
    </div>);
};

export default SimplePost;

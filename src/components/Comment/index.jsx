import styles from './styles.module.css';
import UserImage from '../UserImage';
import SmallButton from '../SmallButton';
import {useState} from 'react';
import Modal from '../Modal';

const Comment = ({
                     postId,
                     commentId,
                     authorImageSrc,
                     authorName,
                     createdDate,
                     content,
                     userNickname, // 버튼 display 용도로 사용, 아 먼가 엉성한데
                 }) => {
    // HOC 중 useNavigate 새로고침이 안되서 `window.location.reload();`로 변경, 이유 못 찾음..

    const [modal, setModal] = useState(false);

    const handleClickUpdateCommentButton = () => {
        alert('댓글 수정 기능은 없습니다.');
    };

    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleDeleteComment = () => {
        fetch(`http://localhost:8000/api/posts/${postId}/comments/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('ERROR');
            }
        });
    };

    return (<div className={styles.container}>
        <div className={styles.topContainer}>
            <div className={styles.authorContainer}>
                <UserImage src={authorImageSrc} alt={'댓글 작성자 사진'} width={36} height={36}/>
                <span className={styles.authorName}>{authorName}</span>
                <span>{createdDate}</span>
            </div>
            {authorName === userNickname && <div>
                <SmallButton onClick={handleClickUpdateCommentButton} value={'수정'}/>
                <SmallButton onClick={handleOpenModal} value={'삭제'}/>
            </div>}
        </div>
        <p className={styles.content}>{content}</p>

        {modal && <Modal title={'댓글을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} onCancel={handleCloseModal}
                         onConfirm={handleDeleteComment}/>}
    </div>);
};

export default Comment;

import styles from './styles.module.css';
import UserImage from '../UserImage';
import SmallButton from '../SmallButton';
import updateNumberByUnit from '../../utils/updateNumberByUnit.mjs';
import {useEffect, useState} from 'react';
import Modal from '../Modal';
import {useNavigate} from 'react-router-dom';

const Post = ({
                  id,
                  postTitle,
                  authorImageSrc,
                  authorName,
                  createdDate,
                  postImageSrc,
                  postContent,
                  views,
                  comments,
              }) => {
    const navigate = useNavigate();

    const [buttonDisplay, setButtonDisplay] = useState('none');

    const [modal, setModal] = useState(false);

    const handleClickUpdatePostButton = () => {
        navigate(`/posts/${id}/update`);
    };

    const handleOpenModal = () => {
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleDeletePost = () => {
        fetch(`http://localhost:8000/api/posts/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                alert('ERROR');
            }

            navigate('/posts');
        });
    };

    // 본인이 작성한 게시글이면 버튼 보임
    useEffect(function updateButtonDisplay() {
        fetch('http://localhost:8000/api/check-auth', {
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((body) => {
                        if (body.nickname === authorName) {
                            setButtonDisplay('inline');
                        } else {
                            setButtonDisplay('none');
                        }
                    });
                }
            });
    });

    return (<div>
        <div>
            <p className={styles.postTitle}>{postTitle}</p>
            <div className={styles.topContainer}>
                <div className={styles.authorContainer}>
                    <UserImage src={authorImageSrc} alt={'댓글 작성자 사진'} width={36} height={36}/>
                    <span className={styles.authorName}>{authorName}</span>
                    <span>{createdDate}</span>
                </div>
                <div>
                    <SmallButton onClick={handleClickUpdatePostButton} value={'수정'} display={buttonDisplay}/>
                    <SmallButton onClick={handleOpenModal} value={'삭제'} display={buttonDisplay}/>
                </div>
            </div>
        </div>
        <hr className={styles.horizontalRule}></hr>
        <div className={styles.contentContainer}>
            {postImageSrc && <img src={postImageSrc} alt={'게시글 사진'} width={544} height={306}/>}
            <p className={styles.postContent}>{postContent}</p>
            <div className={styles.contentSubContainer}>
                <div className={styles.contentSubInfoContainer}>
                    <p className={styles.postSubInfoText}>{updateNumberByUnit(views)}</p>
                    <p className={styles.postSubInfoText}>조회수</p>
                </div>
                <div className={styles.contentSubInfoContainer}>
                    <p className={styles.postSubInfoText}>{updateNumberByUnit(comments)}</p>
                    <p className={styles.postSubInfoText}>댓글</p>
                </div>
            </div>
        </div>
        <hr className={styles.horizontalRule}></hr>

        {modal && <Modal title={'게시글을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} onCancel={handleCloseModal}
                         onConfirm={handleDeletePost}/>}
    </div>);
};

export default Post;

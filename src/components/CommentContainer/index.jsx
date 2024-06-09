import styles from './styles.module.css';
import MediumButton from '../MediumButton';
import Comment from '../Comment';
import {useEffect, useState} from 'react';
import useInput from '../../hooks/useInput';

const CommentContainer = ({
                              isSigned,
                              signedNickname,
                              postId,
                          }) => {
    // HOC 중 useNavigate 새로고침이 안되서 `window.location.reload();`로 변경, 이유 못 찾음..
    const [comments, setComments] = useState([]);

    const {
        value: commentContent,
        onChangeWithEvent: onChangeCommentContentWithEvent,
    } = useInput('');

    const [submitInputDisable, setSubmitInputDisable] = useState(true);

    const handleClickCommentRegisterButton = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8000/api/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: commentContent,
            }),
            credentials: 'include',
        }).then((response) => {
            if (response.ok) {
                window.location.reload();
            } else {
                alert('ERROR');
            }
        });
    };

    useEffect(function updateButtonDisplay() {
        fetch(`http://localhost:8000/api/posts/${postId}/comments`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((body) => {
                        setComments(body.comments);
                    });
                }
            });
    }, [postId]);

    // 입력이 있다면 댓글 등록 버튼 활성화
    useEffect(() => {
        setSubmitInputDisable(!commentContent);
    }, [commentContent]);

    return (<div className={styles.commentContainer}>
        {isSigned && <form className={styles.createCommentForm} onChange={onChangeCommentContentWithEvent}>
            <textarea className={styles.textarea} placeholder={'댓글을 남겨주세요!'} maxLength={256}/>
            <hr className={styles.horizontalRule}></hr>
            <div className={styles.createCommentFormSubmitButtonContainer}>
                <MediumButton disable={submitInputDisable} value={'댓글 등록'} onClick={handleClickCommentRegisterButton}/>
            </div>
        </form>}
        <div className={styles.comments}>
            {comments.map((comment) => (<Comment
                key={comment.id}
                postId={postId}
                commentId={comment.id}
                authorImageSrc={`http://localhost:8000/${comment.author.imageUrl}`}
                authorName={comment.author.name}
                createdDate={comment.createdDate}
                content={comment.content}
                userNickname={signedNickname}
            />))}
        </div>
    </div>);
};

export default CommentContainer;

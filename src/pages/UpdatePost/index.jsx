import Header from '../../components/Header';
import Body from '../../components/Body';
import EditPostForm from '../../components/EditPostForm';
import {useNavigate, useParams} from 'react-router-dom';
import withLoading from '../../hoc/withLoading';

const EditPostFormWithLoading = withLoading(EditPostForm);

const UpdatePostPage = ({
                            useUserImage,
                            imageUrl,
                        }) => {
    const {postId} = useParams();

    const navigate = useNavigate();

    // 중복 코드
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8000/api/posts/${postId}`, {
            method: 'PATCH',
            body: new FormData(event.target),
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                alert('에러 발생!');
                navigate('/posts');
            }

            navigate(`/posts/${postId}`);
        });
    };

    return (<>
        <Header useBackButton={true} useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <EditPostFormWithLoading url={`http://localhost:8000/api/posts/${postId}`} bodyTitleText={'게시글 수정'}
                                     onSubmit={handleSubmit}/>
        </Body>
    </>);
};

export default UpdatePostPage;

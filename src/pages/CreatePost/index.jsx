import Header from '../../components/Header';
import Body from '../../components/Body';
import EditPostForm from '../../components/EditPostForm';
import {useNavigate} from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CreatePostPage = ({
                            useUserImage,
                            imageUrl,
                        }) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${SERVER_URL}/api/posts`, {
            method: 'POST',
            body: new FormData(event.target),
            credentials: 'include',
        }).then((response) => {
            if (!response.ok) {
                alert('에러 발생!');
            }

            navigate('/posts');
        });
    };

    return (<>
        <Header useBackButton={true} useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <EditPostForm bodyTitleText={'게시글 작성'} onSubmit={handleSubmit}></EditPostForm>
        </Body>
    </>);
};

export default CreatePostPage;

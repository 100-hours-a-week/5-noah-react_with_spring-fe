import Header from '../../components/Header';
import PostContainer from '../../components/PostContainer';
import withLoading from '../../hoc/withLoading';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const PostContainerWithLoading = withLoading(PostContainer);

const PostPage = ({
                      useUserImage,
                      imageUrl,
                      signedNickname,
                  }) => {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(function ifIsNotNumber() {
        if (isNaN(id)) {
            navigate('/posts');
        }
    }, [id, navigate]);

    return (<>
        <Header useBackButton={true} useUserImage={useUserImage} imageSrc={imageUrl}/>
        <PostContainerWithLoading isSigned={useUserImage} signedNickname={signedNickname}
                                  url={`${SERVER_URL}/api/posts/${id}`}/>
    </>);
};

export default PostPage;

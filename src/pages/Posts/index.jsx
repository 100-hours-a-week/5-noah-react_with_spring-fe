import Header from '../../components/Header';
import Body from '../../components/Body';
import SimplePostContainer from '../../components/SimplePostContainer';
import withLoading from '../../hoc/withLoading';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SimplePostContainerWithLoading = withLoading(SimplePostContainer);

const PostsPage = ({
                       useUserImage,
                       imageUrl,
                   }) => {
    return (<>
        <Header useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <SimplePostContainerWithLoading url={`${SERVER_URL}/api/posts`} isSigned={useUserImage}/>
        </Body>
    </>);
};

export default PostsPage;

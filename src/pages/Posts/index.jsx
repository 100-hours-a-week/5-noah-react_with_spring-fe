import Header from '../../components/Header';
import Body from '../../components/Body';
import SimplePostContainer from '../../components/SimplePostContainer';
import withLoading from '../../hoc/withLoading';

const SimplePostContainerWithLoading = withLoading(SimplePostContainer);

const PostsPage = ({
                       useUserImage,
                       imageUrl,
                   }) => {
    return (<>
        <Header useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <SimplePostContainerWithLoading url={'http://localhost:8000/api/posts'} isSigned={useUserImage}/>
        </Body>
    </>);
};

export default PostsPage;

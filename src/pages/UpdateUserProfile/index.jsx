import Header from '../../components/Header';
import Body from '../../components/Body';
import UpdateUserProfileForm from '../../components/UpdateUserProfileForm';
import withLoading from '../../hoc/withLoading';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UpdateUserProfileFormWithLoading = withLoading(UpdateUserProfileForm);

const UpdateUserProfilePage = ({
                                   useUserImage,
                                   imageUrl,
                               }) => {
    return (<>
        <Header useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <UpdateUserProfileFormWithLoading url={`${SERVER_URL}/api/member`}
                                              options={{credentials: 'include'}}/>
        </Body>
    </>);
};

export default UpdateUserProfilePage;

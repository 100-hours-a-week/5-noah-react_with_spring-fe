import Header from '../../components/Header';
import Body from '../../components/Body';
import UpdateUserProfileForm from '../../components/UpdateUserProfileForm';
import withLoading from '../../hoc/withLoading';

const UpdateUserProfileFormWithLoading = withLoading(UpdateUserProfileForm);

const UpdateUserProfilePage = ({
                                   useUserImage,
                                   imageUrl,
                               }) => {
    return (<>
        <Header useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <UpdateUserProfileFormWithLoading url={'http://localhost:8000/api/users/update/image-and-nickname'}
                                              options={{credentials: 'include'}}/>
        </Body>
    </>);
};

export default UpdateUserProfilePage;

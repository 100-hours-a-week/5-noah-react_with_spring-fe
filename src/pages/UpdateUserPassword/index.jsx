import Header from '../../components/Header';
import Body from '../../components/Body';
import UpdateUserPasswordForm from '../../components/UpdateUserPasswordForm';

const UpdateUserPasswordPage = ({
                                    useUserImage,
                                    imageUrl,
                                }) => {
    return (<>
        <Header useUserImage={useUserImage} imageSrc={imageUrl}></Header>
        <Body>
            <UpdateUserPasswordForm></UpdateUserPasswordForm>
        </Body>
    </>);
};

export default UpdateUserPasswordPage;

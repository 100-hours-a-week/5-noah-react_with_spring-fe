import Header from '../../components/Header';
import Body from '../../components/Body';
import SignUpForm from '../../components/SignUpForm';

const SignUpPage = () => {

    return (<>
        <Header useBackButton={true}></Header>
        <Body>
            <SignUpForm></SignUpForm>
        </Body>
    </>);
};

export default SignUpPage;

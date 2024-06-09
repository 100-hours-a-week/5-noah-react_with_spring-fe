import useFetch from '../hooks/useFetch';
import {useNavigate} from 'react-router-dom';

// option
//  - true: 비회원도 접근 가능,
//  - false, 비회원 접근 불가능
//  - 이름 마음에 안듬
const withAuthAccess = (WrappedComponent, option) => {
    return (props) => {
        const navigate = useNavigate();

        const {
            loading,
            status,
            data,
        } = useFetch({
            url: 'http://localhost:8000/api/check-auth',
            options: {
                credentials: 'include',
            },
        });

        if (loading) {
            return <p>로딩 페이지, 자료9조 파이팅!</p>;
        }

        if (status === 200) {
            return <WrappedComponent useUserImage={true}
                                     imageUrl={`http://localhost:8000/${data.imageUrl}`}
                                     signedNickname={data.nickname} {...props}/>;
        } else {
            if (option) {
                return <WrappedComponent useUserImage={false} {...props}/>;
            } else {
                navigate('/sign-in');
                return null;
            }
        }
    };
};

export default withAuthAccess;

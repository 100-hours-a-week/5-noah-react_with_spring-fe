import useFetch from '../hooks/useFetch';
import {useNavigate} from 'react-router-dom';

const withNoAuthAccess = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        const {
            loading,
            status,
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
            navigate('/posts');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withNoAuthAccess;

import useFetch from '../hooks/useFetch.js';

const withLoading = (WrappedComponent) => {
    return ({
                url,
                options,
                ...props
            }) => {
        const {
            data,
            error,
            loading,
        } = useFetch({
            url,
            options,
        });

        if (loading) {
            return <p>로딩 페이지</p>;
        }

        if (error) {
            return <p>에러 페이지</p>;
        }

        return <WrappedComponent data={JSON.stringify(data)} {...props} />;
    };
};

export default withLoading;
